import React from 'react'
import ScannerPage from 'apps/scanner/components/Page'
import ScannerHomepageContent from 'apps/scanner/homepage/Content'

export default class ScannerHomepagePage extends ScannerPage {
    get mainClassName() {return 'scanner-page scanner-homepage-page'}
    get content() {return <ScannerHomepageContent
            params={this.props.params}/>}
}
