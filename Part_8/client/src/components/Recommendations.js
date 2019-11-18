import React from 'react'

const Recommendations = (props) => {

  if (!props.show) {
    return null
  }

  const filter = props.me.data.me.favoriteGenre
  const books = props.result.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <div>books in your favorite genre <strong>{filter}</strong> </div>
      <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
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
      </div>
    </div>
  )
}

export default Recommendations