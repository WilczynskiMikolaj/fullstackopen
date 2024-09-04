const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByTestId('log in').click()
}


const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()

    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)

    await page.getByRole('button', { name: 'create'}).click()
    await page.getByTestId(`blog-${title}`).waitFor()
  }

const likeBlog = async (page, title) => {
  await page.getByTestId(`view-button-${title}`).click()
  await page.getByTestId(`like-button-${title}`).click()
  await page.getByTestId(`hide-button-${title}`).click()
}

export { loginWith, createBlog, likeBlog }