import React from 'react'
import CoreComponent from './CoreComponent'
import HeaderComponent from './navigation/Header'
import FooterComponent from './navigation/Footer'
import CoreErrorModal from './CoreErrorModal'

export default class CoreViewport extends CoreComponent {
    get header() {return <HeaderComponent/>}
    get footer() {return <FooterComponent/>}
    get mainClassName() {return 'viewport'}
    componentDidMount() {
        this.store.addChangeListener(this.refresh)
        this.navigationStore.addChangeListener(this.refresh)
    }
    componentWillUnmount() {
        this.store.removeChangeListener(this.refresh)
        this.navigationStore.removeChangeListener(this.refresh)
    }
    get viewportClassName() {return ''}
    get viewportBody() {return (<div key={1} className={this.className}>{this.props.children}</div>)}
    render() {
        return (<div className={`page container-fluid ${this.viewportClassName}`}>
            {this.header}
            {this.viewportBody}
            {this.footer}
        </div>)
    }
}
