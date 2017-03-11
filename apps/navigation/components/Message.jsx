import React from 'react'
import NavigationBaseComponent from 'apps/navigation/components/Component'

export default class MessageComponent extends NavigationBaseComponent {
    get mainClassName() {return 'global-message'}
    onClose = () => {this.globalMessage = null}
    render = () => this.store.globalMessage ? <div className={this.className}>
        {this.store.globalMessage}
        <i className='global-message-close' onClick={this.onClose}></i>
    </div> : null
}
