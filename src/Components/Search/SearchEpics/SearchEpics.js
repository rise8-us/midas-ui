import { unwrapResult } from '@reduxjs/toolkit'
import { SearchBar } from 'Components/Search'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFetchSearchEpics } from 'Redux/Epics/actions'

export default function SearchEpics({ onChange, ...autoCompleteProps }) {
    const dispatch = useDispatch()

    const products = useSelector(state => state.products)

    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)

    const onTextFieldChange = (input) => {
        const searchValue = input.length > 0
            ? `title:*${input}* OR product.name:*${input}* AND state!closed`
            : 'state!closed'

        dispatch(requestFetchSearchEpics(searchValue))
            .then(unwrapResult)
            .then((data) => {
                const newData = data.map(option => {
                    return {
                        productName: products[option.productId]?.name,
                        ...option
                    }
                }).sort((a, b) => a.productId - b.productId)
                setOptions(newData)
                setLoading(false)
            })
    }

    return (
        <SearchBar
            {...autoCompleteProps}
            autoComplete
            multiple
            freeSolo
            handleHomeEndKeys
            showLoading
            loadingText = 'Searching epics...'
            value = {[]}
            loading = {loading}
            onChange = {onChange}
            onTextFieldChange = {onTextFieldChange}
            groupBy = {(option) => option.productName}
            getOptionLabel = {(option) => option.title}
            options = {options}
            textFieldProps = {{
                label: '',
                placeholder: 'Search by title or product name',
                margin: 'dense'
            }}
            renderOption = {(props, option) => (
                <li {...props} key = {option.id}>
                    {option.title}
                </li>
            )}
            filterOptions = {(opts, params) => {
                return opts.filter(option =>
                    option.title?.toUpperCase().includes(params.inputValue?.toUpperCase()) ||
                    option.productName?.toUpperCase().includes(params.inputValue?.toUpperCase())
                )
            }}
        />
    )
}

SearchEpics.propTypes = {
    onChange: PropTypes.func.isRequired,
}
