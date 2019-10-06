import React from 'react'

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {

  const rows = () => parts.map(part => 
    <Part
     key={part.id}
      part={part}
    />)

  return (
    <div>
      {rows()}
    </div>
  )
}

export default Content