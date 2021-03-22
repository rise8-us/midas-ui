import { createSlice } from '@reduxjs/toolkit'
import { closePopup } from '../Popups/actions'

const isRejectedAction = (action) => action.type.endsWith('rejected')
const isFulfilledAction = (action) =>  action.type.endsWith('fulfilled')

const errorSlice = createSlice({
    name: 'errors',
    initialState: { },
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(closePopup, (state, action) => {
                state[action.payload.name] = []
            })
            .addMatcher(
                isFulfilledAction,
                (state, action) => {
                    const request = action.type.split('/fulfilled')[0]
                    state[request] = []
                }
            )
            .addMatcher(
                isRejectedAction,
                (state, action) => {
                    const request = action.type.split('/rejected')[0]

                    if (Array.isArray(action.payload)) state[request] = action.payload
                    else if (action.payload) state[request] = [action.payload]
                    else state[request] = [action.error.message]
                }
            )

    }
})

export default errorSlice.reducer
