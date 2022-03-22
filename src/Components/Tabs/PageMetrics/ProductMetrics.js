import { Divider, Stack, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { ProductRoleMetrics } from 'Components/ProductRoleMetrics'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchPageMetrics } from 'Redux/AppMetrics/actions'
import { selectProductById } from 'Redux/Products/selectors'
import { selectTeamByProductId } from 'Redux/Teams/selectors'
import { requestFindUserBy } from 'Redux/Users/actions'
import { getDateInDatabaseOrder } from 'Utilities/dateHelpers'

const generateTeamUsersQuery = (userIds) => {
    return userIds.map(id => `id:${id}`).join(' OR ')
}

const excludeUserIds = (userIds, excludeIds) => {
    return userIds.filter(uId => !excludeIds.includes(uId))
}

function ProductMetrics({ id }) {

    const dispatch = useDispatch()

    const team = useSelector(state => selectTeamByProductId(state, id))
    const product = useSelector(state => selectProductById(state, id))
    const users = useSelector(state => state.users)

    const [uniqueViews, setUniqueViews] = useState([])

    useEffect(() => {
        let daysAgo = new Date()
        daysAgo.setDate(daysAgo.getDate() - 14)

        dispatch(requestSearchPageMetrics('id>=' + getDateInDatabaseOrder(daysAgo.toISOString())))
            .then(unwrapResult)
            .then(response => {
                const visitorIds = new Set()
                response.map(entry => {
                    Object.entries(entry?.pageViews).map(([key, value]) => {
                        if (key.includes(`products/${id}`, 0)) {
                            value.forEach(uId => {
                                visitorIds.add(uId)
                            })
                        }
                    })
                })

                setUniqueViews([...visitorIds])
            })
    }, [])

    useEffect(() => {
        if (uniqueViews.length > 0) {
            const missingUserIds = []
            uniqueViews.forEach(uId => {
                if (!users[uId]) {
                    missingUserIds.push(uId)
                }
            })
            dispatch(requestFindUserBy(generateTeamUsersQuery(missingUserIds)))
        }
    }, [uniqueViews])

    const usersOnTheTeam = [...team.userIds, product.ownerId]
    const filteredPeopleIds = uniqueViews?.length > 0 ? excludeUserIds(uniqueViews, usersOnTheTeam) : []

    return (
        <Stack marginLeft = {3} maxWidth = '320px'>
            <Stack direction = 'row' justifyContent = 'space-between' alignItems = 'end'>
                <Typography variant = 'h6' color = 'text.primary'>Total Viewers:</Typography>
                <Typography variant = 'subtitle1' color = 'primary'>{uniqueViews.length}</Typography>
            </Stack>
            <Stack direction = 'row' justifyContent = 'space-between' alignItems = 'end'>
                <Typography variant = 'h6' color = 'text.primary'>Non-team Viewers:</Typography>
                <Typography variant = 'subtitle1' color = 'primary'>{filteredPeopleIds.length}</Typography>
            </Stack>
            <Divider sx = {{ marginY: 1 }}/>
            <ProductRoleMetrics ids = {filteredPeopleIds}/>
        </Stack>
    )
}

ProductMetrics.propTypes = {
    id: PropTypes.number.isRequired,
}

export default ProductMetrics