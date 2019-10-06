import React from 'react'

const AddNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="add">
      {message}
    </div>
  )
}

export default AddNotification