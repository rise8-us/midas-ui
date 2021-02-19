import { Typography } from '@material-ui/core'
import React from 'react'
import Page from '../../Page/Page'

function Home() {
    return (
        <Page>
            <Typography variant = 'h2' color = 'textPrimary' data-testid = 'Home__title'>
                Hello World
            </Typography>
            <Typography variant = 'h6' color = 'textSecondary' data-testid = 'Home__subtitle'>
                This is a starter app
            </Typography>
        </Page>
    )
}

export default Home