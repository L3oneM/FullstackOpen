import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Component testing for ex. 5.13',
    likes: 73,
    author: 'John Takis'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing for ex. 5.13'
  )

  expect(component.container).toHaveTextContent(
    '73'
  )

  expect(component.container).toHaveTextContent(
    'John Takis'
  )
})

test('clicking the like button twice calls event handler twice', () => {
  const blog = {
    title: 'Component testing for ex. 5.13',
    likes: 73,
    author: 'John Takis'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})