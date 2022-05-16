import { Box, Link, Typography } from '@mui/material'
import { Page } from 'Components/Page'
import { NavLink } from 'react-router-dom'

function PageNotFound() {
    return (
        <Page>
            <Box display = 'flex' style = {{ height: 'calc(100vh - 40px)' }}>
                <Typography
                    variant = 'h6'
                    color = 'text.primary'
                    sx = {{
                        m: 'auto 0 auto auto'
                    }}
                    data-testid = 'PageNotFound'
                >
                    This is not the page you are looking for.
                </Typography>
                <Link to = '/home'
                    color = 'primary'
                    variant = 'h6'
                    component = {NavLink}
                    sx = {{
                        m: 'auto auto auto 2px',
                        '&:hover': {
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        },
                        textDecoration: 'none'
                    }}
                >
                    Go Home
                </Link>
            </Box>
        </Page>
    )
}

export default PageNotFound