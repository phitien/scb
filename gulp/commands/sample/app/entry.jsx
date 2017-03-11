import React from 'react'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import NewAppApplication from 'apps/new_app/App'
import NewAppRoutes from 'apps/new_app/Routes'

const app = new NewAppApplication
/**
 * Set your redux store here
 */
app.store = createStore(
    applyMiddleware(
        thunk
    )
)
app.routes = NewAppRoutes
