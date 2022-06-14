import { Card, Stack, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { IssueSyncRequest } from 'Components/IssueSyncRequest'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchIssues, requestSyncIssuesByProjectId } from 'Redux/Issues/actions'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { selectProductById } from 'Redux/Products/selectors'
import { getDateInDatabaseOrder } from 'Utilities/dateHelpers'
import { buildOrQueryByIds } from 'Utilities/requests'

export default function ProductCardSprintStats({ productId, dateRange }) {
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, productId))
    const pagePermissions = useSelector(state => selectPortfolioPagePermission(state, product.portfolioId))
    const [closedIssuesThisSprint, setClosedIssuesThisSprint] = useState([])
    const projects = product.projects.reduce((acc, next) => {
        return { ...acc, [next.id]: next }
    }, {})

    const syncIssues = () => {
        let requests = []
        if (product.projectIds?.length > 0) {
            product.projectIds.forEach(id => {
                requests.put(dispatch(requestSyncIssuesByProjectId(id)))
            })
        }
        return Promise.all(requests).then(fetchSprintIssues)
    }

    const fetchSprintIssues = () => {
        if (product.projectIds?.length > 0) {
            let searchString = ['(', buildOrQueryByIds(product.projectIds, 'project.'), ')']
            searchString.push(' AND ')
            searchString.push('completedAt>=' + getDateInDatabaseOrder((new Date(dateRange[0])).toISOString()))
            searchString.push(' AND ')
            searchString.push('completedAt<=' + getDateInDatabaseOrder((new Date(dateRange[1])).toISOString()))
            dispatch(requestSearchIssues(searchString.join('')))
                .then(unwrapResult).then(setClosedIssuesThisSprint)
        }
    }

    useEffect(() => {
        fetchSprintIssues()
    }, [JSON.stringify(product.projectIds), dateRange])

    return (
        <Card style = {{ padding: '8px' }}>
            <Stack>
                <Stack
                    height = '36px'
                    marginLeft = {1}
                    justifyContent = 'space-between'
                    direction = 'row'
                    spacing = {1}
                >
                    <Typography variant = 'h6'>{product.name}</Typography>
                    <div style = {{ visibility: pagePermissions.edit ? 'visible' : 'hidden' }} >
                        <IssueSyncRequest id = {productId} request = {() => syncIssues()} tooltip = ''/>
                    </div>
                </Stack>
                <Stack paddingX = {1} spacing = {2} direction = 'row'>
                    <span>
                        <Typography variant = 'subtitle1' color = 'secondary'>Closed Issues:</Typography>
                        <Stack paddingX = {1}>
                            {closedIssuesThisSprint.map((issue, index) =>
                                <Stack
                                    display = 'list-item'
                                    direction = 'row'
                                    spacing = {1}
                                    key = {index}
                                    marginLeft = {2}
                                >
                                    <Typography display = 'inline' variant = 'body2'>
                                        ({projects[issue.projectId].name})
                                    </Typography>
                                    <Typography display = 'inline' color = 'secondary'>
                                        -
                                    </Typography>
                                    <Typography display = 'inline' variant = 'body2'>
                                        {issue.title}
                                    </Typography>
                                </Stack>
                            )}
                            {closedIssuesThisSprint?.length === 0 &&
                                <Typography>
                                    <i>No issues closed this sprint.</i>
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
