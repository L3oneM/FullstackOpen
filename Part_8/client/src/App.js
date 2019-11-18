import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthDate from './components/BirthDate'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
  allBooks { 
    title 
    author {
      name
      born
    }
    published 
    genres
  }
}
`

const ME = gql`
{
  me {
    favoriteGenre
  }
}
`

const CREATE_BOOK = gql`
 mutation createBook($title: String!, $author:String, $published:Int, $genres:[String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author {
      name
    }
  }
 }
`

const CHANGE_BIRTHDATE = gql`
 mutation changeBirthDate($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name,
    born
  }
 }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`


const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authorsAndBooks = useQuery(ALL_AUTHORS)
  const me = useQuery(ME)

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [editAuthor] = useMutation(CHANGE_BIRTHDATE, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  useEffect(() => {
    const token = window.localStorage.getItem('books-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const [login] = useMutation(LOGIN)

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={token => setToken(token)}
        />
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
        <div>
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </div>

          <Authors
              show={page === 'authors'}
              result={authorsAndBooks}
            />

          <Books
              show={page === 'books'}
              result={authorsAndBooks}
          />

          <Recommendations 
            show={page === 'recommendations'}
            me={me}
            result={authorsAndBooks}
          />
        </div>
        <NewBook
          show={page === 'add'}
          addBook={addBook}
        /> 
        <BirthDate
          show={page === 'authors'}
          editAuthor={editAuthor}
          result={authorsAndBooks}
        />
    </div>
  )
}

export default App