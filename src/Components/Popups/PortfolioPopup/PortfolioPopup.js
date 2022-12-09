import { Search } from '@mui/icons-material'
import { Autocomplete, Box, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { unwrapResult } from '@reduxjs/toolkit'
import { Popup } from 'Components/Popup'
import { SearchUsers } from 'Components/Search'
import useFormReducer from 'Hooks/useFormReducer'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from 'Redux/Errors/selectors'
import { closePopup } from 'Redux/Popups/actions'
import {
    requestCreatePortfolio,
    requestUpdatePortfolio
} from 'Redux/Portfolios/actions'
import PortfolioConstants from 'Redux/Portfolios/constants'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { selectProducts } from 'Redux/Products/selectors'
import {
    selectSourceControlById,
    selectSourceControls
} from 'Redux/SourceControls/selectors'
import { requestSearchUsers } from 'Redux/Users/actions'
import { selectUsers } from 'Redux/Users/selectors'
import { styled } from 'Styles/materialThemes'
import FormatErrors from 'Utilities/FormatErrors'
import { sortArrayAlphabetically } from 'Utilities/sorting'

const TextFieldStyled = styled(TextField)(() => ({
    width: '47%'
}))

const TypographyStyled = styled(Typography)(() => ({
    fontSize: '12px',
    fontWeight: 'bold',
    paddingTop: '20px'
}))

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Portfolio' : 'Portfolio Settings',
        submitText: create ? 'create' : 'update',
        constant: create ? PortfolioConstants.CREATE_PORTFOLIO : PortfolioConstants.UPDATE_PORTFOLIO,
        request: (data) => create ? requestCreatePortfolio(data) : requestUpdatePortfolio(data)
    }
}

const setOptionLabel = (option) => (option.displayName || option.username) ?? ''

function PortfolioPopup({ id }) {
    const dispatch = useDispatch()

    const portfolio = useSelector(state => selectPortfolioById(state, id))

    const [formValues, formDispatch] = React.useReducer(useFormReducer, {
        name: portfolio.name,
        description: portfolio.description,
        gitlabGroupId: portfolio.gitlabGroupId ?? '',
        sprintStartDate: portfolio.sprintStartDate,
        sprintDurationInDays: portfolio.sprintDurationInDays,
        products: portfolio.products,
        owner: undefined,
        adminIds: portfolio.personnel?.adminIds ?? []
    })

    const selectedSourceControl = useSelector((state) => selectSourceControlById(state, portfolio.sourceControlId))
    const allSourceControls = useSelector(selectSourceControls)
    const allUsers = useSelector(state => sortArrayAlphabetically(selectUsers(state), 'username'))
    const allProducts = useSelector(state => sortArrayAlphabetically(selectProducts(state), 'name'))

    const [selectedProducts, unselectedProducts] = allProducts
        .reduce(([selected, unselected], product) => {
            if (product.isArchived || !(product.portfolioId === portfolio.id || product.portfolioId === null)) {
                return [selected, unselected]
            }
            formValues?.products.some(p => p.id === product.id) ? selected.push(product) : unselected.push(product)
            return [selected, unselected]
        }, [[], []])

    const [selectedAdmins, unselectedAdmins] = allUsers
        .reduce(([selected, unselected], u) => {
            formValues?.adminIds.includes(u.id) ? selected.push(u) : unselected.push(u)
            return [selected, unselected]
        }, [[], []])

    const context = initDetails(portfolio.id === undefined)
    const [fetched, setFetched] = useState(false)
    const [sourceControl, setSourceControl] = useState(
        selectedSourceControl.id !== undefined ? selectedSourceControl : null
    )

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const nameError = useMemo(() => errors.filter(error => error.includes('name')), [errors])
    const uniqueGroupAndSourceIdError = useMemo(() => errors.filter(error => error.includes('Gitlab'), [errors]))

    const handleChange = (name, value) => {
        formDispatch({
            type: 'onChange',
            payload: { name, value }
        })
    }

    const onClose = () => dispatch(closePopup(context.constant))

    const setIds = (values) => {
        let ids = []
        values.forEach(v => {
            ids.push(v.id)
        })
        handleChange('adminIds', ids)
    }

    const onSubmit = () => {
        const adminIdsFinal = new Set(formValues.adminIds)
        dispatch(context.request({
            ...portfolio,
            name: formValues.name,
            description: formValues.description,
            gitlabGroupId: formValues.gitlabGroupId,
            sprintStartDate: formValues.sprintStartDate,
            sprintDurationInDays: formValues.sprintDurationInDays,
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
        dispatch(requestSearchUsers())
    }, [])

    useEffect(() => {
        if (!fetched && portfolio?.personnel?.ownerId > 0) {
            setFetched(true)
            dispatch(requestSearchUsers(`id:${portfolio.personnel.ownerId}`)).then(unwrapResult)
                .then(data => { handleChange('owner', data[0]) })
        }
    }, [portfolio.name])

    return (
        <Popup
            hideRequiredText
            disableDefaultDivider
            title = {context.title}
            onClose = {onClose}
            onSubmit = {onSubmit}
            submitText = {context.submitText}
            width = '500px'
        >
            <Typography fontSize = '12px' fontWeight = 'bold'> Information </Typography>
            <Box display = 'flex' flexDirection = 'column'>
                <TextField
                    label = 'Portfolio Title'
                    inputProps = {{
                        'data-testid': 'PortfolioPopup__input-title'
                    }}
                    value = {formValues.name}
                    onChange = {(e) => handleChange('name', e.target.value)}
                    error = {nameError.length > 0}
                    helperText = {<FormatErrors errors = {nameError}/>}
                    margin = 'dense'
                    variant = 'filled'
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
                    variant = 'filled'
                    multiline
                />
                <TypographyStyled> Gitlab Settings </TypographyStyled>
                <Stack direction = 'row' justifyContent = 'space-between'>
                    <Autocomplete
                        value = {sourceControl}
                        isOptionEqualToValue = {(option, value) => option.id === value.id}
                        onChange = {(_e, values) => setSourceControl(values)}
                        options = {allSourceControls}
                        getOptionLabel = {(option) => option.name}
                        sx = {{
                            width: '47%'
                        }}
                        renderInput = {(params) => (
                            <TextField
                                {...params}
                                label = 'Gitlab server'
                                InputProps = {{
                                    ...params.InputProps,
                                    readOnly: true,
                                }}
                                margin = 'dense'
                                variant = 'filled'
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
                        error = {uniqueGroupAndSourceIdError.length > 0}
                        helperText = {<FormatErrors errors = {uniqueGroupAndSourceIdError} />}
                        margin = 'dense'
                        variant = 'filled'
                    />
                </Stack>
                <TypographyStyled> Sprint Settings </TypographyStyled>
                <Stack direction = 'row' justifyContent = 'space-between'>
                    <TextFieldStyled
                        label = 'Sprint Duration In Days'
                        type = 'number'
                        inputProps = {{
                            'data-testid': 'PortfolioPopup__input-sprint-duration',
                        }}
                        value = {formValues.sprintDurationInDays}
                        onChange = {(e) => handleChange('sprintDurationInDays', e.target.value)}
                        margin = 'dense'
                        variant = 'filled'
                    />
                    <div style = {{ width: '47%', marginTop: '8px', marginBottom: '8px' }}>
                        <LocalizationProvider dateAdapter = {AdapterDayjs}>
                            <DatePicker
                                label = 'Sprint Start Date'
                                openTo = 'day'
                                views = {['day']}
                                value = {formValues.sprintStartDate}
                                onChange = {(newValue) => handleChange('sprintStartDate', newValue)}
                                format = 'MMM-DD-YYYY'
                                renderInput = {(params) => (
                                    <TextField
                                        {...params}
                                        variant = 'filled'
                                        helperText = {params?.inputProps?.placeholder}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                </Stack>
                <TypographyStyled> Portfolio and Product Settings </TypographyStyled>
                <Autocomplete
                    multiple
                    autoSelect
                    freeSolo
                    forcePopupIcon
                    style = {{ marginBottom: '8px' }}
                    sx = {{ alignSelf: 'baseline', width: '100%' }}
                    options = {unselectedProducts}
                    getOptionLabel = {(option) => option.name}
                    isOptionEqualToValue = {(option, value) =>  option.id === value.id }
                    data-testid = 'PortfolioPopup__select-products'
                    onChange = {(_e, values) => handleChange('products', values) }
                    value = {selectedProducts}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Products'
                            margin = 'dense'
                            placeholder = {selectedProducts ? '' : 'Products in this portfolio'}
                            variant = 'filled'
                            InputProps = {{
                                ...params.InputProps,
                                startAdornment: (
                                    <Stack
                                        marginTop = '4px'
                                        direction = 'row'
                                        flexWrap = 'wrap'
                                    >
                                        <InputAdornment position = 'start'>
                                            <Search/>
                                        </InputAdornment>
                                        {params.InputProps.startAdornment}
                                    </Stack>
                                )
                            }}
                        />
                    }
                />
                <SearchUsers
                    title = 'Portfolio Owner'
                    value = {formValues.owner}
                    onChange = {(_e, values) => { handleChange('owner', values) }}
                    variant = 'filled'
                />
                <Autocomplete
                    multiple
                    autoSelect
                    freeSolo
                    forcePopupIcon
                    style = {{ marginBottom: '8px' }}
                    sx = {{ alignSelf: 'baseline', width: '100%' }}
                    options = {unselectedAdmins}
                    getOptionLabel = {(option) => setOptionLabel(option)}
                    isOptionEqualToValue = {(option, value) => option.id === value.id }
                    data-testid = 'PortfolioPopup__enter-admins'
                    onChange = {(_e, values) => setIds(values) }
                    value = {selectedAdmins}
                    renderInput = {(params) =>
                        <TextField
                            {...params}
                            label = 'Portfolio Admins'
                            margin = 'dense'
                            placeholder = {selectedAdmins ? '' : 'Admins for this portfolio'}
                            variant = 'filled'
                            InputProps = {{
                                ...params.InputProps,
                                startAdornment: (
                                    <Stack
                                        marginTop = '4px'
                                        direction = 'row'
                                        flexWrap = 'wrap'
                                    >
                                        <InputAdornment position = 'start'>
                                            <Search/>
                                        </InputAdornment>
                                        {params.InputProps.startAdornment}
                                    </Stack>
                                )
                            }}
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
