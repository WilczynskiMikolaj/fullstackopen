import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ text: '', notificationType: '' })
  const [refresh, setRefresh] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes))
    )
  }, [refresh])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const noti = {
        text: 'wrong username or password',
        notificationType: 'error'
      }
      setNotification(noti)
      setTimeout(() => { setNotification({ text: '', notificationType: '' }) }, 5000)
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.createNewBlog(blogObject)
    setBlogs(blogs.concat(newBlog))
    setRefresh(!refresh)
    const noti = {
      text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      notificationType: 'notification'
    }
    setNotification(noti)
    setTimeout(() => { setNotification({ text: '', notificationType: '' }) }, 5000)
  }

  const removeBlog = async id => {
    await blogService.removeBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const updateBlog = async (id, blogObject) => {
    const updatedBlog = await blogService.updateBlog(id, blogObject)
    setBlogs(blogs
      .map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    )
    setRefresh(!refresh)
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
        <Notification message={notification.text} notificationType={notification.notificationType} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification.text} notificationType={notification.notificationType} />
      <h2>blogs</h2>
      {user.name} logged in <button data-testid='logout-button' onClick={handleLogout}>Logout</button>
      <br></br>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
      )}
    </div>
  )
}

export default App