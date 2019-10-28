import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const newReducer = combineReducers({
  anecdotes: reducer,
  message: notificationReducer
})

const store = createStore(newReducer)

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)