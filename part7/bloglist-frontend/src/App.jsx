import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Menu from './components/Menu'
import { useNotificationDispatch } from './components/NotificationContext'
import UsersView from './components/UsersView'
import { useUserDispatch, useUserValue } from './components/UserContext'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import UserView from './components/UserView'
import BlogView from './components/BlogView'

const App = () => {
  const dispatchNotification = useNotificationDispatch()
  const dispatchUser = useUserDispatch()
  const match = useMatch('/blogs/:id')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    }
  }, [dispatchUser])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>Error: blog service not available due to problems in service</div>
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatchUser({ type: 'LOGIN', payload: user })
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatchNotification({ type: 'SHOW', payload: 'wrong username or password' })
      setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    dispatchUser({ type: 'LOGOUT', payload: null })
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin} data-testid='login-form'>
        <div>
          username: <input type="text" data-testid='username' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} autoComplete='on' />
        </div>
        <div>
          password: <input type="password" data-testid='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit" data-testid='log in' >login</button>
      </form>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  const blogMatched = match ? result.data.find(blog => blog.id === match.params.id) : null

  return (
    <div className="container">
      <Notification />
      <h2>blog app</h2>
      <Menu user={user} handleLogout={handleLogout} />
      <br></br>
      <Routes>
        <Route path='/users/*' element={<UsersView />}></Route>
        <Route path='/' element={<BlogList user={user} />}></Route>
        <Route path='/users/:id' element={<UserView />}></Route>
        <Route path='/blogs/:id' element={<BlogView blog={blogMatched} currentUser={user} />}></Route>
      </Routes>
    </div>
  )
}

export default App