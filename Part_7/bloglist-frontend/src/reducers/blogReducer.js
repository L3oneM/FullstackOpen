import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'NEW_BLOG':
    console.log(action.type)
    return state
  case 'ADD_LIKE':
    console.log(action.type)
    return state
  case 'DELETE_BLOG':
    console.log(action.type)
    return state
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export default blogReducer