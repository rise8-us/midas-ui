import { Grid, Skeleton, Typography } from '@mui/material'
import { Page } from 'Components/Page'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'

export default function Portfolio() {
    const { portfolioId } = useParams()
    const id = parseInt(portfolioId)

    const portfolio = useSelector(state => selectPortfolioById(state, id))

    return (
        <Page>
            <Grid container direction = 'column' marginX = {3}>
                <Grid container item direction = 'row'>
                    <Grid item xs = 'auto' marginRight = {1}>
                        <Typography variant = 'h3'>
                            {
                                portfolio?.name ??
                                <Skeleton
                                    height = '56px'
                                    width = '300px'
                                    data-testid = 'Portfolio__name-loading'
                                />
                            }
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item marginY = {3}>
                    <Typography>A fansy smancy gantt chart component</Typography>
                </Grid>
            </Grid>
        </Page>
    )
}