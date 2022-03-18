import { Header } from 'Components/Header'
import { Page } from 'Components/Page'
import { UserRoles } from 'Components/UserRoles'
import { UserSettings } from 'Components/UserSettings'
import { useSelector } from 'react-redux'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { styled } from 'Styles/materialThemes'

const DivStyled = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row'
}))

function Account() {
    const user = useSelector((state) => selectUserLoggedIn(state))

    return (
        <Page>
            <Header title = 'Account Information' subtitle = {`ID: ${user.id}`} />
            <DivStyled>
                <UserSettings id = {user.id} />
                <UserRoles user = {user} />
            </DivStyled>
        </Page>
    )
}

export default Account
