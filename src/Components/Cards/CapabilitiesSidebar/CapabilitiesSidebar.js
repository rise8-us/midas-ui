import { LockOpenOutlined, LockOutlined } from '@mui/icons-material'
import { Card, CardContent, CardHeader, IconButton } from '@mui/material'
import CapabilitiesList from 'Components/CapabilitiesList/CapabilitiesList'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { setCapabilityPagePermission } from 'Redux/PageAccess/reducer'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'
import { styled } from 'Styles/materialThemes'

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: '450px',
    height: 'fit-content',
    backgroundColor: theme.palette.grey[1100],
    borderRadius: theme.spacing(2),
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
                subheaderTypographyProps = {{ variant: 'body2' }}
                action = {
                    userLoggedIn?.roles?.PORTFOLIO_LEAD && (
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
            <CardContent>
                <CapabilitiesList />
            </CardContent>
        </StyledCard>
    )
}