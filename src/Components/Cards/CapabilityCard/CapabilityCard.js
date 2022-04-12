import { Card, CardContent, CardHeader } from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from 'Styles/materialThemes'

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.grey[1100],
    borderRadius: theme.spacing(2),
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    paddingBottom: 0,
    marginBottom: theme.spacing(2)
}))

export default function CapabilityCard({ title, subheader, action, children }) {

    return (
        <StyledCard>
            <CardHeader
                title = {title}
                subheader = {subheader}
                titleTypographyProps = {{ variant: 'h6' }}
                subheaderTypographyProps = {{ variant: 'subtitle1' }}
                action = {action}
            />
            <StyledCardContent>
                {children}
            </StyledCardContent>
        </StyledCard>
    )
}

CapabilityCard.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    action: PropTypes.node,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
}

CapabilityCard.defaultProps = {
    title: undefined,
    action: undefined,
    subheader: undefined,
}
