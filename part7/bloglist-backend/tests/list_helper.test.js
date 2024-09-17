const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const biggerList = [
    {
      _id: '5a422aa71b54a676234117f7',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 33,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Venomouse',
      author: 'Edsger',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra69.pdf',
      likes: 29,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful',
      author: 'Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra70.pdf',
      likes: 23,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list', () => {
    const result = listHelper.totalLikes(biggerList)
    assert.strictEqual(result, 85)
  })


})

describe('favorite blog', () => {
  const listWithSomeBlogs = [{
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 33,
  },
  {
    title: 'Go To Statement Considered Venomouse',
    author: 'Edsger',
    likes: 29,
  },
  {
    title: 'Go To Statement Considered',
    author: 'Dijkstra',
    likes: 23,
  },
  {
    title: 'Go To Statement',
    author: 'Dijkstra',
    likes: 33,
  }]

  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 343
    }]

  test('favorite blog with one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 343
    })
  })

  test('favorite blog from many blogs', () => {
    const result = listHelper.favoriteBlog(listWithSomeBlogs)
    assert.deepStrictEqual(result, {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 33,
    })
  })

})

describe('Most popular blog', () => {

  const aLotOfBlogs = [{
    title: 'Canog reduction',
    author: 'Edsger W. Dijkstra',
    likes: 18
  },
  {
    title: 'Canonical duction',
    author: 'Edsger W. Dijkstra',
    likes: 9
  },
  {
    title: 'Canreduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  },
  {
    title: 'string reduction',
    author: 'Dijkstra',
    likes: 5
  },
  {
    title: 'Canonical reduction',
    author: 'Dijkstra',
    likes: 12
  },
  {
    title: 'Canonical string',
    author: 'Dijkstra',
    likes: 13
  },
  {
    title: 'Ca',
    author: 'Dijkstra',
    likes: 1
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger',
    likes: 12
  }
  ]

  const oneBlog = [{
    title: 'Canonical string reduction',
    author: 'Edsger',
    likes: 12
  }]

  test('many blogs for most author by blogs written', () => {
    const result = listHelper.mostBlogs(aLotOfBlogs)
    assert.deepStrictEqual(result, { 'author': 'Dijkstra', 'blogs': 4 })
  })

  test('one blog for most popular author by blogs written', () => {
    const result = listHelper.mostBlogs(oneBlog)
    assert.deepStrictEqual(result, { 'author': 'Edsger', 'blogs': 1 })
  })

  test('empty array of blogs', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, { 'author': undefined, 'blogs': undefined })
  })
})

describe('Most popular blog', () => {
  const manyBlogs = [{
    title: 'Canog reduction',
    author: 'Edsger W. Dijkstra',
    likes: 18
  },
  {
    title: 'Canonical duction',
    author: 'Edsger W. Dijkstra',
    likes: 9
  },
  {
    title: 'Roma Invicta',
    author: 'Caesar',
    likes: 100
  },
  {
    title: 'string reduction',
    author: 'Dijkstra',
    likes: 5
  },
  {
    title: 'Canonical reduction',
    author: 'Dijkstra',
    likes: 12
  },
  {
    title: 'C',
    author: 'Caesar',
    likes: 13
  }]

  const oneBlog = [{
    title: 'C',
    author: 'Caesar',
    likes: 13
  }]

  test('author with blog with most likes', () => {
    const result = listHelper.mostLikes(manyBlogs)
    assert.deepStrictEqual(result, { author: 'Caesar', likes: 100 })
  })

  test('one blog author with most likes', () => {
    const result = listHelper.mostLikes(oneBlog)
    assert.deepStrictEqual(result, { author: 'Caesar', likes: 13 })
  })

  test('empty blog array', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, {})
  })
})