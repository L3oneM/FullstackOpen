import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')



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
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setTitle('')
        setUrl('')
        setAuthor('')
        setErrorMessage(`a new blog ${data.title}  ${data.author}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>

      <Notification message={errorMessage} />
      {user === null ?
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div> :
        <div>
          <h2>blogs</h2>

          <p>{user.username} is logged in</p>
          <Togglable buttonLabel="new blog">
            <CreateForm
              handleCreate={handleCreate}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
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
