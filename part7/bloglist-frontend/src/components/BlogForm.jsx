import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>title:</Form.Label>
          <Form.Control type='text' value={newTitle} data-testid='title' name='newTitle' onChange={({ target }) => setTitle(target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>author:</Form.Label>
          <Form.Control type='text' value={newAuthor} data-testid='author' name='newAuthor' onChange={({ target }) => setAuthor(target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>url:</Form.Label>
          <Form.Control type='text' value={newBlogUrl} data-testid='url' name='newBlogUrl' onChange={({ target }) => setBlogUrl(target.value)} />
        </Form.Group>
        <Button variant="outline-primary" type='submit'>create</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default BlogForm