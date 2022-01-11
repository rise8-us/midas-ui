import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import { Box, IconButton, Link, Skeleton, Stack, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestSearchCoverages } from 'Redux/Coverages/actions'

export default function CodeCoverageTooltip({ currentPercent, projectId }) {
    const dispatch = useDispatch()

    const [coverages, setCoverages] = useState([])
    const [loading, setLoading] = useState(true)
    const page = useRef(0)

    const changePage = (change) => {
        page.current = page.current + change
        fetchCoverages()
    }

    const fetchCoverages = () => {
        setLoading(true)
        const searchString = 'project.id:' + projectId + '&order_by=DESC&size=5&page=' + page.current

        dispatch(requestSearchCoverages(searchString))
            .then(unwrapResult)
            .then(data => {
                setCoverages(data)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchCoverages()
    }, [])

    return (
        <Stack spacing = {1} marginBottom = {1}>
            <Typography>Code coverage is currently at {currentPercent}%</Typography>
            {loading && [...Array(5)].map((_item, index) =>
                <Box
                    key = {index}
                    display = 'flex'
                    justifyContent = 'space-between'
                    data-testid = 'CodeCoverageTooltip__loading-box'
                >
                    <Skeleton height = {24} width = {84} />
                    <Skeleton height = {24} width = {36} />
                    <Skeleton height = {24} width = {56} />
                </Box>
            )}
            {!loading && coverages.map((coverage, index) => (
                <Box
                    key = {index}
                    display = 'flex'
                    justifyContent = 'space-between'
                    data-testid = 'CodeCoverageTooltip__coverage-row'
                >
                    <Typography color = 'secondary'>
                        {coverage.creationDate.split('T')[0]}
                    </Typography>
                    <Typography color = 'secondary' width = {48}>
                        {coverage.testCoverage.toFixed(1)}
                    </Typography>
                    <Typography>
                        <Link href = {coverage.pipelineUrl} target = '_blank' rel = 'noopener noreferrer'>
                            Pipeline
                        </Link>
                    </Typography>
                </Box>
            ))}
            <Box display = 'flex' alignContent = 'center' justifyContent = 'center'>
                <IconButton onClick = {() => changePage(-1)} disabled = {page.current === 0}>
                    <ArrowLeftOutlined />
                </IconButton>
                <Typography width = '36px' variant = 'h6' textAlign = 'center' marginTop = '3px'>
                    {page.current + 1}
                </Typography>
                <IconButton onClick = {() => changePage(1)} disabled = {coverages.length !== 5}>
                    <ArrowRightOutlined />
                </IconButton>
            </Box>
        </Stack>
    )
}

CodeCoverageTooltip.propTypes = {
    currentPercent: PropTypes.number,
    projectId: PropTypes.number.isRequired
}

CodeCoverageTooltip.defaultProps = {
    currentPercent: 0
}