import React from 'react'
import CoreSection from 'common/core/CoreSection'
import ScannerContent from 'apps/scanner/components/Content'
import DataGrid from 'apps/scanner/homepage/DataGrid'

export default class ScannerHomepageContent extends ScannerContent {
    render() {
        return (
            <CoreSection className='content' heading=''>
                <DataGrid/>
            </CoreSection>
        )
    }
}
