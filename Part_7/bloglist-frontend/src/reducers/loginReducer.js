import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state=null, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return action.data
  case 'LOG_OUT':
    return action.data
  case 'INIT_USER':
    console.log('init',action.data)
    return  action.data
  default:
    return state
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch({
      type: 'LOG_OUT',
      data: null
    })
  }
}

export const handleLogin = (content) => {
  return async dispatch => {
    const user = await loginService.login(content)
    window.localStorage.setItem(
      'loggedBloglistUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'LOG_IN',
      data: user
    })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: user
      })
    }
  }
}

export default loginReducer