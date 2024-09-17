import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleClick = () => { setVisible(!visible) }

  const handleLikeClick = () => {
    updateBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const handleDeleteClick = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirm) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog' data-testid={`blog-${blog.title}`}>
      <div style={hideWhenVisible} className='blogHidden'>
        {blog.title} {blog.author} <button className='view-button' data-testid='view-button' onClick={toggleClick}>view</button>
      </div>
      <div style={showWhenVisible} className='blogShown'>
        {blog.title} {blog.author} <button data-testid='hide-button' onClick={toggleClick}>hide</button>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button className='like-button' data-testid={`like-button-${blog.title}`} onClick={handleLikeClick}>like</button></p>
        <p>{blog.user.name}</p>
        {((blog.user.username === user.username || blog.user.id === user.id) ? true : false) && <button onClick={handleDeleteClick} data-testid='remove-button'>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog