import PropTypes from 'prop-types'

export default function GanttActionBar(props) {
    const {
        additionalActions,
        backgroundColor,
        borderColor,
        buttonComponent,
        buttonProps,
        navLeftIcon,
        navRightIcon,
        setDateRange,
    } = props
    const ButtonComponent = buttonComponent

    const actionBarStyle = {
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${borderColor}`
    }

    const componentName = buttonComponent?.render?.name ?? buttonComponent

    return (
        <div data-testid = 'GanttActionBar__wrapper' style = {actionBarStyle}>
            <ButtonComponent
                data-testid = {`GanttActionBar__button-left-${componentName}`}
                onClick = {() => setDateRange(-1)}
                {...buttonProps}
            >{navLeftIcon}</ButtonComponent>
            <ButtonComponent
                data-testid = {`GanttActionBar__button-right-${componentName}`}
                onClick = {() => setDateRange(1)}
                {...buttonProps}
            >{navRightIcon}</ButtonComponent>
            {additionalActions}
        </div>
    )
}

GanttActionBar.propTypes = {
    additionalActions: PropTypes.node,
    backgroundColor: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
    buttonComponent: PropTypes.elementType,
    buttonProps: PropTypes.shape({ onClick: PropTypes.func }),
    navLeftIcon: PropTypes.node,
    navRightIcon: PropTypes.node,
    setDateRange: PropTypes.func.isRequired,
}

GanttActionBar.defaultProps = {
    additionalActions: null,
    navLeftIcon: 'Left',
    navRightIcon: 'Right',
    buttonComponent: 'button',
    buttonProps: {
        style: {
            background: 'none',
            border: 'none',
            borderRadius: '2px',
            color: 'white',
            padding: '4px 8px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            margin: '10px',
            cursor: 'pointer',
        }
    }
}
