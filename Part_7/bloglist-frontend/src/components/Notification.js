import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <Message success>
      {props.message}
    </Message>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  }
}

export default connect(mapStateToProps)(Notification)