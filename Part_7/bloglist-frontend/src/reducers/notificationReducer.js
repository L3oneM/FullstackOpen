const initialState = null

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
  case 'SET_MESSAGE':
    return  action.message
  case 'IN_MESSAGE':
    return action.message
  default:
    return state
  }
}

export const messageChanger = (message, time) => async dispatch => {
  dispatch({
    type: 'SET_MESSAGE',
    message: message
  })
  setTimeout(() => dispatch(removeNotification()), time * 1000)
}

export const removeNotification = () => {
  return {
    type: 'IN_MESSAGE',
    message: initialState
  }
}

export default notificationReducer