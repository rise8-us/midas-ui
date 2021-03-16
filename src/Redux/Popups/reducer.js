import { createSlice } from '@reduxjs/toolkit'
import * as actions from './actions'

const PopupsSlice = createSlice({
    name: 'Popups',
    initialState: { },
    reducers: { },
    extraReducers: builder => {
        builder
            .addCase(actions.openPopup, (state, action) => {
                state[action.payload.name] = action.payload
            })
            .addCase(actions.closePopup, (state, action) => {
                state[action.payload.name] = action.payload
            })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('fulfilled')
                },
                (state, action) => {
                    const name = action.type.split('/fulfilled')[0]
                    if (state[name] !== undefined) {
                        state[name] = { open: false, name, componentName: '', props: {} }
                    }
                }
            )
    }
})

export default PopupsSlice.reducer
