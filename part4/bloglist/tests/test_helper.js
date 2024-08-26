const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: '.com',
    likes: 33,
  },
  {
    title: 'Roma Invicta',
    author: 'Gaius Iulius Caesar',
    url: '.com',
    likes: 1000
  },
  {
    title: 'I do not like Caesar',
    author: 'Gnaeus Pompeius Magnus',
    url: '.com',
    likes: 400
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}