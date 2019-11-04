import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const Users = (props) => {
  const allUsers = () => {
    return props.visibleUsers.map(user =>
      <tr key={user.id}>
        <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  }
  return(
    <ul>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {allUsers()}
      </table>
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    visibleUsers: state.users
  }
}

export default connect(mapStateToProps)(Users)