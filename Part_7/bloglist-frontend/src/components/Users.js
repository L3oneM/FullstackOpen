import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Users = (props) => {
  const allUsers = () => {
    return props.visibleUsers.map(user =>
      <Table.Row key={user.id}>
        <Table.Cell><Link to={`/users/${user.id}`}>{user.username}</Link>
        </Table.Cell>
        <Table.Cell>{user.blogs.length}</Table.Cell>
      </Table.Row>
    )
  }
  return(
    <Table  celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Users</Table.HeaderCell>
          <Table.HeaderCell>Blogs Created</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {allUsers()}
      </Table.Body>
    </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    visibleUsers: state.users
  }
}

export default connect(mapStateToProps)(Users)