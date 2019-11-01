import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className="error">
      {props.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  }
}

export default connect(mapStateToProps)(Notification)