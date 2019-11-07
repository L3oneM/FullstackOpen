import React from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../reducers/loginReducer'
import { messageChanger, removeNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'


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
    <Form onSubmit={loginUser}>
      <Form.Field>
        <label>username</label>
        <Form.Input name='username' width={6}/>
      </Form.Field>
      <Form.Field>
        <label>password</label>
        <Form.Input name="password" width={6}/>
      </Form.Field>
      <Button type="submit">login</Button>
    </Form>
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