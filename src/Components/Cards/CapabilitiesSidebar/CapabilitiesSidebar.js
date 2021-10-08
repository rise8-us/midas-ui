import { Card, CardContent, CardHeader, IconButton, makeStyles } from '@material-ui/core'
import { LockOpenOutlined, LockOutlined } from '@material-ui/icons'
import CapabilitiesList from 'Components/CapabilitiesList/CapabilitiesList'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'

const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
        height: 'fit-content',
        backgroundColor: theme.palette.grey[1100],
        borderRadius: 16
    },
    link: {
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: 'pointer'
        },
    },
    unlockedIcon: {
        color: theme.palette.text.primary
    }
}))

function CapabilitiesSidebar() {
    const classes = useStyles()

    const userLoggedIn = useSelector(selectUserLoggedIn)

    const [hasEdit, setHasEdit] = useState(false)

    return (
        <Card className = {classes.card}>
            <CardHeader
                title = 'Mission Thread'
                subheader = 'Integrated Air and Missile Defense'
                titleTypographyProps = {{
                    variant: 'h5',
                    color: 'textPrimary',
                    'data-testid': 'CapabilitiesSidebar__header-title'
                }}
                action = {
                    userLoggedIn?.roles?.PORTFOLIO_LEAD &&
                        <IconButton
                            onClick = {() => setHasEdit(prev => !prev)}
                            color = 'secondary'
                            data-testid = 'CapabilitiesSidebar__button-edit'
                        >
                            {hasEdit
                                ? <LockOpenOutlined
                                    fontSize = 'small'
                                    title = 'unlocked'
                                    className = {classes.unlockedIcon}
                                />
                                : <LockOutlined
                                    fontSize = 'small'
                                    title = 'locked'
                                />
                            }
                        </IconButton>
                }
            />
            <CardContent>
                <CapabilitiesList hasEdit = {hasEdit}/>
            </CardContent>
        </Card>
    )
}

export default CapabilitiesSidebar