import { unwrapResult } from '@reduxjs/toolkit'
import { SearchBar } from 'Components/Search'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFetchSearchEpics } from 'Redux/Epics/actions'

export default function SearchEpics({
    onChange, defaultSearchTerms, excludeClosed, textFieldProps, ...autoCompleteProps
}) {
    const dispatch = useDispatch()

    const products = useSelector(state => state.products)

    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)

    const onTextFieldChange = (input) => {
        const searchTerms = []
        excludeClosed && searchTerms.push('state!closed')
        input.length > 0 && searchTerms.push(`title:*${input}* OR product.name:*${input}*`)
        defaultSearchTerms && searchTerms.push(defaultSearchTerms)

        dispatch(requestFetchSearchEpics(searchTerms.join(' AND ')))
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
                margin: 'dense',
                ...textFieldProps
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
    defaultSearchTerms: PropTypes.string,
    excludeClosed: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    textFieldProps: PropTypes.shape({
        label: PropTypes.string,
        placeholder: PropTypes.string,
        size: PropTypes.string,
        variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
    })
}

SearchEpics.defaultProps = {
    defaultSearchTerms: null,
    excludeClosed: false,
    textFieldProps: {
        label: '',
        placeholder: 'Link epics by title or product name',
        size: undefined,
        variant: undefined,
    }
}
