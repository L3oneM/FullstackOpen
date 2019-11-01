import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateForm from './CreateForm'
import { addLikesOf, removeBlog } from '../reducers/blogReducer'
import { logOut } from '../reducers/loginReducer'

const Blogs = (props) => {
  return(
    <div>
      <h2>blogs</h2>

      <p>{props.user.username} is logged in</p>
      <Togglable buttonLabel="new blog">
        <CreateForm />
      </Togglable>
      {props.visibleBlogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLikes={() => props.addLikesOf(blog)}
          removeBlog={() => props.removeBlog(blog.id)}
          user={props.user.username}
        />
      )}
      <button onClick={logOut} >Log Out</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    visibleBlogs: state.blogs,
    user: state.user
  }
}
const mapDispatchToProps = {
  addLikesOf,
  removeBlog,
  logOut
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)