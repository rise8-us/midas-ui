import { Add } from '@mui/icons-material'
import { Fab, useTheme } from '@mui/material'
import PropTypes from 'prop-types'
function FloatingActionButton({ onClick }) {
    const theme = useTheme()
    return (
        <Fab
            sx = {{
                position: 'fixed',
                right: theme.spacing(4),
                bottom: parseInt(theme.spacing(4)) + 20 + 'px'
            }}
            color = 'primary'
            onClick = {onClick}
            title = 'add'
            theme = {theme}
        >
            <Add />
        </Fab>
    )
}

FloatingActionButton.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default FloatingActionButton
