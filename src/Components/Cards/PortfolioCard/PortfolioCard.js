import { Box, Card, CardContent, CardHeader, IconButton, makeStyles } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openPopup } from '../../../Redux/Popups/actions'
import PortfolioConstants from '../../../Redux/Portfolios/constants'
import { selectPortfolioById } from '../../../Redux/Portfolios/selectors'
import { Tag } from '../../Tag'

const useStyles = makeStyles(theme => ({
    card: {
        width: '450px',
        height: 'fit-content',
        backgroundColor: theme.palette.grey[1100]
    },
    link: {
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: 'pointer'
        },
        height: 40
    }
}))

function PortfolioCard({ id }) {
    const dispatch = useDispatch()
    const classes = useStyles()
    const ref = useRef()

    const portfolio = useSelector(state => selectPortfolioById(state, id))

    const updatePortfolioPopup = () => {
        dispatch(openPopup(PortfolioConstants.UPDATE_PORTFOLIO, 'CreateOrUpdatePortfolioPopup', { id }))
    }

    useLayoutEffect(() => {
        const spans = Math.ceil(ref.current.clientHeight / 2) + 5
        ref.current.style.gridRowEnd = `span ${spans}`
    })

    return (
        <Card ref = {ref} className = {classes.card}>
            <CardHeader
                title = {portfolio.name}
                titleTypographyProps = {{ variant: 'h5', style: { padding: '5px' } }}
                action = {
                    <IconButton
                        onClick = {updatePortfolioPopup}
                        color = 'secondary'
                        data-testid = 'PortfolioCard__button-edit'
                    >
                        <Edit />
                    </IconButton>
                }
            />
            <CardContent>
                {portfolio.tags?.length > 0 &&
                    <Box display = 'flex' flexWrap = 'wrap' marginTop = {2}>
                        {portfolio.tags.map((tag, index) => (
                            <Tag { ...tag } key = {index}/>
                        ))}
                    </Box>
                }
            </CardContent>
        </Card>
    )
}

PortfolioCard.propTypes = {
    id: PropTypes.number.isRequired
}

export default PortfolioCard