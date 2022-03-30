import { Add, Archive, Edit, Unarchive } from '@mui/icons-material'
import { Box, Button, Chip, IconButton } from '@mui/material'
import { Table } from 'Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from 'Redux/Popups/actions'
import { requestArchivePortfolio } from 'Redux/Portfolios/actions'
import PortfolioConstant from 'Redux/Portfolios/constants'
import { selectAllPortfolios } from 'Redux/Portfolios/selectors'

function PortfoliosTab() {
    const dispatch = useDispatch()
    const allPortfolios = useSelector(selectAllPortfolios)

    const createPortfolio = () => dispatch(
        openPopup(PortfolioConstant.CREATE_PORTFOLIO, 'PortfolioPopup'))
    const updatePortfolio = (id) => dispatch(
        openPopup(PortfolioConstant.UPDATE_PORTFOLIO, 'PortfolioPopup', { id }))
    const archivePortfolio = (id, isArchived) => dispatch(requestArchivePortfolio({ id, isArchived: !isArchived }))
    const buildRows = () => {
        return allPortfolios.map(portfolio => ({
            data: [
                portfolio.name,
                buildProducts(portfolio.products),
                buildActions(portfolio.id, portfolio.isArchived)
            ],
            properties: { strikeThrough: portfolio.isArchived }
        }))
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
        return <>
            <IconButton
                title = {isArchived ? 'unarchive' : 'archive' }
                color = 'secondary'
                onClick = {() => archivePortfolio(id, isArchived)}
                size = 'large'
            >
                {isArchived ? <Unarchive /> : <Archive />}
            </IconButton>
            {!isArchived &&
                <IconButton
                    title = 'edit'
                    color = 'secondary'
                    onClick = {() => updatePortfolio(id)}
                    size = 'large'
                >
                    <Edit />
                </IconButton>
            }
        </>
    }

    return (
        <div style = {{ padding: '24px' }}>
            <Box display = 'block' width = '75vw' margin = 'auto' textAlign = 'right' padding = '24px 0'>
                <Button
                    variant = 'text'
                    startIcon = {<Add/>}
                    onClick = {createPortfolio}
                >
                    Add New Portfolio
                </Button>
            </Box>
            <Table
                rows = {buildRows()}
                columns = {['Name', 'Product(s)', '']}
            />
        </div>
    )
}

export default PortfoliosTab
