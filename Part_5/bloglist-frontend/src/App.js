import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const hook =() => {
    blogService
      .getAll()
      .then(response => {
        setBlogs(response.sort((a, b) => b.likes - a.likes))
      })
  }

  useEffect(hook, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logOut = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLikesOf = id => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : undefined
    }

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map( blog => blog.id !== id ?
          blog : returnedBlog))
      })
      .catch(error => console.log(error))
  }

  const removeBlog = id => {
    if (window.confirm('Delete this blog?')) {
      const blog = blogs.find(blog => blog.id === id)
      const blogToDelete = {
        ...blog,
        user: blog.user ? blog.user.id : undefined
      }

      blogService
        .deleteBlog(id, blogToDelete)
        .then(() => {
          setBlogs(blogs.filter(blog =>
            blog.id !== id ? blog : null
          ))
        }
        )
    }
  }

  const handleCreate = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        title.reset()
        url.reset()
        author.reset()
        setErrorMessage(`a new blog ${data.title}  ${data.author}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>

      <Notification message={errorMessage} />
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
        </div> :
        <div>
          <h2>blogs</h2>

          <p>{user.username} is logged in</p>
          <Togglable buttonLabel="new blog">
            <CreateForm
              handleCreate={handleCreate}
              title={title}
              author={author}
              url={url}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              addLikes={() => addLikesOf(blog.id)}
              removeBlog={() => removeBlog(blog.id)}
              user={user}
            />
          )}
          <button onClick={logOut} >Log Out</button>
        </div>
      }

    </div>
  )
}

export default App
