import React from 'react'
import NavigationBaseComponent from 'apps/navigation/components/Component'

export default class CopyRightComponent extends NavigationBaseComponent {
    get mainClassName() {return 'copyright'}

    render() {
        return <div className={this.className}>
            © Standard Chartered {new Date().getFullYear()}
        </div>
    }
}
