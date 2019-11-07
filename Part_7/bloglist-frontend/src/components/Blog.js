import React from 'react'
import { connect } from 'react-redux'
import { addLikesOf, removeBlog, addCommentOf } from '../reducers/blogReducer'
import { withRouter } from 'react-router-dom'
import CommentForm from './CommentForm'
import { Button, List } from 'semantic-ui-react'

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

  const addComment = async (id, comment) => {
    console.log('I run!!!')
    props.addCommentOf(id, comment)
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
          {blog.likes} likes <Button onClick={() => addLikes(blog)}>like</Button>
        </div>
        <div>
            added by {blog.user ? blog.user.username : 'Unknown'}
        </div>
        <div>
          <Button onClick={() => removeBlogOf(blog.id)} color='red'>remove</Button>
        </div>
      </div>
      <div>
        <h2>comments</h2>
        <CommentForm id={blog.id} addCommentToData={addComment}/>
        <List bulleted>
          {blog.comments.map(c => <List.Item key={c}>{c}</List.Item>)}
        </List>
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
  removeBlog,
  addCommentOf
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)