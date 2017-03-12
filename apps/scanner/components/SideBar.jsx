import React from 'react'
import ScannerComponent from './Component'

export default class ScannerSideBar extends ScannerComponent {
    render() {
        return (
            <ul>
                <li onClick={() => this.history.push('/apps/scanner')} className='active'>
                    <a><span>Scanner</span></a></li>
            </ul>
        )
    }
}
