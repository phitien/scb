import React from 'react'
import CoreModal from './CoreModal'

export default class CoreErrorModal extends CoreModal {
    get modalClassName() {return 'error-modal'}
    get error() {return this.props.error}
    get isValid() {
        console.log(this.error)
        let valid = this.error && this.error.show ? true : false
        if (!valid && this.error) console.log(`${this.error.title}: ${this.error.description}`)
        return valid}
    onAfterClose = () => {if (this.props.onClose) this.props.onClose()}
    get title() {
        if (!this.error.title) return null
        return <h3>{this.error.title}</h3>
    }
    get description() {
        if (!this.error.description) return null
        if (this.error.description) return <span className='error-text'>{this.error.description}</span>
    }
    get content() {
        return (
            <div className='modal-content'>
                {this.title}
                {this.description}
                <div className='actions'>
                    <button className='btn btn-gold' onClick = {this.onClose}>GOT IT</button>
                </div>
            </div>
        )
    }
}
