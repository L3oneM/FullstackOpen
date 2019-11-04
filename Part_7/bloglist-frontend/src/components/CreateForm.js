import React from 'react'
import { connect } from 'react-redux'
import { handleCreate } from '../reducers/blogReducer'
import { messageChanger, removeNotification } from '../reducers/notificationReducer'

const CreateForm = (props) => {
  const addBlog = async (event) => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    props.handleCreate(content)
    props.messageChanger(`a new blog ${content.title}  ${content.author}`, 10)
  }

  return(
    <div>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input name="title" />
        </div>
        <div>
        author:
          <input name="author" />
        </div>
        <div>
        url:
          <input name="url" />
        </div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  handleCreate,
  messageChanger,
  removeNotification
}
export default connect(
  null,
  mapDispatchToProps
)(CreateForm)