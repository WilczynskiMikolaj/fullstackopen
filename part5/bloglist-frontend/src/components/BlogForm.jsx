import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newBlogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newBlogUrl
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input type='text' value={newTitle} data-testid='title' name='newTitle' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author: <input type='text' value={newAuthor} data-testid='author' name='newAuthor' onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Url: <input type='text' value={newBlogUrl} data-testid='url' name='newBlogUrl' onChange={({ target }) => setBlogUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default BlogForm