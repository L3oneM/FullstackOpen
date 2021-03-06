import React, { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState(null)

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const books = props.result.data.allBooks
  
  let filterGenres = []

  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!filterGenres.includes(genre)) {
        filterGenres = filterGenres.concat(genre)
      }
    })
  }); 

  return (
    <div>
      <h2>books</h2>
      {filter ? <div> in genre {filter}</div> : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(b => !filter || b.genres.includes(filter)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {filterGenres.map(g => <button key={g} onClick={() => setFilter(`${g}`)} >{g}</button> )}
      </div>
    </div>
  )
}

export default Books