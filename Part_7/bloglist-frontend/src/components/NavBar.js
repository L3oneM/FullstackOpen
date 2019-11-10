import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import { Button, Menu } from 'semantic-ui-react'

let Navbar = (props) => {
  const padding = {
    paddingRight: 5
  }

  if ( props.user === null) {
    return null
  }

  const logOutOf = () => {
    props.logOut()
    props.history.push('/')
  }

  return (
    <Menu inverted>
      <Menu.Item link>
        <Link to='/' style={padding}>blogs</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to='/users' style={padding}>users</Link>
      </Menu.Item>
      <Menu.Item>
        {/* {props.user.username} is logged in */}
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item >
          <Button onClick={logOutOf} >Log Out</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

Navbar = withRouter(Navbar)

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logOut
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)