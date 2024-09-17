import { useNotificationValue } from './NotificationContext'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useNotificationValue()

  return (
    <div>
      <Alert variant={'info'}>{notification}</Alert>
    </div>
  )
}

export default Notification
