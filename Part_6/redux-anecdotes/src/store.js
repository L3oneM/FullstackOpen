import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const newReducer = combineReducers({
  anecdotes: reducer,
  message: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  newReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store