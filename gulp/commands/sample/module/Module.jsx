import React from 'react'
import NewModuleBaseComponent from 'apps/new_module/Component'

export default class NewModuleComponent extends NewModuleBaseComponent {
    get mainClassName() {return 'new-module-container'}

    componentDidMount() {
        this.store.addChangeListener(this.refresh)
        this.service.fetch()
    }

    componentWillUnmount() {
        this.store.removeChangeListener(this.refresh)
    }

    render() {
        return(
            <div className={this.className}>
                Hello, this is 'NewModule'
            </div>
        )
    }
}
