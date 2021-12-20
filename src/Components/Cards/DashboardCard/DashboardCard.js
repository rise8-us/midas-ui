import { alpha, Card, CardContent, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { scrollbar, styled } from 'Styles/materialThemes'

const TypographyTitleStyled = styled(Typography)(({ theme }) => ({
    paddingRight: theme.spacing(5)
}))

const TypographyOptionStyled = styled(Typography)(({ theme, selected }) => ({
    borderRadius: theme.spacing(2),
    padding: '2px 10px',
    margin: '0 5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'text.secondary',
    backgroundColor: selected ? alpha(theme.palette.grey[800], .44) : 'transparent',
    '&:hover': {
        backgroundColor: alpha(theme.palette.grey[800], .63)
    }
}))

const CardStyled = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    width: '100%',
    boxShadow: 'none'
}))

const CardContentStyled = styled(CardContent)(({ theme }) => ({
    width: '100%',
    overflowY: 'scroll',
    ...scrollbar(theme)
}))

function DashboardCard(props) {
    const { title, options, defaultOptionId, onChange, children, ...cardStyle } = props

    const [selectedId, setSelectedId] = useState(defaultOptionId)

    const onIdChange = (id) => {
        setSelectedId(id)
        typeof onChange === 'function' && onChange(id)
    }

    return (
        <CardStyled>
            <Stack
                direction = 'row'
                height = 'inherit'
                alignItems = 'center'
                style = {{ height: '48px', width: 'inherit', padding: 0 }}
            >
                <TypographyTitleStyled variant = 'h6' color = 'text.secondary' marginLeft = {2}>
                    {title}
                </TypographyTitleStyled>
                {options.map((option, index) => (
                    <TypographyOptionStyled
                        key = {index}
                        variant = 'caption'
                        selected = {selectedId === option.id}
                        onClick = {() => onIdChange(option.id)}
                    >
                        {option.label}
                    </TypographyOptionStyled>
                ))}
            </Stack>
            <CardContentStyled height = 'fit-content' style = {{ ...cardStyle }}>
                {children}
            </CardContentStyled>
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
