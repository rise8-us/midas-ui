import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        homePage: {
            filterString: ''
        }
    },
    reducers: {
        setHomePageFilterString: (state, action) => {
            state.homePage.filterString = action.payload
        }
    },
    extraReducers: {
    }
})

export const {
    setHomePageFilterString
} = filtersSlice.actions

export default filtersSlice.reducer