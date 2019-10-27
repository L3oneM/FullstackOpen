import React from 'react';

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = (props) => {
  const anecdotes = props.store.getState().sort((a, b) => b.votes - a.votes)

  const addAnecdote =(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
        id: generateId(),
        votes: 0
      }
    }) 
    event.target.anecdote.value = ''
  }

  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch({
      type: 'VOTE',
      data: {
        id
      }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App