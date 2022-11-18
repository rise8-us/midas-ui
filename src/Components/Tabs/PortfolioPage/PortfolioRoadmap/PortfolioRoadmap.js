import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Button, Stack, useTheme } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { ExpandAllEntities } from 'Components/ExpandAllEntities'
import { GanttChart } from 'Components/Gantt'
import { GanttAddNewItem } from 'Components/Gantt/GanttAddNewItem'
import { GanttEvent } from 'Components/Gantt/GanttEvent'
import { GanttFilter } from 'Components/Gantt/GanttFilter'
import { GanttLegend } from 'Components/Gantt/GanttLegend'
import { GanttMilestone } from 'Components/Gantt/GanttMilestone'
import { GanttTarget } from 'Components/Gantt/GanttTarget'
import { GanttView } from 'Components/Gantt/GanttView'
import { GanttWin } from 'Components/Gantt/GanttWin'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPortfolioPageSetting } from 'Redux/AppSettings/reducer'
import {
    selectPortfolioPageGanttSettingExpanded,
    selectPortfolioPageSettingView
} from 'Redux/AppSettings/selectors'
import { requestSearchDeliverables } from 'Redux/Deliverables/actions'
import { requestFetchSearchEpics } from 'Redux/Epics/actions'
import { requestSearchEvents } from 'Redux/Events/actions'
import { selectEventsByPortfolioId } from 'Redux/Events/selectors'
import { requestSearchMilestones } from 'Redux/Milestones/actions'
import { selectMilestonesByPortfolioId } from 'Redux/Milestones/selectors'
import { requestSearchTargets } from 'Redux/Targets/actions'
import { selectTargetsByPortfolioId } from 'Redux/Targets/selectors'
import { requestSearchWins } from 'Redux/Wins/actions'
import { selectWinsByPortfolioId } from 'Redux/Wins/selectors'
import { buildOrQueryByIds } from 'Utilities/requests'
import { sortArrayByDateAndTitle } from 'Utilities/sorting'

const CHUNK_SIZE = 20

export default function PortfolioRoadmap({ isAuthorized, portfolioId }) {

    const dispatch = useDispatch()
    const theme = useTheme()
    const searchValue = 'portfolio.id:' + portfolioId

    useEffect(() => {
        dispatch(requestSearchMilestones(searchValue))
        dispatch(requestSearchWins(searchValue))
        dispatch(requestSearchEvents(searchValue))
        dispatch(requestSearchTargets(searchValue + ' AND parent.id:~'))
            .then(unwrapResult).then(data => {
                const ids = data.reduce((acc, entry) => ({
                    epicIds: acc.epicIds.concat(entry.epicIds),
                    subtargetIds: acc.subtargetIds.concat(entry.childrenIds)
                }), { epicIds: [], subtargetIds: [] })

                const promises = []
                for (let i = 0; i < Math.ceil(ids.subtargetIds.length / CHUNK_SIZE); i++) {
                    const idsChunk = ids.subtargetIds.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
                    promises.push(dispatch(requestSearchTargets(buildOrQueryByIds(idsChunk))))
                }

                Promise.allSettled(promises).then(subtargetResponseChunks => {
                    const epicIds = subtargetResponseChunks.reduce((acc, entry) => {
                        return acc.concat(entry?.value?.payload?.reduce((total, resp) => {
                            return total.concat(resp.epicIds)
                        }, []))
                    }, [])

                    const epicIdsTotal = epicIds.concat(ids.epicIds)

                    for (let i = 0; i < Math.ceil(epicIdsTotal.length / CHUNK_SIZE); i++) {
                        dispatch(requestFetchSearchEpics(buildOrQueryByIds(
                            epicIdsTotal.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
                        )))
                    }
                })
            })
        dispatch(requestSearchDeliverables('capability.' + searchValue))
    }, [])

    const milestones = useSelector(state => selectMilestonesByPortfolioId(state, portfolioId))
    const wins = useSelector(state => selectWinsByPortfolioId(state, portfolioId))
    const events = useSelector(state => selectEventsByPortfolioId(state, portfolioId))
    const targets = useSelector(state => selectTargetsByPortfolioId(state, portfolioId))

    const [dateStart, setDateStart] = useState(new Date())
    const view = useSelector(state => selectPortfolioPageSettingView(state, portfolioId))
    const expandedState = useSelector(state => selectPortfolioPageGanttSettingExpanded(state, portfolioId))
    const entries = [
        ...milestones,
        ...events,
        ...wins,
        ...targets.filter(t => t.parentId === null).sort(sortArrayByDateAndTitle),
    ]

    const renderComponent = (entry, dateRange) => {
        switch (entry.type) {
        case 'target':
            return <GanttTarget target = {entry} dateRange = {dateRange}/>
        case 'milestone':
            return <GanttMilestone milestone = {entry}/>
        case 'win':
            return <GanttWin win = {entry}/>
        case 'event':
            return <GanttEvent event = {entry} dateRange = {dateRange}/>
        }
    }

    const handleExpandAll = (entriesToMap) => {
        const init = entriesToMap.filter(entry => entry.type === 'target').reduce((acc, entry) => {
            return {
                ...acc,
                [entry.id]: expandedState[entry.id] ?? false
            }
        }, { allExpanded: expandedState.allExpanded })

        setTimeout(() => {
            dispatch(setPortfolioPageSetting({ id: portfolioId, settingName: 'targets', settingValue: init }))
        }, 0)
    }

    const onEntriesFilter = (filteredEntries) => {
        handleExpandAll(filteredEntries)
        return filteredEntries
    }

    useEffect(() => {
        const newDateStart = new Date()
        newDateStart.setDate(1)
        newDateStart.setHours(0, 0, 0)

        view?.viewBy === 'year' && newDateStart.setMonth(0)

        setDateStart(newDateStart)
    }, [JSON.stringify(view)])

    return (
        <Stack>
            <Stack direction = 'row' style = {{ justifyContent: 'space-between' }}>
                <div>
                    {isAuthorized &&
                        <GanttAddNewItem portfolioId = {portfolioId} />
                    }
                </div>
                <GanttLegend />
            </Stack>
            <GanttChart
                startDate = {dateStart}
                maxHeight = 'calc(100vh - 324px)'
                entries = {entries}
                onEntriesFilter = {onEntriesFilter}
                renderComponent = {renderComponent}
                fillUndefinedRowsWithLikeTypes
                actionBar = {{
                    navLeftIcon: <ChevronLeft size = 'small' />,
                    navRightIcon: <ChevronRight size = 'small' />,
                    buttonComponent: Button,
                    buttonProps: {
                        style: { minWidth: '34px', borderRadius: 0, borderRight: '1px solid black' },
                        size: 'small'
                    },
                    additionalActions:
                        <>
                            <GanttView portfolioId = {portfolioId}/>
                            <ExpandAllEntities portfolioId = {portfolioId}/>
                            <GanttFilter />
                        </>
                }}
                chartBackgroundColor = {theme.palette.background.paper}
                headerStyles = {{
                    color: theme.palette.grey[600],
                    ...theme.typography.subtitle2,
                    marginLeft: theme.spacing(1),
                    marginBlock: 'unset'
                }}
                todayColor = {theme.palette.primary.main}
                scope = {view?.scope}
                leadingColumns = {view?.leadingColumns}
                viewBy = {view?.viewBy}
            />
        </Stack>
    )
}

PortfolioRoadmap.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    portfolioId: PropTypes.number.isRequired
}
