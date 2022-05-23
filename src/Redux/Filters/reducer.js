import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        appBar: {
            filterString: ''
        },
        homePage: {
            filterString: ''
        },
        targetFilters: {
            isPriority: false
        }
    },
    reducers: {
        setHomePageFilterString: (state, action) => {
            state.homePage.filterString = action.payload
        },
        setAppBarFilterString: (state, action) => {
            state.appBar.filterString = action.payload
        },
        setTargetFilters: (state, action) => {
            state.targetFilters.isPriority = action.payload.isPriority
        }
    },
    extraReducers: {
    }
})

export const {
    setAppBarFilterString,
    setHomePageFilterString,
    setTargetFilters
} = filtersSlice.actions

export default filtersSlice.reducer