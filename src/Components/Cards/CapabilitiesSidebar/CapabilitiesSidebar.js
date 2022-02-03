import { LockOpenOutlined, LockOutlined } from '@mui/icons-material'
import { Card, CardContent, CardHeader, IconButton } from '@mui/material'
import CapabilitiesList from 'Components/CapabilitiesList/CapabilitiesList'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { setCapabilityPagePermission } from 'Redux/PageAccess/reducer'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'
import { scrollbar, styled } from 'Styles/materialThemes'

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.grey[1100],
    borderRadius: theme.spacing(2),
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    ...scrollbar(theme),
    overflowY: 'scroll',
    paddingBottom: 0,
    marginBottom: theme.spacing(2),
    maxHeight: 'calc(100vh - 244px)'
}))

export default function CapabilitiesSidebar() {
    const dispatch = useDispatch()

    const userLoggedIn = useSelector(selectUserLoggedIn)
    const hasEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))

    const updatePageEdit = () => dispatch(setCapabilityPagePermission({ permission: 'edit', value: !hasEdit }))

    return (
        <StyledCard>
            <CardHeader
                title = 'Mission Thread'
                subheader = 'Integrated Air and Missile Defense'
                titleTypographyProps = {{ variant: 'h6' }}
                subheaderTypographyProps = {{ variant: 'subtitle1' }}
                action = {
                    userLoggedIn?.roles?.PORTFOLIO_ADMIN && (
                        <IconButton
                            onClick = {updatePageEdit}
                            data-testid = 'CapabilitiesSidebar__button-edit'
                            size = 'large'
                        >
                            {hasEdit
                                ? <LockOpenOutlined fontSize = 'small' title = 'unlocked'/>
                                : <LockOutlined fontSize = 'small' title = 'locked' color = 'secondary'/>
                            }
                        </IconButton>
                    )
                }
            />
            <StyledCardContent>
                <CapabilitiesList />
            </StyledCardContent>
        </StyledCard>
    )
}