const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'testuser1',
                username: 'testuser1',
                password: 'testuser1'
            }
        })
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'testuser2',
                username: 'testuser2',
                password: 'testuser2'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const loginForm = await page.getByTestId('login-form')
        await expect(loginForm).toBeVisible();
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'testuser1', 'testuser1')

            await expect(page.getByText('testuser1 logged in ')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('teasdasd')
            await page.getByTestId('password').fill('teadsa')
            await page.getByTestId('log in').click()

            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('wrong username or password')
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'testuser1', 'testuser1')
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()

            await page.getByTestId('title').fill('Meditations')
            await page.getByTestId('author').fill('Marcus Aurelius')
            await page.getByTestId('url').fill('ImperumRoma.com')

            await page.getByRole('button', { name: 'create' }).click()

            await expect(page.getByText('a new blog Meditations by Marcus Aurelius added')).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            await createBlog(page, 'Meditations', 'Marcus Aurelius', 'ImperumRoma.com')

            await page.getByTestId('view-button').click()
            await page.getByTestId('like-button-Meditations').click()

            await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('user who added a blog can delete it', async ({ page }) => {
            await createBlog(page, 'Meditations', 'Marcus Aurelius', 'ImperumRoma.com')

            await page.getByTestId('view-button').click()

            await expect(page.getByTestId('blog-Meditations')).toBeVisible()

            page.on('dialog', dialog => dialog.accept());
            await page.getByTestId('remove-button').click()

            await expect(page.getByTestId('blog-Meditations')).toBeHidden()
        })

        test('only user who added a blog can see blog delete button', async ({ page }) => {
            await createBlog(page, 'Meditations', 'Marcus Aurelius', 'ImperumRoma.com')
            await page.getByTestId('view-button').click()

            await expect(page.getByTestId('remove-button')).toBeVisible()

            await page.getByTestId('logout-button').click()

            await loginWith(page, 'testuser2', 'testuser2')
            await page.getByTestId('view-button').click()

            await expect(page.getByTestId('remove-button')).toBeHidden()

        })
    })

    describe('When logged in and several blogs exist', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'testuser1', 'testuser1')
            await createBlog(page, 'General', 'Agrippa', 'ImperumRoma.com')
            await createBlog(page, 'Egypt', 'Cleopatra', 'ImperumRoma.com')

            await page.getByRole('button', { name: 'view'}).first().click()
            await page.getByRole('button', { name: 'view'}).first().click()

            await page.getByTestId('like-button-Egypt').click()
            await page.getByText(`likes 1`).waitFor()
            await page.getByTestId('like-button-Egypt').click()
            await page.getByText(`likes 2`).waitFor()
            await page.getByTestId('like-button-Egypt').click()
            await page.getByText(`likes 3`).waitFor()

            await page.getByTestId('like-button-General').click()
            await page.getByText(`likes 1`).waitFor()
        })

        test('blogs are arranged in the order according to the likes', async ({ page }) => {
            await page.getByText('testuser1 logged in ').waitFor()
            await page.getByTestId('blog-Egypt').waitFor()
            await page.getByTestId('blog-General').waitFor()
            const blogDivs = await page.locator('.blog').all()

            await expect(blogDivs[0]).toContainText('Egypt Cleopatra')
            await expect(blogDivs[1]).toContainText('General Agrippa')

        })

    })
})