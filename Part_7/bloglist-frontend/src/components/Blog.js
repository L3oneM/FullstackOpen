import React from 'react'
import { connect } from 'react-redux'
import { addLikesOf, removeBlog } from '../reducers/blogReducer'
import { withRouter } from 'react-router-dom'

let Blog = (props) => {
  if ( props.blog === undefined) {
    return null
  }

  if ( props.user === undefined) {
    return null
  }

  const removeBlogOf = async (id) => {
    if (window.confirm('Delete this blog?')) {
      props.removeBlog(id)
      props.history.push('/')
    }
  }

  const addLikes = async (blog) => {
    props.addLikesOf(blog)
  }

  const blog = props.blog
  console.log(blog.id)

  return (
    <div className='blog'>
      <div className='testBtn'>
        <h1>{blog.title}  by {blog.author}</h1>
      </div>
      <div className="togglableContent">
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} likes <button onClick={() => addLikes(blog)}>like</button>
        </div>
        <div>
            added by {blog.user ? blog.user.username : 'Unknown'}
        </div>
        <div>
          <button onClick={() => removeBlogOf(blog.id)}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog = withRouter(Blog)

const mapStateToProps = (state, ownProps) => ({
  blog: ownProps.blog,
  user: state.user
})

const mapDispatchToProps = {
  addLikesOf,
  removeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)