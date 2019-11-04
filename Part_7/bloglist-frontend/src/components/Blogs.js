import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import CreateForm from './CreateForm'

const Blogs = (props) => {
  if ( props.user === null) {
    return null
  }

  return(
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog">
        <CreateForm />
      </Togglable>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(Blogs)