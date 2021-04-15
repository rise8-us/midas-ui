import {
    Box,
    makeStyles, Paper, Table as MUITable, TableBody, TableCell, TableHead, TableRow, useTheme
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

// NOTE: reference - MUI Sticky Header Table -- https://codesandbox.io/s/x17ef?file=/demo.js:1069-1212
// Can handle pagination if/when it needs to be implemented.
//Table container and maxheight allow for scrolling on table instead of page

const useStyles = makeStyles(theme => ({
    actions: {
        padding: '0',
    },
    regular: {
        maxWidth: 'auto',
        padding: '12px 16px',
        color: theme.palette.text.primary
    },
}))

function Table({ tableWidth, align, stickyHeader, rows, columns, transparent }) {
    const classes = useStyles()
    const theme = useTheme()

    const end = align === 'left' ? 'right' : 'left'

    const getAlign = (columnsLength, currentIndex) => columnsLength - 1 !== currentIndex ? align : end

    return (
        <Paper
            data-testid = 'Table__paper'
            style = {{
                width: tableWidth,
                margin: 'auto',
                backgroundColor: `${transparent ? 'transparent' : 'default'}`
            }}
        >
            <MUITable { ...stickyHeader }>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell
                                key = {index}
                                align = {getAlign(columns.length, index)}
                            >
                                {column}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => {
                        return (
                            <TableRow
                                tabIndex = {-1}
                                key = {index}
                                hover
                            >
                                {columns.map((column, idx) => (
                                    <TableCell
                                        key = {`${index}-${idx}`}
                                        align = {getAlign(columns.length, idx)}
                                        className = {column.length === 0 ? classes.actions  : classes.regular }
                                    >
                                        <Box
                                            display = 'flex'
                                            flexDirection = {
                                                columns.length - 1 === idx && column.length === 0 ?
                                                    'row-reverse' : 'row'
                                            }
                                            style = {{
                                                color: row.properties.strikeThrough ?
                                                    theme.palette.text.disabled : theme.palette.text.primary,
                                                textDecorationLine: row.properties.strikeThrough ?
                                                    'line-through' : 'none',
                                            }}
                                        >{row.data[idx]}</Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MUITable>
        </Paper>
    )
}

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({
        data: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
        properties: PropTypes.shape({
            strikeThrough: PropTypes.bool
        })
    })).isRequired,
    stickyHeader: PropTypes.bool,
    tableWidth: PropTypes.string,
    align: PropTypes.string,
    transparent: PropTypes.bool
}

Table.defaultProps = {
    stickyHeader: true,
    maxHeight: '440px',
    align: 'left',
    tableWidth: '75vw',
    transparent: false
}

export default Table