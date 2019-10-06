import React from 'react'

const Filter = ({filteName, handleFilterName}) => {
  return(
    <div>
      <span>find countries </span> 
      <input value={filteName} onChange={handleFilterName} />
    </div>
  )
}

export default Filter