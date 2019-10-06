import React from 'react'

const Persons = ({persons, filterName, deletePerson}) => {
  
  if (filterName === '') {
    return(
      <div>
        {persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button></p>)}
      </div>
    )
  }  

  const showName = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())
  )

  return (
    <div>
      {showName.map(person => 
      <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button></p>)}
    </div>
  )
}

export default Persons 