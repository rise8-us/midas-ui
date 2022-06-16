import { combineReducers } from 'redux'
import appSettingsReducer from './AppSettings/reducer'
import assertionReducer from './Assertions/reducer'
import authReducer from './Auth/reducer'
import capabilityReducer from './Capabilities/reducer'
import commentReducer from './Comments/reducer'
import deliverablesReducer from './Deliverables/reducer'
import epicReducer from './Epics/reducer'
import errorReducer from './Errors/reducer'
import eventReducer from './Events/reducer'
import featureReducer from './Features/reducer'
import filterReducer from './Filters/reducer'
import measureReducer from './Measures/reducer'
import milestoneReducer from './Milestones/reducer'
import missionThreadReducer from './MissionThreads/reducer'
import modifiedAssertionsReducer from './ModifiedAssertions/reducer'
import pageAccessReducer from './PageAccess/reducer'
import performanceMeasureReducer from './PerformanceMeasures/reducer'
import personaReducer from './Personas/reducer'
import personnelReducer from './Personnel/reducer'
import popupReducer from './Popups/reducer'
import portfolioReducer from './Portfolios/reducer'
import productReducer from './Products/reducer'
import projectReducer from './Projects/reducer'
import roadmapReducer from './Roadmaps/reducer'
import snackbarReducer from './Snackbar/reducer'
import sourceControlReducer from './SourceControls/reducer'
import tagReducer from './Tags/reducer'
import targetReducer from './Targets/reducer'
import teamReducer from './Teams/reducer'
import userReducer from './Users/reducer'
import winReducer from './Wins/reducer'

export const rootReducer = combineReducers({
    app: appSettingsReducer,
    assertions: assertionReducer,
    auth: authReducer,
    capabilities: capabilityReducer,
    comments: commentReducer,
    deliverables: deliverablesReducer,
    epics: epicReducer,
    errors: errorReducer,
    events: eventReducer,
    features: featureReducer,
    filters: filterReducer,
    measures: measureReducer,
    milestones: milestoneReducer,
    missionThreads: missionThreadReducer,
    modifiedAssertions: modifiedAssertionsReducer,
    pageAccess: pageAccessReducer,
    performanceMeasures: performanceMeasureReducer,
    personas: personaReducer,
    personnel: personnelReducer,
    popups: popupReducer,
    portfolios: portfolioReducer,
    products: productReducer,
    projects: projectReducer,
    roadmaps: roadmapReducer,
    snackbar: snackbarReducer,
    sourceControls: sourceControlReducer,
    tags: tagReducer,
    targets: targetReducer,
    teams: teamReducer,
    users: userReducer,
    wins: winReducer
})
