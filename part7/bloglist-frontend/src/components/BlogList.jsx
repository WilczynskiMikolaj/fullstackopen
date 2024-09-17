import Togglable from './Togglable'
import BlogForm from './blogForm'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'
import { useRef } from 'react'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'


const BlogList = ({ user }) => {
    const queryClient = useQueryClient()
    const dispatchNotification = useNotificationDispatch()
    const blogFormRef = useRef()

    const newBlogMutation = useMutation({
        mutationFn: blogService.createNewBlog,
        onSuccess: (newBlog) => {
            console.log(newBlog)
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
        },
    })

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        retry: 1,
        refetchOnWindowFocus: false
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }
    if (result.isError) {
        return <div>Error: anecdote service not available due to problems in service</div>
    }

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        newBlogMutation.mutate(blogObject)
        dispatchNotification({ type: 'SHOW', payload: `a new blog ${blogObject.title} by ${blogObject.author} added` })
        setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
    }

    const blogs = result.data.sort((blogA, blogB) => blogB.likes - blogA.likes)

    return (
        <div>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
            <br></br>
            <ListGroup variant="flush">
                {blogs.map(blog =>
                    <ListGroup.Item className='text-primary' key={blog.id} as={Link} to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    )
}

export default BlogList