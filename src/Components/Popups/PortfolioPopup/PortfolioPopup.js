import { Autocomplete, Box, TextField } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { Popup } from 'Components/Popup'
import { SearchUsers } from 'Components/Search'
import { TagDropdown } from 'Components/TagDropdown'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import { requestCreatePortfolio, requestUpdatePortfolio } from 'Redux/Portfolios/actions'
import PortfolioConstants from 'Redux/Portfolios/constants'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { selectAvailableProducts } from 'Redux/Products/selectors'
import { requestFindUserBy } from 'Redux/Users/actions'
import FormatErrors from 'Utilities/FormatErrors'

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Portfolio' : 'Update Portfolio',
        constant: create ? PortfolioConstants.CREATE_PORTFOLIO : PortfolioConstants.UPDATE_PORTFOLIO,
        request: (data) => create ? requestCreatePortfolio(data) : requestUpdatePortfolio(data)
    }
}

const searchErrors = (errors, searchString) => errors.filter(error => error.includes(searchString))

function PortfolioPopup({ id }) {
    const dispatch = useDispatch()

    const portfolio = useSelector(state => selectPortfolioById(state, id))
    const context = initDetails(portfolio.id === undefined)
    const [fetched, setFetched] = useState(false)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const nameError = useMemo(() => errors.filter(error => error.includes('name')), [errors])

    const notAssignedProducts = useSelector(selectAvailableProducts)
    const availableProducts = notAssignedProducts.concat(portfolio.products)

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        name: portfolio.name,
        description: portfolio.description,
        tags: portfolio.tags,
        products: portfolio.products,
        owner: undefined
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const onClose = () => dispatch(closePopup(context.constant))

    const onSubmit = () => {
        dispatch(context.request({
            ...portfolio,
            name: formValues.name,
            description: formValues.description,
            tagIds: Object.values(formValues.tags.map(t => t.id)),
            childIds: Object.values(formValues.products.map(p => p.id)),
            ownerId: formValues.owner?.id ?? null,
            type: 'PORTFOLIO',
            projectIds: [],
            teamIds: [],
            roadmapType: 'MANUAL'
        }))
    }

    useEffect(() => {
        if (!fetched && portfolio.ownerId > 0) {
            setFetched(true)
            dispatch(requestFindUserBy(`id:${portfolio.ownerId}`)).then(unwrapResult)
                .then(data => { handleChange('owner', data[0]) })
        }
    }, [portfolio])

    return (
        <Popup
            title = {context.title}
            onClose = {onClose}
            onSubmit = {onSubmit}
        >
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Portfolio Name'
                    inputProps = {{
                        'data-testid': 'PortfolioPopup__input-name'
                    }}
                    value = {formValues.name}
                    onChange = {(e) => handleChange('name', e.target.value)}
                    error = {nameError.length > 0}
                    helperText = {<FormatErrors errors = {nameError}/>}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    placeholder = {`What's the purpose of ${formValues.name ? formValues.name : 'this portfolio'}?`}
                    inputProps = {{
                        'data-testid': 'PortfolioPopup__input-description'
                    }}
                    value = {formValues.description}
                    onChange = {(e) => handleChange('description', e.target.value)}
                    margin = 'dense'
                    multiline
                />
                <SearchUsers
                    title = 'Portfolio Owner'
                    value = {formValues.owner}
                    onChange = {(_e, values) => handleChange('owner', values)}
                />
                <TagDropdown
                    defaultTags = {formValues.tags}
                    error = {searchErrors(errors, 'Tag')}
                    deletable
                    onChange = {(values) => handleChange('tags', values)}
                    label = 'Tag(s)'
                    type = {['ALL', 'PORTFOLIO']}
                    creatable
                    creatableType = 'PORTFOLIO'
                    forcePopupIcon
                />
                <Autocomplete
                    multiple
                    autoSelect
                    options = {availableProducts}
                    getOptionLabel = {(option) => option.name}
                    isOptionEqualToValue = {(option, value) => option.id === value.id}
                    groupBy = {(option) => option.firstLetter}
                    data-testid = 'PortfolioPopup__select-products'
                    onChange = {(_e, values) => handleChange('products', values)}
                    value = {formValues.products}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Products'
                            margin = 'dense'
                            placeholder = 'Products in this portfolio'
                        />
                    }
                />
            </Box>
        </Popup>
    )
}

PortfolioPopup.propTypes = {
    id: PropTypes.number
}

PortfolioPopup.defaultProps = {
    id: 1
}

export default PortfolioPopup
