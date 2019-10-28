import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { messageChanger, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    console.log('vote', id)
    const voteContent = props.store.getState().anecdotes.find(a => a.id === id)
    props.store.dispatch(addVote(id))
    props.store.dispatch(messageChanger(voteContent.content))
    setTimeout(() => {
      props.store.dispatch(removeNotification())
    }, 5000) 
  }

  return(
    <div> 
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
    </div>
  )

}

export default AnecdoteList