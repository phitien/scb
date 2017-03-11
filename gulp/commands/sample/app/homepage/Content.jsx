import React from 'react'
import CoreSection from 'common/core/CoreSection'
import NewAppContent from 'apps/new_app/components/Content'

export default class NewAppHomepageContent extends NewAppContent {
    render() {
        return (
            <CoreSection className='content' heading='NewApp'>
                Hello world!! I am Homepage of NewApp
            </CoreSection>
        )
    }
}
