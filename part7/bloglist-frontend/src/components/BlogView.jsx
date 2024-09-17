import { useNotificationDispatch } from './NotificationContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'


const BlogView = ({ blog, currentUser }) => {
    const queryClient = useQueryClient()
    const dispatchNotification = useNotificationDispatch()
    const navigate = useNavigate()

    const likeBlogMutation = useMutation({
        mutationFn: ({ id, blogObject }) => blogService.updateBlog(id, blogObject),
        onSuccess: (updatedBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
        }
    })

    const removeBlogMutation = useMutation({
        mutationFn: blogService.removeBlog,
        onSuccess: (removedBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.filter(b => b.id !== removedBlog.id))
        }
    })

    const addCommentMutation = useMutation({
        mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
        onSuccess: (returnedBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.map(b => b.id === returnedBlog.id ? returnedBlog : b))
        }
    })

    const updateLikes = async (id, blogObject) => {
        likeBlogMutation.mutate({ id, blogObject })
        dispatchNotification({ type: 'SHOW', payload: `a blog ${blogObject.title} by ${blogObject.author} was liked` })
        setTimeout(() => dispatchNotification({ type: 'CLEAR' }), 5000)
    }

    const removeBlog = async id => {
        removeBlogMutation.mutate(id)
        navigate('/')
    }

    const addComment = (event) => {
        event.preventDefault()
        const content = event.target.comment.value
        event.target.comment.value = ''
        addCommentMutation.mutate({ id: blog.id, comment: content })
    }
    return (
        <div>
            <h1>{blog.title} {blog.author}</h1>
            <p>{blog.url} </p>
            <p>{blog.likes} likes <Button variant="outline-success" data-testid={`like-button-${blog.title}`} onClick={() => updateLikes(blog.id, blog)}>like</Button></p>
            <p>added by {blog.user.username}</p>
            {((blog.user.username === currentUser.username || blog.user.id === currentUser.id) ? true : false) &&
                <Button variant="outline-danger" onClick={() => removeBlog(blog.id)} data-testid='remove-button'>remove</Button>}
            <h2>comments</h2>
            <br></br>
            <Form onSubmit={addComment}>
                <Form.Group className="mb-3" controlId="formComment">
                    <Form.Label>comment:</Form.Label>
                    <Form.Control name='comment' type='text' />
                    <Form.Text className="text-muted">
                        Share your awesome comment!
                    </Form.Text>
                </Form.Group>
                <Button variant="outline-primary" type="submit">add comment</Button>
            </Form>
            <ListGroup variant="flush">
                {blog.comments.map((comment) => <ListGroup.Item key={comment}>{comment}</ListGroup.Item>)}
            </ListGroup>
        </div>
    )
}

export default BlogView