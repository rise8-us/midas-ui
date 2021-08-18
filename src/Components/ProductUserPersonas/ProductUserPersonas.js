
import { Chip, Grid, IconButton, Typography, useTheme } from '@material-ui/core'
import { DeleteOutlined, PersonAddOutlined, PersonOutlined } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeletePersona, requestUpdatePersona } from 'Redux/Personas/actions'
import PersonaConstants from 'Redux/Personas/constants'
import { selectPersonasByProductId } from 'Redux/Personas/selectors'
import { openPopup } from 'Redux/Popups/actions'

function ProductUserPersonas({ productId, hasEditAccess }) {
    const dispatch = useDispatch()
    const theme = useTheme()

    const personas = useSelector(state => selectPersonasByProductId(state, productId))

    const openPersonaPopup = (id, index) => {
        dispatch(openPopup(
            id ? PersonaConstants.UPDATE_PERSONA : PersonaConstants.CREATE_PERSONA,
            'PersonaPopup',
            { id, index, productId }
        ))
    }

    const toggleIsSupported = (persona) => {
        dispatch(requestUpdatePersona({
            ...persona,
            isSupported: !persona.isSupported
        }))
    }

    const deletePersona = (id) => {
        dispatch(requestDeletePersona(id))
    }

    const performAction = (action) => hasEditAccess ? action : null

    return (
        <Grid container direction = 'column' spacing = {0}>
            <Grid container item justifyContent = 'space-between' alignItems = 'center'>
                <Grid item>
                    <Typography variant = 'h6' color = 'textPrimary'>OUR USERS</Typography>
                </Grid>
                <Grid item>
                    {performAction(
                        <IconButton
                            onClick = {() => openPersonaPopup(null, personas.length)}
                            style = {{ right: '3px' }}
                            size = 'small'
                            title = 'add'
                        >
                            <PersonAddOutlined color = 'secondary'/>
                        </IconButton>
                    )}
                </Grid>
            </Grid>
            <Grid item>
                <Chip
                    label = {<Typography variant = 'caption' color = 'textSecondary'>CURRENT</Typography>}
                    size = 'small'
                    variant = 'outlined'
                    style = {{ margin: '8px', marginLeft: 0 }}
                    icon = {<PersonOutlined style = {{ color: theme.palette.primary.main }}/>}
                />
                <Chip
                    label = {<Typography variant = 'caption' color = 'textSecondary'>FUTURE</Typography>}
                    size = 'small'
                    variant = 'outlined'
                    style = {{ margin: '8px' }}
                    icon = {<PersonOutlined style = {{ color: theme.palette.secondary.main }}/>}
                />
            </Grid>
            {personas.map((persona, index) =>
                <Grid container item alignItems = 'center' key = {index} >
                    <Grid item>
                        <IconButton
                            onClick = {performAction(() => toggleIsSupported(persona))}
                            disableRipple = {!hasEditAccess}
                            disableFocusRipple = {!hasEditAccess}
                            size = 'small'
                            style = {{
                                cursor: hasEditAccess ? 'pointer' : 'default',
                                backgroundColor: hasEditAccess ? 'unset' : 'transparent',
                                right: '4px'
                            }}
                        >
                            <PersonOutlined
                                color = {persona.isSupported ? 'primary' : 'secondary'}
                                title = 'supported'
                            />
                        </IconButton>
                    </Grid>
                    <Grid
                        item
                        onClick = {performAction(() => openPersonaPopup(persona.id, persona.index))}
                    >
                        <Typography color = 'textSecondary'>{persona.title}</Typography>
                    </Grid>
                    {performAction(
                        <Grid item style = {{ flexGrow: 1, direction: 'rtl' }}>
                            <IconButton onClick = {() => deletePersona(persona.id)} size = 'small'>
                                <DeleteOutlined color = 'secondary' title = 'delete'/>
                            </IconButton>
                        </Grid>
                    )}
                </Grid>
            )}
        </Grid>
    )
}

ProductUserPersonas.propTypes = {
    productId: PropTypes.number.isRequired,
    hasEditAccess: PropTypes.bool
}

ProductUserPersonas.defaultProps = {
    hasEditAccess: false
}

export default ProductUserPersonas