const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    username: 'testUser1',
    name: 'test user 1',
    password: 'testUser1',
  },
  {
    username: 'testUser2',
    name: 'test user 2',
    password: 'testUser2',
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb
}