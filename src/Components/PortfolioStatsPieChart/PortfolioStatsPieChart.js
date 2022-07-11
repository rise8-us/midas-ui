import { Grid, Stack } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { LegendItem } from 'Components/LegendItem'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchIssuesByPortfolioIdAndDateRange } from 'Redux/Issues/actions'
import { selectAllTags } from 'Redux/Tags/selectors'
import { getDateInDatabaseOrder } from 'Utilities/dateHelpers'

export default function PortfolioStatsPieChart({ portfolioId, dateRange }) {
    const dispatch = useDispatch()

    const tags = useSelector(selectAllTags)
    const filteredTagsLabels = tags.filter(tag => tag.label.includes('type::'))
        .reduce((acc, curr) => acc.concat(curr.label), [])

    const [closedIssuesThisSprint, setClosedIssuesThisSprint] = useState([])
    const [pieChartData, setPieChartData] = useState([])

    const fetchSprintStagingIssues = () => {
        const startDate = getDateInDatabaseOrder(new Date(dateRange[0]).toISOString())
        const endDate = getDateInDatabaseOrder(new Date(dateRange[1]).toISOString())
        dispatch(requestSearchIssuesByPortfolioIdAndDateRange([portfolioId, startDate, endDate]))
            .then(unwrapResult).then(setClosedIssuesThisSprint)
    }

    const buildChartData = (issues) => {
        const issueTypes = []
        const chartData = []

        issues.map(issue => {
            let issueLabel = issue.labels.filter(labelString => labelString.includes('type::'))[0]
            let issueColor = tags.filter(tag => tag.label === issueLabel)[0]?.color

            if (issueLabel === undefined) {
                issueLabel = 'Not Set'
                issueColor = 'gray'
            } else if (!filteredTagsLabels.includes(issueLabel)) {
                issueLabel = 'Other'
                issueColor = 'white'
            }

            if (!Object.keys(issueTypes).includes(issueLabel)) {
                issueTypes[issueLabel] = { quantity: 1, color: issueColor }
            } else {
                issueTypes[issueLabel].quantity++
            }
        })

        Object.entries(issueTypes).map(([issueType, issueData]) => {
            chartData.push({
                title: issueType.replace('type::', ''),
                value: issueData.quantity,
                color: issueData.color
            })
        })

        return chartData
    }

    useEffect(() => {
        fetchSprintStagingIssues()
    }, [dateRange])

    useEffect(() => {
        setPieChartData(buildChartData(closedIssuesThisSprint))
    }, [JSON.stringify(closedIssuesThisSprint)])

    return (
        <Grid container>
            <Grid item>
                <PieChart
                    data = {pieChartData}
                    animate
                    style = {{ height: '300px', width: '300px', margin: '-48px' }}
                    radius = {25}
                    label = {({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                    labelStyle = {{ fontSize: '5px', fill: 'white' }}
                    labelPosition = {120}
                    segmentsShift = {() => (.1)}
                    lineWidth = {12}
                    paddingAngle = {8}
                />
            </Grid>
            <Grid item>
                <Stack marginLeft = {8} direction = 'column' spacing = {1} height = '100%' justifyContent = 'center'>
                    {pieChartData.map((tag, index) => (
                        <LegendItem
                            key = {index}
                            color = {tag.color}
                            text = {tag.title}
                        />
                    ))}
                </Stack>
            </Grid>
        </Grid>
    )
}

PortfolioStatsPieChart.propTypes = {
    portfolioId: PropTypes.number.isRequired,
    dateRange: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])).isRequired
}