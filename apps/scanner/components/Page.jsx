import React from 'react'
import CorePageLeftSidebar from 'common/core/CorePageLeftSidebar'
import CorePageRightSidebar from 'common/core/CorePageRightSidebar'
import CorePageNoSidebar from 'common/core/CorePageNoSidebar'
import ScannerComponent from 'apps/scanner/components/Component'
import ScannerSideBar from 'apps/scanner/components/SideBar'

export default class ScannerPage extends ScannerComponent {
    get mainClassName() {return 'scanner-page'}
    get noSidebar() {return false}
    get leftSidebar() {return true}
    get sidebar() {return <ScannerSideBar params={this.props.params}/>}
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
