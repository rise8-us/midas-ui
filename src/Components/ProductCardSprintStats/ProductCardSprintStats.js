import { Card, Stack, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchIssues } from 'Redux/Issues/actions'
import { selectProductById } from 'Redux/Products/selectors'
import { getDateInDatabaseOrder } from 'Utilities/dateHelpers'
import { buildOrQueryByIds } from 'Utilities/requests'

export default function ProductCardSprintStats({ productId, dateRange }) {
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, productId))
    const [closedIssuesThisSprint, setClosedIssuesThisSprint] = useState([])

    useEffect(() => {
        if (product.projectIds?.length > 0) {
            let searchString = ['(', buildOrQueryByIds(product.projectIds, 'project.'), ')']
            searchString.push(' AND ')
            searchString.push('completedAt>=' + getDateInDatabaseOrder((new Date(dateRange[0])).toISOString()))
            searchString.push(' AND ')
            searchString.push('completedAt<=' + getDateInDatabaseOrder((new Date(dateRange[1])).toISOString()))
            dispatch(requestSearchIssues(searchString.join('')))
                .then(unwrapResult).then(setClosedIssuesThisSprint)
        }
    }, [JSON.stringify(product.projectIds), dateRange])

    return (
        <Card style = {{ padding: '8px' }}>
            <Stack>
                <Typography variant = 'h6'>{product.name}</Typography>
                <Stack paddingX = {1} spacing = {2} direction = 'row'>
                    <span>
                        <Typography variant = 'subtitle1' color = 'secondary'>Closed Issues:</Typography>
                        <Stack paddingX = {1}>
                            {closedIssuesThisSprint.map((issue, index) =>
                                <Typography variant = 'body2' key = {index}>{issue.title}</Typography>
                            )}
                            {closedIssuesThisSprint?.length === 0 &&
                                <Typography>
                                    <i>{'No issues closed this sprint :\'('}</i>
                                </Typography>
                            }
                        </Stack>
                    </span>
                </Stack>
            </Stack>
        </Card>
    )
}

ProductCardSprintStats.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])).isRequired,
    productId: PropTypes.number.isRequired,
}
