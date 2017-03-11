import React from 'react'
import CoreComponent from './CoreComponent'

export default class CoreButton extends CoreComponent {

    get mainClassName() {return `btn-style btn-style-default`}
    get disabled() {return this.props.disabled}

    onClick = this.props.onClick ? this.props.onClick : () => {}
    render() {
        let inputProps = this.props
        return (<button
            {...inputProps}
            className={this.className}
            onClick={this.onClick}
        >{this.disabled ? <i className='fa fa-circle-o-notch fa-spin'/> : this.props.children}</button>)
    }
}
