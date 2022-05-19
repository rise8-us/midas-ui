import { Divider, Stack, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { PageRoleMetrics } from 'Components/PageRoleMetrics'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchPageMetrics } from 'Redux/AppMetrics/actions'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { selectProductById } from 'Redux/Products/selectors'
import { selectTeamById } from 'Redux/Teams/selectors'
import { requestFindUserBy } from 'Redux/Users/actions'
import { getDateInDatabaseOrder } from 'Utilities/dateHelpers'

const generateTeamUsersQuery = (userIds) => {
    return userIds.map(id => `id:${id}`).join(' OR ')
}

const excludeUserIds = (userIds, excludeIds) => {
    return userIds.filter(uId => !excludeIds.includes(uId))
}

export default function PageMetrics({ id, type }) {

    const dispatch = useDispatch()

    let pageItem = {}

    switch (type) {
    case 'product':
        pageItem = useSelector(state => selectProductById(state, id))
        break
    case 'portfolio':
        pageItem = useSelector(state => selectPortfolioById(state, id))
        break
    }

    const team = useSelector(state => selectTeamById(state, pageItem?.personnel?.teamIds[0]))
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
                        if (key.includes(`${type}s/${id}`, 0)) {
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
                !users[uId] && missingUserIds.push(uId)
            })
            dispatch(requestFindUserBy(generateTeamUsersQuery(missingUserIds)))
        }
    }, [uniqueViews])

    const usersOnTheTeam = [...team.userIds, pageItem.personnel?.ownerId]
    const filteredPeopleIds = uniqueViews?.length > 0 ? excludeUserIds(uniqueViews, usersOnTheTeam) : []

    return (
        <>
            <Typography variant = 'h5' marginLeft = {3}>
                Views in <b>MIDAS</b> over last 2 weeks
            </Typography>
            <Stack marginLeft = {3} maxWidth = '344px'>
                <Divider sx = {{ marginY: 1 }}/>
                <PageRoleMetrics ids = {filteredPeopleIds} />
            </Stack>
        </>
    )
}

PageMetrics.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['product', 'portfoio']).isRequired
}