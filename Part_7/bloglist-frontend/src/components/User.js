import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const User = (props) => {
  if ( props.user === undefined) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }

  const displayBlogs = () =>
    <ul> {props.user.blogs.map( blog =>
      <li key={blog.id} style={blogStyle}>
        <Link to={`/blogs/${blog.id}`} >
          {blog.title}
        </Link>
      </li>)}
    </ul>

  console.log(props.user)
  return (
    <div>
      <h2>blogs</h2>
      {props.user.blogs.length === 0
        ? <h3>No Blogs Here</h3>
        : displayBlogs()}
    </div>)
}

export default connect()(User)