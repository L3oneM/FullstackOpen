import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('log in to application')
    )

    expect(component.container).toHaveTextContent('login')
    expect(component.container).not.toHaveTextContent('blogs')
  })

  test('if user is logged in, blogs are rendered',
    async () => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Donald Tester'
      }

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      const component = render(
        <App />
      )
      component.rerender(<App />)

      await waitForElement(
        () => component.container.querySelector('.blog')
      )

      const blogs = component.container.querySelectorAll('.blog')

      expect(blogs.length).toBe(3)

    })
})