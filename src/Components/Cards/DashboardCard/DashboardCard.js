import { Card, CardContent, rgbToHex, Typography, useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { styled } from 'Styles/materialThemes'

const TypographyTitleStyled = styled(Typography)(({ theme }) => ({
    paddingRight: theme.spacing(5)
}))

const CardStyled = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2)
}))

const optionsStyle = {
    borderRadius: 2,
    padding: '2px 10px',
    margin: '0 5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'text.secondary',
}

function DashboardCard(props) {
    const { title, options, defaultOptionId, onChange, children, ...cardStyle } = props
    const theme = useTheme()

    const [selectedId, setSelectedId] = useState(defaultOptionId)

    const onIdChange = (id) => {
        setSelectedId(id)
        typeof onChange === 'function' && onChange(id)
    }

    return (
        <CardStyled style = {{ ...cardStyle }}>
            <CardContent style = {{ display: 'flex', alignItems: 'center' }}>
                <TypographyTitleStyled variant = 'h6' color = 'text.secondary'>
                    {title}
                </TypographyTitleStyled>
                {options.map((option) => (
                    <Typography
                        key = {option.id}
                        variant = 'caption'
                        sx = {{
                            ...optionsStyle,
                            backgroundColor: selectedId === option.id ?
                            `${rgbToHex(theme.palette.grey[800])}70` : 'transparent',
                            '&:hover': {
                                backgroundColor: `${rgbToHex(theme.palette.grey[800])}A0`
                            }
                        }}
                        onClick = {() => onIdChange(option.id)}
                    >
                        {option.label}
                    </Typography>
                ))}
            </CardContent>
            {children}
        </CardStyled>
    )
}

DashboardCard.propTypes = {
    title: PropTypes.string.isRequired,
    defaultOptionId: PropTypes.number,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        })
    ),
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    width: PropTypes.string,
    minWidth: PropTypes.string,
    maxWidth: PropTypes.string,
    height: PropTypes.string,
    maxHeight: PropTypes.string
}

DashboardCard.defaultProps = {
    defaultOptionId: null,
    options: [],
    onChange: null,
    children: null,
    width: 'initial',
    minWidth: '600px',
    maxWidth: 'unset',
    height: '100%',
    maxHeight: 'unset'
}

export default DashboardCard
