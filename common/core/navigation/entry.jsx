import React from 'react'
import ReactDOM from 'react-dom'
import HeaderComponent from './Header'
import FooterComponent from './Footer'
import NavigationSettings from './Settings'

(() => {
    ReactDOM.render(
        <HeaderComponent/>,
        document.getElementById('header')
    )
    ReactDOM.render(
        <FooterComponent/>,
        document.getElementById('footer')
    )
})()
