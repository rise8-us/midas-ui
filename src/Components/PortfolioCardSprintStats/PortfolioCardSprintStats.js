import { Card, Grid, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const statsStackProps = {
    alignItems: 'center',
    direction: 'row',
    spacing: 1,
}

export default function PortfolioCardSprintStats({ prodDeployments, prodIssues, stagingIssues }) {

    return (
        <Card style = {{ padding: '0px 8px' }}>
            <Grid container margin = {1}>
                <Grid item xs = {12} md = {6}>
                    <Stack spacing = {1}>
                        <Typography variant = 'h6'>Portfolio Summary</Typography>
                        <Stack {...statsStackProps} marginTop = {2}>
                            <Typography variant = 'body2'>Total Production Deployments:</Typography>
                            <Typography>{prodDeployments}</Typography>
                        </Stack>
                        <Stack {...statsStackProps}>
                            <Typography variant = 'body2'>Total New Issues in Production:</Typography>
                            <Typography>{prodIssues}</Typography>
                        </Stack>
                        <Stack {...statsStackProps}>
                            <Typography variant = 'body2'>Total New Issues in Staging:</Typography>
                            <Typography>{stagingIssues}</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs = {12} md = {6} display = 'none'>
                    <Stack>
                        <Typography margin = {1} variant = 'h6'>Pie Chart here</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )
}

PortfolioCardSprintStats.propTypes = {
    prodDeployments: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    prodIssues: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    stagingIssues: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

PortfolioCardSprintStats.defaultProps = {
    prodDeployments: '-',
    prodIssues: '-',
    stagingIssues: '-'
}