import React from 'react'
import Modal from 'react-modal'
import CoreComponent from './CoreComponent'

export default class CoreModal extends CoreComponent {
    constructor(props) {
        super(props)
        this.state.isValid = this.props.isValid != undefined ? this.props.isValid : true
        this.state.isOpen = this.props.isOpen != undefined ? this.props.isOpen : true
    }
    get mainClassName() {return `Modal__Bootstrap modal-dialog ${this.modalClassName}`}
    get modalClassName() {return ''}
    get isValid() {return this.state.isValid}
    get isOpen() {return this.state.isOpen}
    get closeTimeoutMS() {return 300}
    get shouldCloseOnOverlayClick() {return true}
    get message() {return null}
    get content() {return (<div className='modal-content'>
        {this.header}
        {this.body}
        {this.footer}
    </div>)}
    get header() {return null}
    get body() {return null}
    get footer() {return null}
    onClose = () => this.setState({isOpen: false}, this.onAfterClose)
    onAfterClose = () => {this.modal = null}
    render() {
        if (this.isValid) {
            return (
                <Modal
                    className={this.className}
                    isOpen={this.isOpen}
                    shouldCloseOnOverlayClick={this.shouldCloseOnOverlayClick}
                    closeTimeoutMS={this.closeTimeoutMS}
                    onRequestClose={this.onClose}
                    contentLabel=''
                >
                    {this.message}
                    {this.content}
                </Modal>
            )
        }
        return null
    }
}
