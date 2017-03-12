import React from 'react'
import CoreSection from '../../../common/core/CoreSection'
import NewAppContent from '../components/Content'

export default class NewAppNewModuleContent extends NewAppContent {
    render() {
        return (
            <CoreSection className='content' heading='NewModule'>
                Hello world!! I am NewModule of NewApp
            </CoreSection>
        )
    }
}
