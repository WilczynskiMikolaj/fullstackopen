import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import userService from '../services/users'
import { useParams } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const UserView = () => {
    const id = useParams().id
    const resultBlogs = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll,
        retry: 1,
        refetchOnWindowFocus: false
    })

    const resultUsers = useQuery({
        queryKey: ['users'],
        queryFn: userService.getUsers,
        retry: 1,
        refetchOnWindowFocus: false
    })

    if (resultBlogs.isLoading || resultUsers.isLoading) {
        return <div>loading data...</div>
    }
    if (resultUsers.isError) {
        return <div>Error: Users loading was unsuccesful</div>
    }
    if (resultBlogs.isError) {
        return <div>Error: Blogs loading was unsuccesful</div>
    }

    const user = resultUsers.data.find((user) => user.id === id)
    if (!user) {
        return null
    }
    const blogs = resultBlogs.data.filter((blog) => blog.user.name === user.name)

    return (
        <div>
            <h2>{user.name}</h2>
            <ListGroup variant="flush">
                {blogs.map((blog) => <ListGroup.Item className='text-secondary' key={blog.id}>{blog.title}</ListGroup.Item>)}
            </ListGroup>
        </div>
    )
}

export default UserView