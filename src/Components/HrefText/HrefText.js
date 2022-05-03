import { Link, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from 'Styles/materialThemes'

const StyledTypography = styled(Typography)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main
    }
}))

export default function HrefText({ href, text, ...typographyProps }) {
    return href ? (
        <Link
            href = {href}
            target = '_blank'
            rel = 'noopener noreferrer'
            underline = 'hover'
            data-testid = 'HrefTitle__link'
        >
            <StyledTypography {...typographyProps}>
                {text}
            </StyledTypography>
        </Link>
    ) : (
        <Typography {...typographyProps}>
            {text}
        </Typography>
    )
}

HrefText.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string.isRequired,
}

HrefText.defaultProps = {
    href: undefined,
}