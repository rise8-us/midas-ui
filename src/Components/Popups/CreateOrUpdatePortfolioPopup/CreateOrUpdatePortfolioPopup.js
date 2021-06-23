import { Box, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRequestErrors } from '../../../Redux/Errors/selectors'
import { closePopup } from '../../../Redux/Popups/actions'
import { requestCreatePortfolio, requestUpdatePortfolio } from '../../../Redux/Portfolios/actions'
import PortfolioConstants from '../../../Redux/Portfolios/constants'
import { selectPortfolioById } from '../../../Redux/Portfolios/selectors'
import { selectAvailableProducts } from '../../../Redux/Products/selectors'
import FormatErrors from '../../../Utilities/FormatErrors'
import { Popup } from '../../Popup'
import { TagDropdown } from '../../TagDropdown'

const initDetails = (create) => {
    return {
        isCreate: create,
        title: create ? 'Create Portfolio' : 'Update Portfolio',
        constant: create ? PortfolioConstants.CREATE_PORTFOLIO : PortfolioConstants.UPDATE_PORTFOLIO,
        request: (data) => create ? requestCreatePortfolio(data) : requestUpdatePortfolio(data)
    }
}

const searchErrors = (errors, searchString) => errors.filter(error => error.includes(searchString))

function CreateOrUpdatePortfolioPopup({ id }) {
    const dispatch = useDispatch()

    const portfolio = useSelector(state => selectPortfolioById(state, id))

    const context = initDetails(portfolio.id === undefined)

    const errors = useSelector(state => selectRequestErrors(state, context.constant))
    const notAssignedProducts = useSelector(selectAvailableProducts)

    const [name, setName] = useState(portfolio.name)
    const [description, setDescription] = useState(portfolio.description)
    const [tags, setTags] = useState(portfolio.tags)
    const [products, setProducts] = useState(portfolio.products)

    const availableProducts = notAssignedProducts.concat(portfolio.products)

    const onNameChange = (e) => setName(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onTagsChange = (value) => setTags(value)

    const onSelectProducts = (_e, values) => setProducts(values)

    const onClose = () => dispatch(closePopup(context.constant))

    const onSubmit = () => {
        dispatch(context.request({
            ...portfolio,
            name,
            description,
            productManagerId: null,
            tagIds: Object.values(tags.map(t => t.id)),
            childIds: Object.values(products.map(p => p.id)),
            type: 'PORTFOLIO',
            projectIds: []
        }))
    }

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
                        'data-testid': 'CreateOrUpdatePortfolioPopup__input-name'
                    }}
                    value = {name}
                    onChange = {onNameChange}
                    error = {searchErrors(errors, 'name').length > 0}
                    helperText = {<FormatErrors errors = {searchErrors(errors, 'name')}/>}
                    margin = 'dense'
                    required
                />
                <TextField
                    label = 'Description'
                    placeholder = {`What's the purpose of ${name ? name : 'this portfolio'}?`}
                    inputProps = {{
                        'data-testid': 'CreateOrUpdatePortfolioPopup__input-description'
                    }}
                    value = {description}
                    onChange = {onDescriptionChange}
                    margin = 'dense'
                    multiline
                />
                <TagDropdown
                    defaultTags = {tags}
                    error = {searchErrors(errors, 'Tag')}
                    deletable
                    onChange = {onTagsChange}
                    label = 'Tag(s)'
                    type = {['ALL', 'PORTFOLIO']}
                />
                <Autocomplete
                    multiple
                    autoSelect
                    options = {availableProducts}
                    getOptionLabel = {(option) => option.name}
                    getOptionSelected = {(option, value) => option.id === value.id}
                    onChange = {onSelectProducts}
                    value = {products}
                    ChipProps = {{ variant: 'outlined' }}
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

CreateOrUpdatePortfolioPopup.propTypes = {
    id: PropTypes.number
}

CreateOrUpdatePortfolioPopup.defaultProps = {
    id: 1
}

export default CreateOrUpdatePortfolioPopup
