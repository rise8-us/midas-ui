import { Typography } from '@material-ui/core'
import React from 'react'
import Page from '../../Page/Page'

function Home() {
    return (
        <Page>
            <Typography variant = 'h6' color = 'textSecondary' style = {{ padding: '20px' }}>
                Measures Integration and Deployment Analytics System
            </Typography>
        </Page>
    )
}

export default Home