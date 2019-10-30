import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { messageChanger, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.visibleAnecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    console.log('vote', id)
    const voteContent = anecdotes.find(a => a.id === id)
    props.addVote(voteContent)
    props.messageChanger(voteContent.content, 10) 
  }

  return(
    <div> 
      {props.visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  
  if (filter === '') {
    return anecdotes
  }
  
  return anecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
  }
}

const mapDispatchToProps = {
  addVote,
  messageChanger,
  removeNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdotes