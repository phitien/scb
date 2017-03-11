import React from 'react'
import ScannerComponent from 'apps/scanner/components/Component'

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
