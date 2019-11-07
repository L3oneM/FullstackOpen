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

export const handleCreate = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const addLikesOf = (blog) => {
  console.log('addLikesOf',blog.id)
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user ? blog.user.id : undefined
  }

  return async dispatch => {
    await blogService.update(blog.id, updatedBlog)
    dispatch({
      type: 'ADD_LIKE',
      data: updatedBlog
    })
  }
}

export const removeBlog = id => {
  console.log('removeBlog', id)
  return async dispatch => {
    await blogService.deleteBlog(id)

    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export const addCommentOf = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.createComment(id, comment)
    dispatch({
      type: 'CREATE_BLOG',
      data: updatedBlog,
    })
  }
}

const blogReducer = (state = [], action) => {

  switch (action.type) {
  case 'NEW_BLOG':
    console.log(action.type)
    return [ ...state, action.data]
  case 'ADD_LIKE':
    console.log(action.type)
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'DELETE_BLOG':
    console.log(action.type)
    return state.filter(blog => blog.id !== action.id)
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  default:
    return state
  }
}

export default blogReducer