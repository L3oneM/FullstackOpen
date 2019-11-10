import React from 'react'
import { connect } from 'react-redux'
import { handleCreate } from '../reducers/blogReducer'
import { messageChanger, removeNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'

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
      <Form onSubmit={addBlog}>
        <Form.Field>
          <label>title:</label>
          <input name="title" id='title'/>
        </Form.Field>
        <Form.Field>
          <label>author:</label>
          <input name="author" id='author'/>
        </Form.Field>
        <Form.Field>
          <label>url:</label>
          <input name="url" id='url'/>
        </Form.Field>
        <Button type="submit" >create</Button>
      </Form>
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