import { Divider, Grid, Typography } from '@mui/material'
import { BlockerRow } from 'Components/BlockerRow'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBlockedAssertionsByPortfolioId, selectBlockedAssertionsInAPortfolio } from 'Redux/Assertions/selectors'

function BlockerList({ portfolioId }) {

    const blockers = useSelector(state => portfolioId
        ? selectBlockedAssertionsByPortfolioId(state, portfolioId)
        : selectBlockedAssertionsInAPortfolio(state)
    )

    return (
        <Grid
            container
            wrap = 'nowrap'
            direction = 'column'
            style = {{ maxHeight: '100%' }}
            data-testid = 'BlockerList__grid-container'
        >
            {blockers.map((blocker, index) => (
                <React.Fragment key = {index}>
                    <BlockerRow
                        assertionId = {blocker.id}
                        productId = {blocker.productId}
                        commentId = {blocker.commentIds[blocker.commentIds.length - 1]}
                    />
                    <Divider />
                </React.Fragment>
            ))}
            {blockers.length === 0 &&
                <Typography
                    variant = 'h6'
                    color = 'text.secondary'
                    style = {{
                        fontWeight: 300,
                        fontStyle: 'italic'
                    }}
                >
                    No Blockers Detected! Yahoo!
                </Typography>
            }
        </Grid>
    )
}

BlockerList.propTypes = {
    portfolioId: PropTypes.number
}

BlockerList.defaultProps = {
    portfolioId: null
}

export default BlockerList