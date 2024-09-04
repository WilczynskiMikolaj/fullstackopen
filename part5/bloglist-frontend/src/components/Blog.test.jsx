import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'


test('renders blog title and author but does not render likes and url', () => {
  const blog = {
    title: 'Imperium',
    author: 'Katon',
    url: 'something.com',
    likes: 13,
    user: { id: 'user1', username: 'Katon' }
  }

  const { container } = render(<Blog blog={blog} user={blog.user}/>)

  const div = container.querySelector('.blogHidden')
  expect(div).toHaveTextContent(`${blog.title} ${blog.author} `)
  expect(div).not.toHaveStyle('display: none')
})

test('after clicking button blog URL and number of likes are shown', async () => {
  const blog = {
    title: 'Imperium',
    author: 'Katon',
    url: 'something.com',
    likes: 13,
    user: { id: 'user1', username: 'Katon' }
  }

  const { container } = render(<Blog blog={blog} user={blog.user}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blogShown')
  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent(`likes ${blog.likes} `)
  expect(div).toHaveTextContent(`${blog.url}`)
})

test('clicking the like button twice, the event handler is called twice', async () => {
  const blog = {
    title: 'Imperium',
    author: 'Katon',
    url: 'something.com',
    likes: 13,
    user: { id: 'user1', username: 'Katon' }
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandler} user={blog.user}/>
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByTestId('like-button-Imperium')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})