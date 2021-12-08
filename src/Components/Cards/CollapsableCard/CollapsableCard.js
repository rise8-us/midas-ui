import { Card, ClickAwayListener, Collapse } from '@mui/material'
import useDebounce from 'Hooks/useDebounce'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const CollapsableCard = React.forwardRef((props, ref) => {
    const { children, header, footer, collapsedSize, onExpanded, enterDelay, exitDelay, ...cardProps } = props

    const [expanded, setExpanded] = useState(false)
    const [hasFocus, setHasFocus] = useState(false)
    const [delay, setDelay] = useState(enterDelay)

    const debouncedExpansion = useDebounce(expanded, delay)

    const onMouseEnter = () => {
        setDelay(enterDelay)
        setExpanded(true)
    }

    const onMouseLeave = () => {
        setDelay(exitDelay)
        !hasFocus && setExpanded(false)
    }

    const onFocus = () => {
        setDelay(enterDelay)
        setHasFocus(true)
        setExpanded(true)
    }

    const onClickAway = () => {
        setDelay(exitDelay)
        setHasFocus(false)
        setExpanded(false)
    }

    useEffect(() => {
        onExpanded(expanded)
    }, [expanded])

    return (
        <ClickAwayListener onClickAway = {onClickAway} mouseEvent = 'onMouseUp'>
            <Card {...cardProps}
                data-testid = 'Collapsable__card'
                ref = {ref}
                onMouseEnter = {onMouseEnter}
                onMouseLeave = {onMouseLeave}
                onClick = {onFocus}
                onFocus = {onFocus}
            >
                {header}
                <Collapse
                    in = {debouncedExpansion}
                    timeout = {{ enter: 400, exit: 750 }}
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
    enterDelay: PropTypes.number,
    exitDelay: PropTypes.number,
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    onExpanded: PropTypes.func
}

CollapsableCard.defaultProps = {
    collapsedSize: '0px',
    enterDelay: 300,
    exitDelay: 100,
    footer: undefined,
    header: undefined,
    onExpanded: (e) => e
}

export default CollapsableCard