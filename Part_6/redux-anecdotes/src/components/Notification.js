import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log(1, props.store.getState().message)
  return (
    <div style={style}>
      {props.store.getState().message}
    </div>
  )
}

export default Notification