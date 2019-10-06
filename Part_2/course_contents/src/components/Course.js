import React from 'react'
import Content from './Content'

const Header = ({text}) => {
  return <h2>{text}</h2>
}

const TotalExercises =({parts}) => {

  const sum = parts.reduce((acc, part) => acc + part.exercises,0)

  return <h3>total of {sum} exercises</h3>
}

const Course = ({courses}) => {
  return (
    <div>
      {courses.map(course => <div key={course.id}>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <TotalExercises parts={course.parts} />
      </div>)}
    </div>
  )  
}

export default Course