const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  if (user === undefined) {
    return response.status(401).json({ error: 'User validation error.' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes || 0,
  })

  if (blog.title === undefined || blog.url === undefined || blog.author === undefined) {
    response.status(400).end()
  }
  else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

bloglistRouter.delete('/:id', async (request, response) => {
  const user = request.user

  if (user === undefined) {
    return response.status(400).json({ error: 'User validation error.' })
  }
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === user.id.toString()) {
    await User.findByIdAndUpdate(user.id, { $pull: { blogs: blog.id } }, { new: true })
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Invalid user.' }).end()
  }
})

bloglistRouter.put('/:id', async (request, response) => {
  const body = request.body

  //const blog = {
  //  title: body.title,
  //  author: body.author,
  //  url: body.url,
  //  likes: body.likes
  //}

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, { likes: body.likes }, { new: true })
    .populate('user', { username: 1, name: 1 })
  response.status(200).json(updatedBlog)
})

module.exports = bloglistRouter