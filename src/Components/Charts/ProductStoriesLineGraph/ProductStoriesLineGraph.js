import { Card, Stack, Typography, useTheme } from '@mui/material'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function ProductStoriesLineGraph({ dateOffset, rawData }) {

    const theme = useTheme()

    const data = useMemo(() => rawData.map(entry => {
        let date = new Date(entry.date + 'T00:00')
        date.setDate(date.getDate() + dateOffset)

        return {
            'Closed Issues': entry.deliveredStories,
            'Points Delivered': entry.deliveredPoints,
            xAxis: format(date, 'ddMMM'),
            legend: format(date, 'PPP'),
        }
    }).reverse(), [rawData])

    return (
        <ResponsiveContainer>
            <LineChart
                data = {data}
                margin = {{
                    top: 0,
                    right: 28,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid horizontal = {false} vertical = {false} />
                <XAxis
                    dataKey = 'xAxis'
                    interval = {0}
                    tick = {(params) =>
                        <g transform = {`translate(${params.x},${params.y})`}>
                            <text
                                x = {0}
                                y = {-3}
                                dy = {16}
                                textAnchor = 'middle'
                                fill = {theme.palette.grey[600]}
                                style = {{ ...theme.typography.caption }}
                            >
                                {params.payload.value}
                            </text>
                        </g>
                    }
                />
                <YAxis
                    interval = {0}
                    tick = {(params) =>
                        <g transform = {`translate(${params.x},${params.y})`}>
                            <text
                                y = {4}
                                textAnchor = 'end'
                                fill = {theme.palette.grey[600]}
                                style = {{ ...theme.typography.caption }}
                            >
                                {params.payload.value}
                            </text>
                        </g>
                    }
                />
                <Tooltip
                    content = {(params) =>
                        <Card style = {{ background: theme.palette.background.default, minWidth: '160px' }}>
                            {params.payload?.map((item, index) =>
                                <Stack key = {index} margin = {1} spacing = {1}>
                                    {index === 0 &&
                                        <Typography direction = 'row' variant = 'body2' color = 'secondary'>
                                            {item.payload.legend}
                                        </Typography>
                                    }
                                    <Stack
                                        direction = 'row'
                                        alignItems = 'baseline'
                                        spacing = {0.5}
                                        justifyContent = 'space-between'
                                    >
                                        <Typography variant = 'body2'>{item.name}:</Typography>
                                        <Typography fontWeight = 'bold'>{item.value}</Typography>
                                    </Stack>
                                </Stack>
                            )}
                        </Card>
                    }
                />
                <Legend
                    layout = 'horizontal'
                    verticalAlign = 'top'
                    align = 'center'
                    height = '32px'
                    formatter = {(value) => <Typography variant = 'caption'>{value}</Typography>}
                    wrapperStyle = {{ left: '35px' }}
                />
                <Line
                    type = 'monotone'
                    dataKey = 'Closed Issues'
                    stroke = 'silver'
                    dot = {{
                        stroke: 'silver',
                        strokeWidth: 2,
                        radius: 3,
                        fill: theme.palette.background.paper,
                    }}
                    activeDot = {{
                        stroke: 'silver',
                        strokeWidth: 2,
                        radius: 3,
                        fill: 'silver',
                    }}
                />
                <Line
                    type = 'monotone'
                    dataKey = 'Points Delivered'
                    stroke = {theme.palette.primary.main}
                    dot = {{
                        stroke: theme.palette.primary.main,
                        strokeWidth: 2,
                        radius: 3,
                        fill: theme.palette.background.paper,
                    }}
                    activeDot = {{
                        stroke: theme.palette.primary.main,
                        strokeWidth: 2,
                        radius: 3,
                        fill: theme.palette.primary.main,
                    }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

ProductStoriesLineGraph.propTypes = {
    dateOffset: PropTypes.number,
    rawData: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string,
        deliveredPoints: PropTypes.number,
        deliveredStories: PropTypes.number,
    })),
}

ProductStoriesLineGraph.defaultProps = {
    dateOffset: 0,
    rawData: [],
}