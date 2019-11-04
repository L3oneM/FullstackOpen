import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../reducers/loginReducer'

const Navbar = (props) => {
  const padding = {
    paddingRight: 5
  }

  if ( props.user === null) {
    return null
  }

  return (
    <div>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
      {props.user.username} is logged in<span>  </span>
      <button onClick={props.logOut} >Log Out</button>
    </div>
  )
}

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