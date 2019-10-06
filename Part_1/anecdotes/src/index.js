import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => { 
  return (<button onClick={handleClick} >{text}</button>)
}

const Header = ({text}) => <h1>{text}</h1>

const Anecdote = ({anecdotes, position}) => <p>{anecdotes[position]}</p>

const MaxVoteAnecdote = ({anecdotes, votes}) => {
  let max = 0
  let maxPos = 0

  for(let i = 0; i < 6; i++) {
    if (votes[i] > max) {
      max = votes[i]
      maxPos = i
    }
  }

  return <div>
          <p>{anecdotes[maxPos]}</p>
          <p>has {votes[maxPos]} votes</p>
        </div> 
}

const App = (props) => {
  const alength = anecdotes.length

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(alength))
  
  const randomNumber = () => Math.floor(Math.random()* alength)

  const voteCounter = () => {
    const copy ={ ...votes }
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdotes = {props.anecdotes} position = {selected} />
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => voteCounter()} text="vote" />
      <Button handleClick={() => setSelected(randomNumber())} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <MaxVoteAnecdote anecdotes = {props.anecdotes} votes = {votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)