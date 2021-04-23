import PropTypes from 'prop-types'
import React from 'react'

const FormatErrors = ({ errors }) => errors.map((e, i) => <React.Fragment key = {i}>{e}<br/></React.Fragment>)

FormatErrors.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string)
}

FormatErrors.defaultProps = {
    errors: []
}

export default FormatErrors