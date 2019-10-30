const Blog = require('../models/blogList')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'The Bloglist Example',
    author: 'Me',
    url: 'http://localhost:3001/api/blogs',
    likes: 55,
    id: '5da4efc18bf4bd175bc1fa98'
  },
  {
    title: 'A new Blog just Added',
    author: 'Me',
    url: 'http://localhost:3001/api/blogs',
    likes: 60,
    id: '5da641f902eaf124e466fa49'
  },
  {
    title: 'A newest Blog for Test',
    author: 'Me',
    url: 'http://localhost:3001/api/blogs',
    likes: 72,
    id: '5da8db981afdb218885b2bd8'
  }
]

const initialUsers = [
  {
    username: 'Panos',
    name: 'Matti Luukkainen',
    password: 'salainen',
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
  initialBlogs, blogsInDb, usersInDb, initialUsers
}