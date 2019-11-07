import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form } from 'semantic-ui-react'

const CommentForm = (props) => {
  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value

    event.target.comment.value = ''

    props.addCommentToData(props.id, comment)
  }

  return (
    <div>
      <Form onSubmit={addComment}>
        <Input name="comment" />
        <Button type="submit" >add a comment </Button>
      </Form>
    </div>
  )
}

export default connect()(CommentForm)