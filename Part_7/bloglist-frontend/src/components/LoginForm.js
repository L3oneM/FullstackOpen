import React from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../reducers/loginReducer'


const LoginForm = (props) => {
  const loginUser = async (event) => {
    event.preventDefault()
    const content = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    props.handleLogin(content)
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
export default connect(
  null,
  { handleLogin }
)(LoginForm)