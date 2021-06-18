import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        appBar: {
            filterString: ''
        },
        homePage: {
            filterString: ''
        }
    },
    reducers: {
        setHomePageFilterString: (state, action) => {
            state.homePage.filterString = action.payload
        },
        setAppBarFilterString: (state, action) => {
            state.appBar.filterString = action.payload
        }
    },
    extraReducers: {
    }
})

export const {
    setAppBarFilterString,
    setHomePageFilterString,
} = filtersSlice.actions

export default filtersSlice.reducer