import React from 'react'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import ScannerApplication from 'apps/scanner/App'
import ScannerRoutes from 'apps/scanner/Routes'

const app = new ScannerApplication
/**
 * Set your redux store here
 */
app.store = createStore(
    applyMiddleware(
        thunk
    )
)
app.routes = ScannerRoutes
