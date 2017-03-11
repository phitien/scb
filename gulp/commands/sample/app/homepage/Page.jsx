import React from 'react'
import NewAppPage from 'apps/new_app/components/Page'
import NewAppHomepageContent from 'apps/new_app/homepage/Content'

export default class NewAppHomepagePage extends NewAppPage {
    get mainClassName() {return 'new-app-page new-app-homepage-page'}
    get content() {return <NewAppHomepageContent
            params={this.props.params}/>}
}
