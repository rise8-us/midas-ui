import { combineReducers } from 'redux'
import appSettingsReducer from './AppSettings/reducer'
import assertionReducer from './Assertions/reducer'
import authReducer from './Auth/reducer'
import commentReducer from './Comments/reducer'
import errorReducer from './Errors/reducer'
import featureReducer from './Features/reducer'
import filterReducer from './Filters/reducer'
import modifiedAssertionsReducer from './ModifiedAssertions/reducer'
import personaReducer from './Personas/reducer'
import popupReducer from './Popups/reducer'
import portfolioReducer from './Portfolios/reducer'
import productReducer from './Products/reducer'
import projectReducer from './Projects/reducer'
import roadmapReducer from './Roadmaps/reducer'
import sourceControlReducer from './SourceControls/reducer'
import tagReducer from './Tags/reducer'
import teamReducer from './Teams/reducer'
import userReducer from './Users/reducer'

export const rootReducer = combineReducers({
    app: appSettingsReducer,
    assertions: assertionReducer,
    auth: authReducer,
    comments: commentReducer,
    errors: errorReducer,
    features: featureReducer,
    filters: filterReducer,
    modifiedAssertions: modifiedAssertionsReducer,
    personas: personaReducer,
    popups: popupReducer,
    portfolios: portfolioReducer,
    products: productReducer,
    projects: projectReducer,
    roadmaps: roadmapReducer,
    sourceControls: sourceControlReducer,
    tags: tagReducer,
    teams: teamReducer,
    users: userReducer
})
