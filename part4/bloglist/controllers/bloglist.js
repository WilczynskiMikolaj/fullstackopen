const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  if (blog.title === undefined || blog.url === undefined || blog.author === undefined) {
    response.status(400).end()
  }
  else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

bloglistRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

bloglistRouter.put('/:id', async (request, response) => {
  const body = request.body

  //const blog = {
  //  title: body.title,
  //  author: body.author,
  //  url: body.url,
  //  likes: body.likes
  //}

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: body.likes }, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = bloglistRouter