const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogList')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json ', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
})

describe('viewing a specific blog', () => {
  test('blog id is verified correct ', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.map(blog => blog.id)).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'blog from Test Test',
      author: 'M',
      url: 'http://localhost:3001/api/blogs',
      likes: 85,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(expect(response.body.length).toBe(helper.initialBlogs.length + 1))

    const titles = response.body.map(blog => blog.title)

    expect(titles).toContain('blog from Test Test')

  })

  test('blog without likes added with default likes 0', async () => {
    const newBlog = {
      title: 'blog to test likes',
      author: 'M',
      url: 'http://localhost:3001/api/blogs'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body.map(blog => blog.likes)).toBeDefined()
  })

  test('blog without url or title is not added', async () => {
    const newBlog1 = {
      title: 'blog to test likes',
      author: 'M',
    }

    const newBlog2 = {
      url: 'http://localhost:3001/api/blogs',
      author: 'M',
    }

    await api
      .post('/api/blogs')
      .send(newBlog1)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )

    const author = blogsAtEnd.map(blog => blog.content)

    expect(author).not.toContain(blogToDelete.author)
  })
})

describe('update of a blog', () => {
  test('succeeds in update', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const newLikes = blogsAtEnd[0].likes

    expect(newLikes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})