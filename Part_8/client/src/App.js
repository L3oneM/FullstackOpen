import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthDate from './components/BirthDate'
import { useMutation, useQuery } from '@apollo/react-hooks'
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
    author
    published 
    genres
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
    author
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


const App = () => {
  const [page, setPage] = useState('authors')
  const authorsAndBooks = useQuery(ALL_AUTHORS)

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [editAuthor] = useMutation(CHANGE_BIRTHDATE, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  return (
    <div>
                <div>
                  <div>
                    <button onClick={() => setPage('authors')}>authors</button>
                    <button onClick={() => setPage('books')}>books</button>
                    <button onClick={() => setPage('add')}>add book</button>
                  </div>

                  <Authors
                    show={page === 'authors'}
                    result={authorsAndBooks}
                  />

                  <Books
                  show={page === 'books'}
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