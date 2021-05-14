import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

function AddAnotherAssertion({ label, onClick }) {
    return (
        <Button
            style = {{ margin: '0' }}
            variant = 'text'
            color = 'primary'
            onClick = {onClick}
        >Add another {label}...</Button>
    )
}

AddAnotherAssertion.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default AddAnotherAssertion