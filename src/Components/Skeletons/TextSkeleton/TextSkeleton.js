import { Skeleton } from '@mui/material'
import PropTypes from 'prop-types'

export default function TextSkeleton({ loading, text, ...skeletonProps }) {
    return loading ? <Skeleton {...skeletonProps} data-testid = 'TextSkeleton'/> : text
}

TextSkeleton.propTypes = {
    loading: PropTypes.bool.isRequired,
    text: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

TextSkeleton.defaultProps = {
    text: '',
}