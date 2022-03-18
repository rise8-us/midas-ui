import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { Page } from 'Components/Page'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestGetUniqueLogonMetrics } from 'Redux/AppMetrics/actions'
import { camelToCapitalCase } from 'Utilities/caseConversions'
import { getDateInDatabaseOrder } from 'Utilities/dateHelpers'

function RowEntry({ title, value }) {
    return (
        <Stack direction = 'row' width = '225px' justifyContent = 'space-between' alignItems = 'end'>
            <Typography variant = 'subtitle1' color = 'secondary'>{title}</Typography>
            <Typography variant = 'h9' color = 'primary'>{value}</Typography>
        </Stack>
    )
}

RowEntry.propTypes = {
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
RowEntry.defaultProps = {
    title: 'Loading...',
    value: '?'
}

const calculateAverageOverDays = (duration, appUserMetricsArray) => {
    let startIndex
    let daysAgoDate
    let i = 0

    do {
        let daysAgo = new Date()
        daysAgo.setDate(daysAgo.getDate() - (duration - i))
        daysAgoDate = getDateInDatabaseOrder(daysAgo.toISOString())
        startIndex = appUserMetricsArray.findIndex(entry => entry.id === daysAgoDate)
        i++
    } while (i <= duration && startIndex === -1)

    const counts = appUserMetricsArray.slice(startIndex).reduce((curr, next) => {
        curr.uniqueLogins = curr.uniqueLogins + next.uniqueLogins

        Object.entries(next.uniqueRoleMetrics).forEach(([key, value]) => {
            curr[key] = (curr[key] ?? 0) + (value?.length ?? 0)
        })

        return curr
    }, { uniqueLogins: 0 })

    let averages = {}
    Object.entries(counts).forEach(([key, value]) => {
        averages[key] = Math.round((value / duration) * 10) / 10
    })
    return averages
}

export default function AppMetrics() {

    const [rawData, setRawData] = useState([])
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const fetchData = () => {
        setLoading(true)

        let daysAgo = new Date()
        daysAgo.setDate(daysAgo.getDate() - 90)

        dispatch(requestGetUniqueLogonMetrics('id>=' + getDateInDatabaseOrder(daysAgo.toISOString())))
            .then(unwrapResult)
            .then(data => {
                setRawData(data)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Page>
            {loading ?
                <Box display = 'flex' height = '100%' alignItems = 'center' justifyContent = 'center'>
                    <CircularProgress data-testid = 'AppMetrics__loading'/>
                </Box>
                :
                <Box marginTop = {3} data-testid = 'AppMetrics__data'>
                    <Stack direction = 'row' justifyContent = 'space-evenly' marginBottom = {4}>
                        {rawData.slice(-3).reverse().map((entry, index) => (
                            <Stack key = {index}>
                                <Typography variant = 'h6'>{new Date(entry.id + 'T00:00').toDateString()}</Typography>
                                <RowEntry title = 'Unique Logins' value = {entry.uniqueLogins} />
                                {Object.entries(entry.uniqueRoleMetrics).map(([key, value], idx) => (
                                    <RowEntry key = {idx} title = {camelToCapitalCase(key)} value = {value.length}/>
                                ))}
                            </Stack>
                        ))}
                    </Stack>
                    <Stack direction = 'row' justifyContent = 'space-evenly'>
                        {[30, 60, 90].map((daysAgo, index) => {
                            const data = calculateAverageOverDays(daysAgo, rawData)
                            return (
                                <Stack key = {index}>
                                    <Typography variant = 'h6'>Avg Unique/Day last {daysAgo} Days</Typography>
                                    {Object.entries(data).map(([key, value], idx) => (
                                        <RowEntry key = {idx} title = {camelToCapitalCase(key)} value = {value}/>
                                    ))}
                                </Stack>
                            )
                        })}
                    </Stack>
                </Box>
            }
        </Page>
    )
}