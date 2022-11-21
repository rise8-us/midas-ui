import { ExpandMore } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { CollapsableCard } from '../CollapsableCard'

export default function CollapsableRow({ children, typeText, headerText, styles }) {

    return (
        <CollapsableCard
            timeout = {{ enter: 500, exit: 500 }}
            enterDelay = {0}
            collapsedSize = '0px'
            mouseMovement = {false}
            header = {
                <Stack
                    data-testid = {`CollapsableRow__stack-${headerText}`}
                    direction = 'row'
                    justifyContent = 'space-between'
                    alignItems = 'center'>
                    <Stack direction = 'row' alignItems = 'center'>
                        <Typography
                            fontWeight = 'bold'
                            color = 'text.primary'
                            marginRight = '5px'
                        >
                            {headerText}
                        </Typography>
                        <Typography
                            color = 'text.secondary'
                            fontStyle = 'italic'
                            fontSize = 'small'
                        >
                            {typeText}
                        </Typography>
                    </Stack>
                    <IconButton
                        data-testid = {'CollapsableRow__expandButton_' + 'closed'}
                        style = {{ maxHeight: '40px' }}
                        size = 'small'
                        disabled
                    >
                        <ExpandMore style = {{
                            transform: `rotate(${0}deg)`,
                            transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                        }}/>
                    </IconButton>
                </Stack>}
            sx = { styles }
        >
            {children}
        </CollapsableCard>
    )
}

CollapsableRow.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    headerText: PropTypes.string,
    styles: PropTypes.object,
    typeText: PropTypes.string,
}

CollapsableRow.defaultProps = {
    headerText: '',
    styles: {},
    typeText: '',
}
