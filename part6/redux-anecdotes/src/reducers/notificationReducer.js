import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    'name': 'notification',
    initialState: '',
    reducers: {
        seeNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        }
    }
})

export const { seeNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, time) => {
    return async (dispatch) => {
        dispatch(seeNotification(message));
        setTimeout(() => {
            dispatch(clearNotification());
        }, time * 1000);
    };
};