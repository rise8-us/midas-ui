import { createSlice } from '@reduxjs/toolkit'

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        messages: []
    },
    reducers: {
        enqueueMessage: (state, action) => {
            const { payload } = action
            state.messages.push({
                ...payload,
                timeout: payload.timeout ?? 3000,
                severity: payload.severity ?? 'info',
                key: payload.key ?? Date.now(),
            })
        },
        removeMessage: (state, action) => {
            const { payload } = action
            state.messages = state.messages.filter(message => message.key !== payload.key)
        },
        removeAllMessages: (state) => {
            state.messages = []
        }
    },
    extraReducers: {}
})

export const { enqueueMessage, removeMessage, removeAllMessages } = snackbarSlice.actions

export default snackbarSlice.reducer