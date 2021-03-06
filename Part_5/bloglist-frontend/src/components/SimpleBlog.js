import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='simpleBlog'>
    <div>
      {blog.title} {blog.author}
    </div>
    <div className="like-btn">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog