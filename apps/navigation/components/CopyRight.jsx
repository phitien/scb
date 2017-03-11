import React from 'react'
import NavigationBaseComponent from 'apps/navigation/components/Component'

export default class CopyRightComponent extends NavigationBaseComponent {
    get mainClassName() {return 'copyright'}

    render() {
        return <div className={this.className}>
            © {new Date().getFullYear()} Asia Finance. All Rights Reserved
        </div>
    }
}
