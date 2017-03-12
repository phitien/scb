import React from 'react'
import NewAppComponent from './Component'

export default class NewAppSideBar extends NewAppComponent {
    render() {
        return (
            <ul>
                <li onClick={() => this.history.push('/apps/new-app')} className='active'>
                    <a><span>NewApp</span></a></li>
            </ul>
        )
    }
}
