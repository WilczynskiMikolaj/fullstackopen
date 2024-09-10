import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from './NotificationContext'


const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({ type: 'SHOW', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => dispatch({ type: "CLEAR" }), 5000)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: content, id: getId(), votes: 0 })

    dispatch({ type: 'SHOW', payload: `you added anecdote '${content}'` })
    setTimeout(() => dispatch({ type: "CLEAR" }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
