import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Users from './components/Users'
import User from './components/User'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'

import { Container } from 'semantic-ui-react'

const App = (props) => {

  const hook = () => {
    props.initializeBlogs()
  }
  const hookForUser = () => {
    props.initializeUser()
  }

  const hookForUsers = () => {
    props.initializeUsers()
  }

  useEffect(hook, [])
  useEffect(hookForUser, [])
  useEffect(hookForUsers, [])

  const findUser = (id) => props.users.find(u => u.id === id)

  const findBlog = (id) => props.blogs.find(b =>
    b.id === id)

  return (
    <Container>
      <div>
        <Router>
          <div>
            <Notification  />
            <NavBar />
            <Route exact path='/' render={() =>
              props.user === null ?
                <div>
                  <h2>log in to application</h2>
                  <LoginForm />
                </div>
                : <div>
                  <Blogs />
                  <Users />
                </div>
            } />
            <Route exact path='/users/:id' render={({ match }) => <User user={findUser(match.params.id)} />} />
          </div>
          <Route exact path='/blogs/:id' render={({ match }) =>
            <div>
              <Blogs />
              <Blog blog={findBlog(match.params.id)}/>
            </div>} />
        </Router>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUser,
  initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
