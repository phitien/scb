import React from 'react'
import { render } from 'react-dom'
import HeaderComponent from 'apps/navigation/Header'
import FooterComponent from 'apps/navigation/Footer'
import NavigationSettings from 'apps/navigation/Settings'

(() => {
    render(
        <HeaderComponent/>,
        document.getElementById('header')
    )
    render(
        <FooterComponent/>,
        document.getElementById('footer')
    )
})()
