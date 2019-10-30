import anecdotesService from '../services/anecdotes'

export const createAnecdote = data => {
  return async dispatch => {
    const newAnec = await anecdotesService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnec,
    })  
  } 
}

export const addVote= (data) => {
  return async dispatch => {
    const updatedVote = await anecdotesService.updateVote(data)
    dispatch({
      type: 'VOTE',
      data: updatedVote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anec => 
          anec.id !== id ? anec : changedAnecdote
        )
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export default reducer