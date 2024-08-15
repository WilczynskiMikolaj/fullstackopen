const Notification = ({ message, notificationType }) => {
    if (message === '') {
        return null
    }

    if (notificationType === 'error') {
        return (
            <div className='error'>
                {message}
            </div>
        )
    }
    return (
        <div className='notification'>
            {message}
        </div>
    )

}

export default Notification