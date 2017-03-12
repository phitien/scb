import React from 'react'
import CoreSection from '../../../common/core/CoreSection'
import ScannerContent from '../components/Content'
import DataGrid from './DataGrid'

export default class ScannerHomepageContent extends ScannerContent {
    render() {
        return (
            <CoreSection className='content' heading=''>
                <DataGrid/>
            </CoreSection>
        )
    }
}
