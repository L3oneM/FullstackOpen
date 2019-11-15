import React, { useState } from 'react'

const BirthDate = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const submit = async (e) => {
    e.preventDefault()

    console.log('Birthdate changed...')

    await props.editAuthor({
      variables: {name, born}
    })

    setName('')
    setBorn('')
  }

  const authors = props.result.data.allAuthors

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name
          <select
           value={name}
           onChange={({ target }) => setName(target.value)}
           >
             {
               authors.map(a => 
                <option key={a.name} value={a.name}>{a.name}</option>)
             }
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(+target.value)}
          />
        </div>
        <button type='submit'> update author </button>
      </form>
    </div>
  )
}

export default BirthDate