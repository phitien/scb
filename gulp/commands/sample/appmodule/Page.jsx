import React from 'react'
import NewAppPage from 'apps/new_app/components/Page'
import NewAppNewModuleContent from 'apps/new_app/new_module/Content'

export default class NewAppNewModulePage extends NewAppPage {
    get mainClassName() {return 'new-app-page new-app-new-module-page'}
    get noSidebar() {return __no_sidebar__}
    get leftSidebar() {return __left_sidebar__}
    get rightSidebar() {return __right_sidebar__}
    get content() {return <NewAppNewModuleContent
            params={this.props.params}/>}
}
