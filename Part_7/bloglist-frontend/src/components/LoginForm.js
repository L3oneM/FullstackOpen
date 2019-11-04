import React from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../reducers/loginReducer'
import { messageChanger, removeNotification } from '../reducers/notificationReducer'


const LoginForm = (props) => {
  const loginUser = async (event) => {
    event.preventDefault()
    const content = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    props.handleLogin(content)
    props.messageChanger(`User ${content.username} has logged in`, 10)
  }

  return (
    <form onSubmit={loginUser}>
      <div>
      username
        <input name='username' />
      </div>
      <div>
      password
        <input name="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

const mapDispatchToProps = {
  handleLogin,
  messageChanger,
  removeNotification
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)