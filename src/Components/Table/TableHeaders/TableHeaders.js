import { TableCell, TableHead, TableRow, Typography } from '@mui/material'
import PropTypes from 'prop-types'

function TableHeaders({ columns, align, lastColumnAlign, borderBottom, slantHeaders, show }) {
    if (!show) return null

    const getAlign = (columnsLength, currentIndex) => {
        if (columnsLength - 1 === currentIndex) return lastColumnAlign
        else return align
    }

    return (
        <TableHead>
            <TableRow>
                {columns.map((column, index) => (
                    <TableCell
                        key = {index}
                        align = {getAlign(columns.length, index)}
                        style = {{ borderBottom }}
                    >
                        <Typography
                            style = {{
                                fontSize: '.875rem',
                                fontWeight: '500',
                                lineHeight: '1.5rem',
                                transform: slantHeaders ? 'rotate(-45deg)' : 'unset',
                                transformOrigin: slantHeaders ? 'left center' : 'unset'
                            }}
                        >{column}</Typography>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

TableHeaders.propTypes = {
    align: PropTypes.string,
    borderBottom: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastColumnAlign: PropTypes.string,
    show: PropTypes.bool,
    slantHeaders: PropTypes.bool,
}

TableHeaders.defaultProps = {
    align: 'left',
    borderBottom: 'none',
    lastColumnAlign: 'left',
    show: true,
    slantHeaders: false,
}

export default TableHeaders