import { AccountCircle, ContactSupport, Gavel, LocalOffer, Menu } from '@mui/icons-material'
import { Button, Grid, IconButton, Typography } from '@mui/material'
import MidasLogo from 'Assets/MidasLogo.svg'
import { MoreOptionsPopperMenu } from 'Components/MoreOptionsPopperMenu'
import { AppBarSearch } from 'Components/Search'
import useHistory from 'Hooks/useHistory'
import { useSelector } from 'react-redux'
import { selectUserLoggedIn } from 'Redux/Auth/selectors'
import { styled } from 'Styles/materialThemes'
import { getRoot } from 'Utilities/queryParams'

const GridWrapStyled = styled(Grid)(({ theme }) => ({
    zIndex: 1000,
    position: 'fixed',
    top: '20px',
    height: '48px',
    margin: 0,
    padding: '0 16px',
    width: '100%',
    maxWidth: '1440px',
    background: theme.palette.background.default,
    justifyContent: 'space-between'
}))

const GridPagesContainerStyled = styled(Grid)(() => ({
    margin: 0,
    padding: 0,
    maxHeight: '48px',
}))

const GridItemStyled = styled(Grid)(({ theme }) => ({
    paddingRight: theme.spacing(1)
}))

const PageTypographyStyled = styled(Typography)(({ theme, selected }) => ({
    color: selected ? theme.palette.primary.main : theme.palette.grey[600],
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: theme.spacing(1),
    whiteSpace: 'noWrap',
}))

function AppBar() {
    const history = useHistory()

    const currentPage = getRoot()
    const user = useSelector(selectUserLoggedIn)

    const goHome = () => history.push('/portfolios')

    const pages = [
        {
            text: 'Portfolios',
            onClick: () => history.push('/portfolios')
        }, {
            text: 'Products',
            onClick: () => history.push('/products')
        }, {
            text: 'Projects',
            onClick: () => history.push('/projects')
        }
    ]

    const contactSupportOptions = [
        {
            text: 'Submit feedback',
            link: 'https://chat.il2.dso.mil/midas/channels/feedback'
        }, {
            text: 'Request support',
            link: 'https://chat.il2.dso.mil/midas/channels/support'
        }, {
            text: 'Report a bug',
            link: 'https://chat.il2.dso.mil/midas/channels/bugs',
            divider: true
        }, {
            text: 'Change log',
            link: 'https://chat.il2.dso.mil/midas/channels/announcements'
        }
    ]

    return (
        <div style = {{ display: 'flex', justifyContent: 'center' }}>
            <GridWrapStyled container wrap = 'nowrap'>
                <Grid container width = 'unset' wrap = 'nowrap' alignItems = 'center' direction = 'row' >
                    <Grid item style = {{ height: '18px' }} sx = {{ display: { xs: 'none', md: 'flex' } }}>
                        <img
                            src = {MidasLogo}
                            onClick = {goHome}
                            style = {{ cursor: 'pointer', marginRight: '8px' }}
                            data-testid = 'AppBar__logo'
                        />
                    </Grid>
                    <GridPagesContainerStyled
                        container
                        item
                        alignContent = 'center'
                        wrap = 'nowrap'
                        sx = {{
                            display: {
                                xs: 'none',
                                md: 'flex'
                            }
                        }}
                    >
                        {pages.map((page) => (
                            <Grid item key = {page.text}>
                                <PageTypographyStyled
                                    onClick = {page.onClick}
                                    variant = 'body1'
                                    selected = {currentPage.toUpperCase() === page.text.toUpperCase()}
                                >
                                    {page.text}
                                </PageTypographyStyled>
                            </Grid>
                        ))}
                    </GridPagesContainerStyled>
                    <GridPagesContainerStyled container item sx = {{ display: { md: 'none' } }}>
                        <MoreOptionsPopperMenu options = {pages} icon = {<Menu color = 'primary'/>}/>
                    </GridPagesContainerStyled>
                </Grid>
                <Grid container width = 'unset' wrap = 'nowrap' alignItems = 'center' direction = 'row'>
                    <Grid item>
                        <AppBarSearch />
                    </Grid>
                    <GridItemStyled item marginLeft = {1}>
                        <MoreOptionsPopperMenu
                            options = {contactSupportOptions}
                            icon = {
                                <IconButton
                                    color = 'secondary'
                                    size = 'small'
                                    title = 'contact midas support'
                                >
                                    <ContactSupport />
                                </IconButton>
                            }
                        />
                    </GridItemStyled>
                    <GridItemStyled item>
                        <IconButton
                            color = 'secondary'
                            onClick = {() => history.push('/tags')}
                            size = 'small'
                            title = 'tags'
                        >
                            <LocalOffer />
                        </IconButton>
                    </GridItemStyled>
                    {user.isAdmin && (
                        <GridItemStyled item>
                            <IconButton
                                color = 'secondary'
                                onClick = {() => history.push('/admin')}
                                size = 'small'
                                title = 'admin'
                                data-testid = 'AppBar__admin-button'
                            >
                                <Gavel />
                            </IconButton>
                        </GridItemStyled>
                    )}
                    {user.id && (
                        <GridItemStyled item whiteSpace = 'nowrap'>
                            <Button
                                color = 'secondary'
                                onClick = {() => history.push('/account')}
                                title = 'account'
                                endIcon = {<AccountCircle/>}
                                data-testid = 'AppBar__account-button'
                            >
                                {user.displayName}
                            </Button>
                        </GridItemStyled>
                    )}
                </Grid>
            </GridWrapStyled>
        </div>
    )
}

export default AppBar
