import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} primary>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} secondary>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable