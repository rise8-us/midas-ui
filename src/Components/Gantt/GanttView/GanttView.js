import { alpha, Button } from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { styled } from 'Styles/materialThemes'

const options = [
    { title: '6M', viewBy: 'month', scope: 6, leadingColumns: 2 },
    { title: '1YR', viewBy: 'month', scope: 12, leadingColumns: 4 },
    { title: '3YR', viewBy: 'year', scope: 3, leadingColumns: 1 }
]

const StyledDiv = styled('div')(() => ({
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    height: '32px',
    justifyContent: 'center',
    minWidth: '80px',
    padding: '8px',
    marginLeft: 'auto'
}))

export default function GanttView({ onChange }) {
    const [view, setView] = useState(options[0])

    const handleChange = (option) => {
        onChange(option)
        setView(option)
    }

    return (
        <StyledDiv>
            {options.map((option, index) => (
                <Button
                    key = {index}
                    value = {option}
                    onClick = {() => handleChange(option)}
                    data-testid = {`GanttView__button-scope-${option.title}`}
                    sx = {(theme) => ({
                        backgroundColor: view.title === option.title
                            ? alpha(theme.palette.secondary.main, .2)
                            : 'inherit'
                    })}
                >
                    {option.title}
                </Button>
            ))}
        </StyledDiv>
    )
}

GanttView.propTypes = {
    onChange: PropTypes.func.isRequired
}