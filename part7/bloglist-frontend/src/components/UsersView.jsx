import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const UsersView = () => {
    const result = useQuery({
        queryKey: ['users'],
        queryFn: usersService.getUsers,
        retry: 1,
        refetchOnWindowFocus: false
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }
    if (result.isError) {
        return <div>Error: Users loading was unsuccesful</div>
    }

    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th></th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {result.data.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default UsersView