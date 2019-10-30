const blogRouter = require('express').Router()
const Blog = require('../models/blogList')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body

  console.log('"body"', body)

  try {

    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    console.log('user', user)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(200).json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {

    // eslint-disable-next-line no-undef
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    console.log('decodeToken',decodedToken.id, !decodedToken)

    if (!decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() === decodedToken.id ){
      await blog.delete()
      return response.status(204).end()
    }

    return response.status(400).json({
      error: 'wrong user'
    })
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    response.json(updatedBlog)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogRouter
