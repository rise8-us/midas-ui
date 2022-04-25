import { Autocomplete, Box, TextField } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { Popup } from 'Components/Popup'
import { SearchUsers } from 'Components/Search'
import { UsersCollection } from 'Components/UsersCollection'
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
import { selectSourceControlById, selectSourceControls } from 'Redux/SourceControls/selectors'
import { requestFindUserBy } from 'Redux/Users/actions'
import { styled } from 'Styles/materialThemes'
import FormatErrors from 'Utilities/FormatErrors'

const TextFieldStyled = styled(TextField)(() => ({
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
      {
          display: 'none',
      },
}))

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Portfolio' : 'Update Portfolio',
        constant: create ? PortfolioConstants.CREATE_PORTFOLIO : PortfolioConstants.UPDATE_PORTFOLIO,
        request: (data) => create ? requestCreatePortfolio(data) : requestUpdatePortfolio(data)
    }
}

function PortfolioPopup({ id }) {
    const dispatch = useDispatch()

    const portfolio = useSelector(state => selectPortfolioById(state, id))
    const selectedSourceControl = useSelector((state) => selectSourceControlById(state, portfolio.sourceControlId))
    const allSourceControls = useSelector(selectSourceControls)
    const notAssignedProducts = useSelector(selectAvailableProducts)

    const context = initDetails(portfolio.id === undefined)
    const [fetched, setFetched] = useState(false)
    const [sourceControl, setSourceControl] = useState(
        selectedSourceControl.id !== undefined ? selectedSourceControl : null
    )

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const nameError = useMemo(() => errors.filter(error => error.includes('name')), [errors])
    const gitLabError = useMemo(() => errors.filter(error => error.includes('Gitlab')), [errors])

    const availableProducts = notAssignedProducts.concat(portfolio.products)

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        name: portfolio.name,
        description: portfolio.description,
        gitlabGroupId: portfolio.gitlabGroupId ?? '',
        products: portfolio.products,
        owner: undefined,
        adminIds: portfolio.personnel?.adminIds ?? []
    })

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const onClose = () => dispatch(closePopup(context.constant))

    const onSubmit = () => {
        const adminIdsFinal = new Set(formValues.adminIds)

        dispatch(context.request({
            ...portfolio,
            name: formValues.name,
            description: formValues.description,
            gitlabGroupId: formValues.gitlabGroupId,
            sourceControlId: sourceControl?.id ?? null,
            productIds: formValues.products?.map(product => product.id),
            personnel: {
                ...portfolio.personnel,
                ownerId: formValues?.owner?.id ?? null,
                teamIds: [],
                adminIds: Array.from(adminIdsFinal)
            }
        }))
    }

    useEffect(() => {
        if (!fetched && portfolio?.personnel?.ownerId > 0) {
            setFetched(true)
            dispatch(requestFindUserBy(`id:${portfolio.personnel.ownerId}`)).then(unwrapResult)
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
                <Autocomplete
                    value = {sourceControl}
                    onChange = {(_e, values) => setSourceControl(values)}
                    options = {allSourceControls}
                    getOptionLabel = {(option) => option.name}
                    renderInput = {(params) => (
                        <TextField
                            {...params}
                            label = 'Gitlab server'
                            InputProps = {{
                                ...params.InputProps,
                                readOnly: true,
                            }}
                            margin = 'dense'
                        />
                    )}
                />
                <TextFieldStyled
                    label = 'Gitlab Group Id'
                    type = 'number'
                    inputProps = {{
                        'data-testid': 'PortfolioPopup__input-gitlabGroupId',
                    }}
                    value = {formValues.gitlabGroupId}
                    onChange = {(e) => handleChange('gitlabGroupId', e.target.value)}
                    error = {gitLabError.length > 0}
                    helperText = {<FormatErrors errors = {gitLabError} />}
                    margin = 'dense'
                />
                <Autocomplete
                    multiple
                    autoSelect
                    style = {{ marginBottom: '8px' }}
                    options = {availableProducts}
                    getOptionLabel = {(option) => option?.name}
                    isOptionEqualToValue = {(option, value) => option?.id === value.id}
                    groupBy = {(option) => option?.firstLetter}
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
                <SearchUsers
                    title = 'Portfolio Owner'
                    value = {formValues.owner}
                    onChange = {(_e, values) => handleChange('owner', values)}
                />
                <UsersCollection
                    userIds = {formValues.adminIds}
                    setUserIds = {value => handleChange('adminIds', value)}
                    placeholderValue = 'Add another admin...'
                    title = 'Portfolio Admins'
                    dataTestId = 'PortfolioPopup__enter-admins'
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
