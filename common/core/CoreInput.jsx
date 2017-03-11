import React from 'react'
import CoreComponent from './CoreComponent'

export default class CoreInput extends CoreComponent {
    init() {
        this.state.type     = this.props.type ? this.props.type.toLowerCase() : 'text'
        this.state.defaultValue = this.isCheckboxOrRadio ?
                                this.props.checked ? this.props.checked : this.props.defaultChecked :
                                this.props.value ? this.props.value : this.props.defaultValue

    }

    componentDidMount() {
        if (this.isCheckboxOrRadio) {
            if (this.state.defaultValue) this.inputEl.setAttribute('checked', 'checked')
            else this.inputEl.removeAttribute('checked')
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.errorMessage) this.inputEl.focus()
    }

    get mainClassName() {return `input-box input-${this.type} ${this.errorMessage ? 'error' : ''}`}

    get changed() {return this.value != this.defaultValue}
    get value() {return this.isCheckboxOrRadio ? this.inputEl.checked : this.inputEl.value}
    get defaultValue() {return this.state.defaultValue}

    get type() {return this.state.type}
    set type(type) {this.setState({type})}
    get errorMessage() {return this.props.errorMessage}

    get gadget() {return
        this.props.type == 'password' ? <i className={this.type == 'password' ? 'show-password' : 'hide-password'}
            onClick={() => this.type = this.type == 'password' ? 'text' : 'password'}/> : null
    }
    get label() {return this.props.label && this.isCheckboxOrRadio ? <label htmlFor={this.uuid} dangerouslySetInnerHTML={{__html: this.props.label}}/> : null}
    get error() {return !this.props.hideMessage && this.errorMessage ? <label className='error-message'>{this.errorMessage}</label> : null}
    get isCheckboxOrRadio() {return this.isCheckbox || this.isRadio}
    get isCheckbox() {return this.type == 'checkbox'}
    get isRadio() {return this.type == 'radio'}
    get isTextarea() {return this.type == 'textarea'}
    get excludedProps() {return ['type', 'id', 'ref', 'className', 'onClick', 'label', 'errorMessage', 'hideMessage']}
    get input() {
        const props = this.util.props(this.props, this.excludedProps)
        return this.isTextarea ? <textarea {...props} ref={e => this.inputEl = e}
            id={this.uuid}
            /> :
        <input {...props} ref={e => this.inputEl = e}
            id={this.uuid} type={this.type}
            />
    }
    render() {

        return <div className={this.className} onClick={this.props.onClick}>
            {this.input}
            {this.label}
            {this.gadget}
            {this.error}
        </div>
    }
}
