import { LockOpenOutlined, LockOutlined } from '@mui/icons-material'
import { Card, CardContent, CardHeader, IconButton } from '@mui/material'
import CapabilitiesList from 'Components/CapabilitiesList/CapabilitiesList'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { styled } from 'Styles/materialThemes'

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    height: 'fit-content',
    backgroundColor: theme.palette.grey[1100],
    borderRadius: 16,
}))

const LockOpenOutlinedUnlockedIcon = styled(LockOpenOutlined)(({ theme }) => ({
    color: theme.palette.text.primary,
}))

function CapabilitiesSidebar() {

    const userLoggedIn = useSelector(selectUserLoggedIn)

    const [hasEdit, setHasEdit] = useState(false)

    return (
        <StyledCard>
            <CardHeader
                title = 'Mission Thread'
                subheader = 'Integrated Air and Missile Defense'
                titleTypographyProps = {{
                    variant: 'h5',
                    color: 'text.primary',
                    'data-testid': 'CapabilitiesSidebar__header-title',
                }}
                action = {
                    userLoggedIn?.roles?.PORTFOLIO_LEAD && (
                        <IconButton
                            onClick = {() => setHasEdit((prev) => !prev)}
                            color = 'secondary'
                            data-testid = 'CapabilitiesSidebar__button-edit'
                            size = 'large'
                        >
                            {hasEdit ? (
                                <LockOpenOutlinedUnlockedIcon
                                    fontSize = 'small'
                                    title = 'unlocked'
                                />
                            ) : (
                                <LockOutlined fontSize = 'small' title = 'locked' />
                            )}
                        </IconButton>
                    )
                }
            />
            <CardContent>
                <CapabilitiesList hasEdit = {hasEdit} />
            </CardContent>
        </StyledCard>
    )
}

export default CapabilitiesSidebar