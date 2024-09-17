import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './components/NotificationContext'
import { UserContextProvider } from './components/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <UserContextProvider>
            <NotificationContextProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </NotificationContextProvider>
        </UserContextProvider>
    </Router>
)