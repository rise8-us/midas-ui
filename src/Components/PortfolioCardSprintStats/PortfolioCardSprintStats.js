import { Card, Grid, Stack, Typography } from '@mui/material'
import PortfolioStatsPieChart from 'Components/PortfolioStatsPieChart/PortfolioStatsPieChart'
import { TextSkeleton } from 'Components/Skeletons'
import PropTypes from 'prop-types'

const statsStackProps = {
    alignItems: 'baseline',
    direction: 'row',
    justifyContent: 'space-between',
    spacing: 1,
}

export default function PortfolioCardSprintStats(props) {
    const { portfolioId, dateRange, loading, prodDeployments, prodIssues, stagingIssues } = props

    const metrics = [
        { title: 'Total Production Deployments:', value: prodDeployments },
        { title: 'Total New Issues in Production:', value: prodIssues },
        { title: 'Total New Issues in Staging:', value: stagingIssues },
    ]

    return (
        <Card style = {{ padding: '0px 8px' }}>
            <Grid container margin = {1} justifyContent = 'space-between'>
                <Grid item xs = {12} md = {6}>
                    <Stack spacing = {1} maxWidth = '240px'>
                        <Typography variant = 'h6'>Portfolio Summary</Typography>
                        {metrics.map((metric, index) =>
                            <Stack {...statsStackProps} marginTop = {2} key = {index}>
                                <Typography variant = 'body2'>{metric.title}</Typography>
                                <Typography fontWeight = 'bold'>
                                    <TextSkeleton
                                        text = {metric.value}
                                        loading = {loading}
                                        width = {24}
                                    />
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs = {12} md = {6}>
                    <Stack>
                        <PortfolioStatsPieChart portfolioId = {portfolioId} dateRange = {dateRange}/>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )
}

PortfolioCardSprintStats.propTypes = {
    portfolioId: PropTypes.number.isRequired,
    dateRange: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])).isRequired,
    loading: PropTypes.bool,
    prodDeployments: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    prodIssues: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    stagingIssues: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

PortfolioCardSprintStats.defaultProps = {
    loading: false,
    prodDeployments: '-',
    prodIssues: '-',
    stagingIssues: '-',
}