import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

const User = (props) => {
  if ( props.user === undefined) {
    return null
  }

  const displayBlogs = () =>
    <List celled size={'big'}> {props.user.blogs.map( blog =>
      <List.Item key={blog.id} >
        <List.Content>
          <Link to={`/blogs/${blog.id}`} >
            {blog.title}
          </Link>
        </List.Content>
      </List.Item>)}
    </List>

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