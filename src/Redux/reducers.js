import { combineReducers } from 'redux'
import appSettingsReducer from './AppSettings/reducer'
import assertionReducer from './Assertions/reducer'
import authReducer from './Auth/reducer'
import blockedAssertions from './BlockedAssertions/reducer'
import commentReducer from './Comments/reducer'
import errorReducer from './Errors/reducer'
import filterReducer from './Filters/reducer'
import modifiedAssertionsReducer from './ModifiedAssertions/reducer'
import personaReducer from './Personas/reducer'
import popupReducer from './Popups/reducer'
import portfolioReducer from './Portfolios/reducer'
import productReducer from './Products/reducer'
import projectReducer from './Projects/reducer'
import sourceControlReducer from './SourceControls/reducer'
import tagReducer from './Tags/reducer'
import teamReducer from './Teams/reducer'
import userReducer from './Users/reducer'

export const rootReducer = combineReducers({
    app: appSettingsReducer,
    assertions: assertionReducer,
    auth: authReducer,
    blockedAssertions: blockedAssertions,
    comments: commentReducer,
    errors: errorReducer,
    filters: filterReducer,
    sourceControls: sourceControlReducer,
    modifiedAssertions: modifiedAssertionsReducer,
    personas: personaReducer,
    popups: popupReducer,
    products: productReducer,
    portfolios: portfolioReducer,
    projects: projectReducer,
    tags: tagReducer,
    teams: teamReducer,
    users: userReducer
})
