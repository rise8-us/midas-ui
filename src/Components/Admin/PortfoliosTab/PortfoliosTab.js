import { Box, Button, Chip, IconButton, makeStyles } from '@material-ui/core'
import { Add, Archive, Edit, Unarchive } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import { requestArchivePortfolio } from '../../../Redux/Portfolios/actions'
import PortfolioConstant from '../../../Redux/Portfolios/constants'
import { selectAllPortfolios } from '../../../Redux/Portfolios/selectors'
import { Table } from '../../Table'
import { Tag } from '../../Tag'

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        },
        height: 40
    }
}))

function PortfoliosTab() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const allPortfolios = useSelector(selectAllPortfolios)

    const createPortfolio = () => dispatch(
        openPopup(PortfolioConstant.CREATE_PORTFOLIO, 'CreateOrUpdatePortfolioPopup'))
    const updatePortfolio = (id) => dispatch(
        openPopup(PortfolioConstant.UPDATE_PORTFOLIO, 'CreateOrUpdatePortfolioPopup', { id }))
    const archivePortfolio = (id, isArchived) => dispatch(requestArchivePortfolio({ id, isArchived: !isArchived }))

    const buildRows = () => {
        return allPortfolios.map(portfolio => ({
            data: [
                portfolio.name,
                buildProducts(portfolio.products),
                buildTags(portfolio.tags),
                buildActions(portfolio.id, portfolio.isArchived)
            ],
            properties: { strikeThrough: portfolio.isArchived }
        }))
    }

    const buildTags = (portfolios) => {
        return (
            <Box display = 'flex' flexWrap = 'wrap'>
                {portfolios.map((portfolio, index) => (
                    <Tag key = {index} {...portfolio}/>
                ))}
            </Box>
        )
    }

    const buildProducts = (products) => {
        return (
            <Box display = 'flex'>
                {products.map((product, index) => (
                    <Chip variant = 'outlined' size = 'small' key = {index} label = {product.name} />
                ))}
            </Box>
        )
    }

    const buildActions = (id, isArchived) => {
        return (
            <>
                <IconButton
                    title = {isArchived ? 'unarchive' : 'archive' }
                    color = 'secondary'
                    onClick = {() => archivePortfolio(id, isArchived)}
                >
                    {isArchived ? <Unarchive /> : <Archive />}
                </IconButton>
                {!isArchived &&
                    <IconButton
                        title = 'edit'
                        color = 'secondary'
                        onClick = {() => updatePortfolio(id)}
                    >
                        <Edit />
                    </IconButton>
                }
            </>
        )
    }

    return (
        <div style = {{ padding: '24px' }}>
            <Box display = 'block' width = '75vw' margin = 'auto' textAlign = 'right' padding = '24px 0'>
                <Button
                    variant = 'text'
                    startIcon = {<Add/>}
                    className = {classes.button}
                    onClick = {createPortfolio}
                >
                    Add New Portfolio
                </Button>
            </Box>
            <Table
                rows = {buildRows()}
                columns = {['Name', 'Product(s)', 'Tag(s)', '']}
            />
        </div>
    )
}

export default PortfoliosTab
