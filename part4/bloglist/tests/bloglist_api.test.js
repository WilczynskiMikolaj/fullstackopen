const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const _ = require('lodash')
const app = require('../app')
const api = supertest(app)


const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 3 blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('Unique identifier of blog is called id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(b => {
      assert(_.keys(b).includes('id'))
    })
  })


  describe('addition of new blogs', () => {
    test('HTTP POST request succesfully creates new blog post.', async () => {
      const newBlog = {
        title: 'How to betray someone.',
        author: 'Marcus Iunius Brutus',
        url: 'something.com',
        likes: 149
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

      const verifyBlog = response.body.find(b => b.title === newBlog.title)
      assert.strictEqual(verifyBlog.author, newBlog.author)
      assert.strictEqual(verifyBlog.url, newBlog.url)
      assert.strictEqual(verifyBlog.likes, newBlog.likes)
    })

    test('verify likes property is missing it will default to value 0', async () => {
      const newBlogWithoutlikes = {
        title: 'Octavian is a brat',
        author: 'Marcus Antonius',
        url: 'something.com',
      }

      await api
        .post('/api/blogs')
        .send(newBlogWithoutlikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const addedBlog = response.body.find(b => b.title === newBlogWithoutlikes.title)
      assert.strictEqual(addedBlog.likes, 0)
    })

    test('fails with status code 400 if title is missing', async () => {
      const newBlogWithoutTitle = {
        author: 'Marcus Porcius Cato Uticensis',
        url: 'something.com',
      }

      await api
        .post('/api/blogs')
        .send(newBlogWithoutTitle)
        .expect(400)

      const blogssAtTheEnd = await helper.blogsInDb()

      assert.strictEqual(helper.initialBlogs.length, blogssAtTheEnd.length)
    })

    test('fails with status code 400 if url is missing', async () => {
      const newBlogWithoutTitle = {
        author: 'Marcus Porcius Cato Uticensis',
        title: 'Republic Republic only REPUBLIC!'
      }

      await api
        .post('/api/blogs')
        .send(newBlogWithoutTitle)
        .expect(400)

      const blogssAtTheEnd = await helper.blogsInDb()

      assert.strictEqual(helper.initialBlogs.length, blogssAtTheEnd.length)
    })

    test('fails with status code 400 if url and title are missing', async () => {
      const newBlogWithoutTitle = {
        author: 'Marcus Porcius Cato Uticensis',
      }

      await api
        .post('/api/blogs')
        .send(newBlogWithoutTitle)
        .expect(400)

      const blogssAtTheEnd = await helper.blogsInDb()

      assert.strictEqual(helper.initialBlogs.length, blogssAtTheEnd.length)
    })
  })

  describe('deletion of blog', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const title = blogsAtEnd.map(b => b.title)
      assert(!title.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('updating a blog', () => {
    test('likes in a blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const newLikes = blogToUpdate.likes + 1
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ ...blogToUpdate, likes: newLikes })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd[0]

      assert.strictEqual(updatedBlog.likes, newLikes)
      assert(updatedBlog.likes !== blogToUpdate.likes)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})