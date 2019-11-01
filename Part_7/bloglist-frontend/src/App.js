import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'

const App = (props) => {

  const hook = () => {
    props.initializeBlogs()
  }
  const hookForUser = () => {
    props.initializeUser()
  }
  
  useEffect(hook, [])
  useEffect(hookForUser, [])

  return (
    <div>

      <Notification  />
      {props.user === null ?
        <div>
          <h2>log in to application</h2>
          <LoginForm />
        </div> :
        <Blogs />
      }

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { initializeBlogs, initializeUser })(App)
