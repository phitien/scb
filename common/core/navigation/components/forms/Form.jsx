import React from 'react'
import NavigationBaseComponent from '../Component'

export default class FormComponent extends NavigationBaseComponent {
    get mainClassName() {return `auth-form ${this.formClassName} ${this.state.formError ? 'error' : ''}`}
    get disabled() {return this.state.disabled}
    set disabled(v) {this.setState({disabled: v})}
}
