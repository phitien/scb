import React from 'react'
import NavigationBaseComponent from './Component'

export default class LogoComponent extends NavigationBaseComponent {
    get mainClassName() {return 'site-logo'}

    render() {
        return <a href='/' className={this.className}></a>
    }
}
