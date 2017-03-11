import React from 'react'
import CorePageLeftSidebar from 'common/core/CorePageLeftSidebar'
import CorePageRightSidebar from 'common/core/CorePageRightSidebar'
import CorePageNoSidebar from 'common/core/CorePageNoSidebar'
import NewAppComponent from 'apps/new_app/components/Component'
import NewAppSideBar from 'apps/new_app/components/SideBar'

export default class NewAppPage extends NewAppComponent {
    get mainClassName() {return 'new-app-page'}
    get noSidebar() {return false}
    get leftSidebar() {return true}
    get sidebar() {return <NewAppSideBar params={this.props.params}/>}
    get isBlockingScreen() {return this.store.pageLoading || this.store.requesting}
    componentDidMount() {this.store.addChangeListener(this.refresh)}
    componentWillUnmount() {this.store.removeChangeListener(this.refresh)}
    render() {
        if (this.noSidebar) return <CorePageNoSidebar renderer={this} className={this.className}
            isBlockingScreen={this.isBlockingScreen}
            />
        else if (this.leftSidebar) return <CorePageLeftSidebar renderer={this} className={this.className}
            isBlockingScreen={this.isBlockingScreen}
            />
        else return <CorePageRightSidebar renderer={this} className={this.className}
            isBlockingScreen={this.isBlockingScreen}
            />
    }
}
