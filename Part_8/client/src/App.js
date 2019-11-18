import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthDate from './components/BirthDate'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useMutation, useQuery, useApolloClient, useSubscription } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
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
      born
    }
  }
 }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
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

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const me = useQuery(ME)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      console.log(object, addedBook)
      set.map(b => b.id).includes(object.id)
    }        

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    
    console.log('data',dataInStore)

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      console.log('data2',dataInStore)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }  
    console.log('data3',dataInStore) 
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(`New Book Added with Title ${subscriptionData.data.bookAdded.title}`)
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS },
    ]
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
              result={authors}
            />

          <Books
              show={page === 'books'}
              result={books}
          />

          <Recommendations 
            show={page === 'recommendations'}
            me={me}
            result={books}
          />
        </div>
        <NewBook
          show={page === 'add'}
          addBook={addBook}
        /> 
        <BirthDate
          show={page === 'authors'}
          editAuthor={editAuthor}
          result={authors}
        />
    </div>
  )
}

export default App