import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Testing Exercise 5.15',
  author: 'John John',
  url: 'www.testExercise515.com',
  likes: 150
}

test('renders content', () => {
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testing Exercise 5.15'
  )

  expect(component.container).toHaveTextContent(
    'John John'
  )

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')
})

test('after clicking the button', () => {
  const component = render(
    <Blog blog={blog} />
  )

  const button =component.container.querySelector('.testBtn')
  fireEvent.click(button)

  const div = component.container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')
})