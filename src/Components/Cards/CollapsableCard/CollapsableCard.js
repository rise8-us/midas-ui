import { Card, ClickAwayListener, Collapse } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const CollapsableCard = React.forwardRef((props, ref) => {
    const { children, header, footer, collapsedSize, onExpanded,
        timeout, mouseMovement, ...cardProps } = props

    const [expanded, setExpanded] = useState(false)
    const [hasFocus, setHasFocus] = useState(false)

    const onMouseEnter = () => {
        setExpanded(true)
    }

    const onMouseLeave = () => {
        !hasFocus && setExpanded(false)
    }

    const onFocus = () => {
        setHasFocus(true)
        mouseMovement ? setExpanded(true) : setExpanded(prev => !prev)
    }

    const onClickAway = () => {
        setHasFocus(false)
        setExpanded(false)
    }

    useEffect(() => {
        onExpanded(expanded)
    }, [expanded])

    return (
        <ClickAwayListener onClickAway = {onClickAway} mouseEvent = 'onMouseUp'>
            <Card
                {...cardProps}
                data-testid = 'Collapsable__card'
                ref = {ref}
                onMouseEnter = {mouseMovement ? onMouseEnter : undefined}
                onMouseLeave = {mouseMovement ? onMouseLeave : undefined}
                onClick = {onFocus}
                onFocus = {onFocus}
            >
                {header}
                <Collapse
                    in = {expanded}
                    timeout = {timeout}
                    collapsedSize = {collapsedSize}
                    data-testid = 'Collapsable__collapse'
                >
                    {children}
                </Collapse>
                {footer}
            </Card>
        </ClickAwayListener>
    )
})

CollapsableCard.displayName = 'Collapsable'

CollapsableCard.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    collapsedSize: PropTypes.string,
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    mouseMovement: PropTypes.bool,
    onExpanded: PropTypes.func,
    timeout: PropTypes.shape({
        enter: PropTypes.number,
        exit: PropTypes.number
    }),
}

CollapsableCard.defaultProps = {
    collapsedSize: '0px',
    footer: undefined,
    header: undefined,
    mouseMovement: true,
    onExpanded: (e) => e,
    timeout: { enter: 1500, exit: 750 },
}

export default CollapsableCard
