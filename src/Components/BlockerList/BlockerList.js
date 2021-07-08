import { Divider, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import {
    selectAllBlockedAssertionsWithParentId, selectBlockedAssertionsByParentId
} from '../../Redux/BlockedAssertions/selectors'
import { BlockerRow } from '../BlockerRow'

function BlockerList({ portfolioId }) {

    const assertionStatus = useSelector(state => state.app.assertionStatus)
    const blockers = useSelector(state => portfolioId ? selectBlockedAssertionsByParentId(state, portfolioId) :
        selectAllBlockedAssertionsWithParentId(state))

    return (
        <Grid
            container
            wrap = 'nowrap'
            direction = 'column'
            style = {{ maxHeight: '165px' }}
            data-testid = 'BlockerList__grid-container'
        >
            {blockers.map((blocker, index) => {
                const date = new Date(blocker.comment.lastEdit ?? blocker.comment.creationDate)
                const dateParsed = date.toDateString().split(' ')
                return (
                    <React.Fragment key = {index}>
                        <BlockerRow
                            name = {blocker.productName}
                            date = {`${dateParsed[2]} ${dateParsed[1].toUpperCase()} ${dateParsed[3].substr(2, 2)}`}
                            title = {blocker.assertion.text}
                            detail = {blocker.comment.text.split('###')[0]}
                            tag = {{
                                label: assertionStatus[blocker.assertion.status].label,
                                color: assertionStatus[blocker.assertion.status].color
                            }}
                        />
                        <Divider />
                    </React.Fragment>
                )
            })}
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