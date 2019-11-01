import React, { useState } from 'react'

const Blog = ({ blog, addLikes, removeBlog, user }) => {
  const [ blogVisible, setBlogVisible ] = useState(false)

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBlogOf = async () => {
    if (window.confirm('Delete this blog?')) {
      removeBlog()
    }
  }

  const addLikesOf = async () => {
    addLikes()
  }

  return (
    <div style={blogStyle} className='blog'>
      <div onClick={() => setBlogVisible(!blogVisible)} className='testBtn'>
        {blog.title}  by {blog.author}
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} likes <button onClick={addLikesOf}>like</button>
        </div>
        <div>
            added by {blog.user ? blog.user.username : 'Unknown'}
        </div>
        {!blog.user
          ? null
          : (blog.user.username === user) ? <div>
            <button onClick={removeBlogOf}>remove</button>
          </div>
            : null}
      </div>
    </div>
  )
}

export default Blog