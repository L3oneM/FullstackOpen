const initialState = 'Vote The Anecdote You Like The Most' 

const notificationReducer = (state = initialState, action) => {
  console.log('notification state now: ', state)
  console.log('notification action', action.message)

  switch (action.type) {
    case 'SET_MESSAGE':
      return  action.message
    case 'IN_MESSAGE':
      return action.message  
    default:
      return state
  }
} 

export const messageChanger = message => {
  const voteMessage = `You Voted "${message}"`
  return {
    type: 'SET_MESSAGE',
    message : voteMessage
  }
}

export const removeNotification = () => {
  return {
    type: 'IN_MESSAGE',
    message: initialState
  }
}

export default notificationReducer