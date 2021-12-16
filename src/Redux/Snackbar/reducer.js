import { createSlice } from '@reduxjs/toolkit'

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        messages: []
    },
    reducers: {
        enqueueMessage: (state, action) => {
            const { payload } = action
            const duplicateMessages = state.messages.filter(v => v.id === payload.id).length
            if (!duplicateMessages) {
                state.messages.push({
                    ...payload,
                    timeout: payload.timeout ?? 3000,
                    severity: payload.severity ?? 'info',
                    id: payload.id ?? Date.now(),
                })
            }
        },
        removeMessage: (state, action) => {
            const { payload } = action
            state.messages = state.messages.filter(message => message.id !== payload.id)
        },
        removeAllMessages: (state) => {
            state.messages = []
        }
    },
    extraReducers: {}
})

export const { enqueueMessage, removeMessage, removeAllMessages } = snackbarSlice.actions

export default snackbarSlice.reducer