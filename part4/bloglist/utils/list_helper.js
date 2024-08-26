const _ = require('lodash')

const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((favoriteBlog, blog) => blog.likes > favoriteBlog.likes ? blog : favoriteBlog, blogs[0])
  return favorite
}

const mostBlogs = (blogs) => {
  const counted = _.countBy(blogs, 'author')
  const maxKey = _.maxBy(_.keys(counted), (key) => counted[key])
  return { 'author': maxKey, 'blogs': counted[maxKey] }
}

const mostLikes = (blogs) => {
  const authorWithMostLikes = _.maxBy(blogs, 'likes')
  const result = blogs.length !== 0 ? { author: authorWithMostLikes.author, likes: authorWithMostLikes.likes } : {}
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}