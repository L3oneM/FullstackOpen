import React from 'react'

const LoginForm = ({ handleLogin, username, password }) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input { ...username.unitilies() } />
    </div>
    <div>
      password
      <input { ...password.unitilies() } />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm