import React from 'react'

const CreateForm = ({ handleCreate, title, author, url }) => (
  <div>
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input { ...title.unitilies() } />
      </div>
      <div>
        author:
        <input { ...author.unitilies() } />
      </div>
      <div>
        url:
        <input { ...url.unitilies() } />
      </div>
      <button type="submit" >create</button>
    </form>
  </div>
)

export default CreateForm