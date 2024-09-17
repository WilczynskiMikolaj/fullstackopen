import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './blogForm'
import { expect } from 'vitest'

test('blog form calls the event handler with rigth details when new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(
    <BlogForm createBlog={createBlog} />
  )

  const inputTitle = screen.getByTestId('title')
  const inputAuthor = screen.getByTestId('author')
  const inputUrl = screen.getByTestId('url')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'Random title')
  await user.type(inputAuthor, 'Random author')
  await user.type(inputUrl, 'Random url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Random title')
  expect(createBlog.mock.calls[0][0].author).toBe('Random author')
  expect(createBlog.mock.calls[0][0].url).toBe('Random url')
})