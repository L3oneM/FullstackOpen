import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'

const newReducer = combineReducers({
  blogs: blogReducer,
  user: loginReducer,
  message: notificationReducer
})

const store = createStore(
  newReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store