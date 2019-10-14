import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddNotification from './components/AddNotification'
import DeleteNotification from './components/DeleteNotification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [addMessage, setAddMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()

  let exist = false
  let newID 
  for(let i = 0; i < persons.length; i++) {
    if(persons[i].name.toLowerCase() === newName.toLowerCase()) {
      exist = true
      newID = persons[i].id
    } 
  }

  if(exist) {

    if(window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)) {
      const person = persons.find(p => p.id === newID)
      const changePerson = { ...person, number: newNumber }

      personService
        .update(newID, changePerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== newID ? person : response.data))
        })
        .catch(error => {
          setErrorMessage(`Information of ${newName} has already been deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== newID))
        })
      setNewName('')
      setNewNumber('')
    }   
  } else {
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setAddMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setAddMessage(null)
        }, 5000)
    })
    .catch(error => {
      console.log(error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    setNewName('')
    setNewNumber('')
    setFilterName('')
  }
    
}

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id ? person : null))
      })
    }  
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <AddNotification message={addMessage} />
      <DeleteNotification message={errorMessage} />

      <Filter filterName={filterName} handleFilter={handleFilter}/>

      <h3>Add a new</h3>

      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName} newName={newName} newNumber={newNumber}/>

      <h2>Numbers</h2>
      
      <Persons persons={persons} filterName={filterName} deletePerson={deletePerson}/>
    </div>
  )
}

export default App