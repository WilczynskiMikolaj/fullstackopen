import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
        .sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
                            dispatch(voteAnecdote(anecdote))}}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList