import { LockOpenOutlined, LockOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import CapabilitiesList from 'Components/CapabilitiesList/CapabilitiesList'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { setCapabilityPagePermission } from 'Redux/PageAccess/reducer'
import { selectCapabilitiesPagePermission } from 'Redux/PageAccess/selectors'
import { CapabilityCard } from '../CapabilityCard'

export default function CapabilitiesSidebar() {
    const dispatch = useDispatch()

    const userLoggedIn = useSelector(selectUserLoggedIn)
    const hasEdit = useSelector(state => selectCapabilitiesPagePermission(state, 'edit'))

    const updatePageEdit = () => dispatch(setCapabilityPagePermission({ permission: 'edit', value: !hasEdit }))

    return (
        <CapabilityCard
            title = 'Mission Thread'
            subheader = 'Integrated Air and Missile Defense'
            action = {userLoggedIn?.roles?.PORTFOLIO_ADMIN && (
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
            )}
        >
            <CapabilitiesList />
        </CapabilityCard>
    )
}
