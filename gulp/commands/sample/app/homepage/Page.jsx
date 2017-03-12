import React from 'react'
import NewAppPage from '../components/Page'
import NewAppHomepageContent from '../homepage/Content'

export default class NewAppHomepagePage extends NewAppPage {
    get mainClassName() {return 'new-app-page new-app-homepage-page'}
    get content() {return <NewAppHomepageContent
            params={this.props.params}/>}
}
