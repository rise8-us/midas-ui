import React from 'react'
import { useDispatch } from 'react-redux'
import { setHomePageFilterString } from '../../../Redux/Filters/reducer'
import { SearchBar } from '../SearchBar'


function SeachProducts() {
    const dispatch = useDispatch()

    const search = async(searchString) => {
        dispatch(setHomePageFilterString(searchString))
    }

    return (
        <SearchBar
            growFrom = '100%'
            search = {search}
            placeholder = 'Filter by product or project name'
        />
    )
}

export default SeachProducts
