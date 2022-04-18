import { Add, ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Button } from '@mui/material'
import { GanttChart } from 'Components/Gantt'
import { GanttEvent } from 'Components/Gantt/GanttEvent'
import { GanttMilestone } from 'Components/Gantt/GanttMilestone'
import { GanttTarget } from 'Components/Gantt/GanttTarget'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestSearchEvents } from 'Redux/Events/actions'
import { selectEventsByPortfolioId } from 'Redux/Events/selectors'
import { requestSearchMilestones } from 'Redux/Milestones/actions'
import MilestoneConstants from 'Redux/Milestones/constants'
import { selectMilestonesByPortfolioId } from 'Redux/Milestones/selectors'
import { selectPortfolioPagePermission } from 'Redux/PageAccess/selectors'
import { openPopup } from 'Redux/Popups/actions'
import { requestSearchTargets } from 'Redux/Targets/actions'
import TargetConstants from 'Redux/Targets/constants'
import { selectTargetsByPortfolioId } from 'Redux/Targets/selectors'
import { styled } from 'Styles/materialThemes'

const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.main,
    },
    height: 40,
}))
export default function EntriesContainer({ portfolioId }) {

    const dispatch = useDispatch()
    const searchValue = 'portfolio.id:' + portfolioId
    const permissions = useSelector(state => selectPortfolioPagePermission(state, portfolioId))

    useEffect(() => {
        dispatch(requestSearchMilestones(searchValue))
        dispatch(requestSearchEvents(searchValue))
        dispatch(requestSearchTargets(searchValue))
    }, [])

    const milestones = useSelector(state => selectMilestonesByPortfolioId(state, portfolioId))
    const events = useSelector(state => selectEventsByPortfolioId(state, portfolioId))
    const targets = useSelector(state => selectTargetsByPortfolioId(state, portfolioId))

    const entries = [
        ...milestones,
        ...events,
        ...targets
    ]
    let dateStart = new Date()
    dateStart.setMonth(dateStart.getMonth() - 3)
    dateStart.setDate(1)
    dateStart.setHours(0, 0, 0)

    const renderComponent = (entry, dateRange, index) => {
        switch (entry.type) {
        case 'target':
            return <GanttTarget target = {entry} portfolioId = {portfolioId}/>
        case 'milestone':
            return <GanttMilestone
                milestone = {entry}
                dateRange = {dateRange}
                index = {index}
                portfolioId = {portfolioId}
            />
        case 'event':
            return <GanttEvent event = {entry}/>
        }
    }

    const createMilestone = () =>
        dispatch(openPopup(MilestoneConstants.CREATE_MILESTONE, 'MilestonePopup', { portfolioId: portfolioId }))
    const createTarget = () =>
        dispatch(openPopup(TargetConstants.CREATE_TARGET, 'TargetPopup', { portfolioId: portfolioId }))

    return (
        <>
            {permissions.edit &&
            <>
                <StyledButton variant = 'text' startIcon = {<Add />} onClick = {createMilestone}>
                    Add New Milestone
                </StyledButton>
                <StyledButton variant = 'text' startIcon = {<Add />} onClick = {createTarget}>
                    Add New Target
                </StyledButton>
            </>
            }
            <GanttChart
                startDate = {dateStart}
                maxHeight = 'calc(100% - 200px)'
                entries = {entries}
                renderComponent = {renderComponent}
                actionBar = {{
                    navLeftIcon: <ChevronLeft size = 'small' />,
                    navRightIcon: <ChevronRight size = 'small' />,
                    buttonComponent: Button,
                    buttonProps: {
                        style: { minWidth: '34px', borderRadius: 0, borderRight: '1px solid black' },
                        size: 'small'
                    }
                }}
            />
        </>
    )
}

EntriesContainer.propTypes = {
    portfolioId: PropTypes.number.isRequired,
}

const mockTargets = [
    {
        title: 'Create Midas App',
        startDate: '2020-12-15',
        dueDate: '2021-11-01',
        type: 'target'
    }, {
        title: 'Create User Profiles',
        startDate: '2021-03-01',
        dueDate: '2021-10-16',
        type: 'target'
    }, {
        title: 'Create Products Page',
        startDate: '2021-07-01',
        dueDate: '2021-12-01',
        type: 'target'
    }, {
        title: 'Create Portfolios',
        startDate: '2022-10-01',
        dueDate: '2023-2-01',
        type: 'target'
    }, {
        title: 'test entry4',
        startDate: '2022-10-01',
        dueDate: '2023-1-01',
        type: 'target'
    }
]

const mockMilestones = [
    {
        title: 'Old Milestone',
        description: 'Second Milestone Test',
        dueDate: '2021-09-01',
        type: 'milestone',
        enableFullHeight: true,
        row: 0
    },
    {
        title: 'Milestone1',
        description: 'First Milestone Test',
        dueDate: '2022-05-15',
        type: 'milestone',
        enableFullHeight: true,
        row: 0
    },
    {
        title: 'Milestone2',
        description: 'Second Milestone Test',
        dueDate: '2022-8-24',
        type: 'milestone',
        enableFullHeight: true,
        row: 0
    },
    {
        title: 'Milestone3',
        description: 'Second Milestone Test',
        dueDate: '2023-02-04',
        type: 'milestone',
        enableFullHeight: true,
        row: 0
    }
]