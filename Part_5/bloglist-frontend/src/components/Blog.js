import React, { useState } from 'react'

const Blog = ({ blog, addLikes, removeBlog,user }) =>{
  const [ blogVisible, setBlogVisible ] = useState(false)

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setBlogVisible(!blogVisible)}>
        {blog.title}  by {blog.author}          
      </div>
      <div style={showWhenVisible} >
          <div>
            {blog.url}
          </div>
          <div>
            {blog.likes} likes <button onClick={addLikes}>like</button>
          </div>
          <div>
            added by {blog.user ? blog.user.username : 'Unknown'}
          </div>
          {!blog.user 
            ? null 
            : (blog.user.username === user.username) ? <div>
                <button onClick={removeBlog}>remove</button>
              </div> 
            : null}
      </div>
    </div>
  )
}

export default Blog