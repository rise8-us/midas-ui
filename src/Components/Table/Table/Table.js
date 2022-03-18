import { Box, Paper, Table as MUITable, TableBody, TableCell, TableRow, useTheme } from '@mui/material'
import PropTypes from 'prop-types'
import { TableHeaders } from '../'

// NOTE: reference - MUI Sticky Header Table -- https://codesandbox.io/s/x17ef?file=/demo.js:1069-1212
// Can handle pagination if/when it needs to be implemented.
//Table container and maxheight allow for scrolling on table instead of page

const calculateSettings = (transparent, disableRowDividers, onRowClick, align) => {
    return {
        backgroundColor: transparent ? 'transparent' : 'default',
        elevation: disableRowDividers ? 0 : 1,
        rowCursor: typeof onRowClick === 'function' ? 'pointer' : 'inherit',
        borderBottom: disableRowDividers ? 'none' : '1px solid rgb(19, 22, 23)',
        end: align === 'left' ? 'right' : 'left'
    }
}

const getCellAlign = (align, end, invertLastColumnAlign, max, current) => {
    if (!['left', 'right'].includes(align)) return align

    if (invertLastColumnAlign && max - 1 === current) return end
    else return align
}

function Table({
    tableWidth,
    align,
    stickyHeader,
    rows,
    columns,
    transparent,
    disableHeaders,
    onRowClick,
    invertLastColumnAlign,
    disableRowDividers,
    slantHeaders
}) {
    const theme = useTheme()

    const tableSettings = calculateSettings(transparent, disableRowDividers, onRowClick, align)

    const end = tableSettings.end

    const getAlign = (columnsLength, currentIndex) => {
        return getCellAlign(align, end, invertLastColumnAlign, columnsLength, currentIndex)
    }

    const tableDataStyles = (contentLength) => {
        const border = { borderBottom: tableSettings.borderBottom }

        if (contentLength) {
            return {
                padding: '0',
                ...border
            }
        }
        return {
            padding: '12px 16px',
            maxWidth: 'auto',
            ...border
        }
    }

    return (
        <Paper
            data-testid = 'Table__paper'
            style = {{
                width: tableWidth,
                margin: 'auto',
                backgroundColor: tableSettings.backgroundColor
            }}
            elevation = {tableSettings.elevation}
        >
            <MUITable {...stickyHeader}>
                <TableHeaders
                    show = {!disableHeaders}
                    columns = {columns}
                    align = {align}
                    lastColumnAlign = {invertLastColumnAlign ? end : align}
                    borderBottom = {tableSettings.borderBottom}
                    slantHeaders = {slantHeaders}
                />
                <TableBody>
                    {rows.map((row, index) => {
                        return (
                            <TableRow
                                key = {index}
                                hover
                                data-testid = 'Table__row'
                                onClick = {() => {
                                    typeof onRowClick === 'function' && onRowClick(row.data)
                                }}
                                style = {{
                                    cursor: tableSettings.rowCursor,
                                    borderBottom: tableSettings.borderBottom
                                }}
                            >
                                {columns.map((column, idx) => (
                                    <TableCell
                                        key = {`${index}-${idx}`}
                                        align = {getAlign(columns.length, idx)}
                                        style = {tableDataStyles(column.length === 0)}
                                    >
                                        <Box
                                            display = 'flex'
                                            flexDirection = {columns.length - 1 === idx && column.length === 0 ?
                                                'row-reverse' : 'row'}
                                            textAlign = {getAlign(columns.length, idx)}
                                            style = {{
                                                color: row.properties.strikeThrough ?
                                                    theme.palette.text.disabled : theme.palette.text.primary,
                                                textDecorationLine: row.properties.strikeThrough ?
                                                    'line-through' : 'none'
                                            }}
                                        >
                                            {row.data[idx]}
                                        </Box>
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
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
            properties: PropTypes.shape({
                strikeThrough: PropTypes.bool
            })
        })
    ).isRequired,
    disableHeaders: PropTypes.bool,
    stickyHeader: PropTypes.bool,
    tableWidth: PropTypes.string,
    align: PropTypes.string,
    transparent: PropTypes.bool,
    onRowClick: PropTypes.func,
    invertLastColumnAlign: PropTypes.bool,
    slantHeaders: PropTypes.bool,
    disableRowDividers: PropTypes.bool
}

Table.defaultProps = {
    disableHeaders: false,
    invertLastColumnAlign: false,
    stickyHeader: true,
    maxHeight: '440px',
    align: 'left',
    tableWidth: '75vw',
    transparent: false,
    onRowClick: undefined,
    slantHeaders: false,
    disableRowDividers: false
}

export default Table
