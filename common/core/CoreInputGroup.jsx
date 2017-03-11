import React from 'react'
import CoreComponent from './CoreComponent'
import CoreInput from './CoreInput'

export default class CoreInputGroup extends CoreComponent {
    get mainClassName() {return `input-group`}
    init() {
        this.state.multi = this.props.multi
        this.state.value = this.props.value ? this.props.value : this.multi ? [] : null
    }
    get value() {return this.state.value}
    get changed() {return this.state.value != this.props.value}
    get type() {return this.props.type && this.props.type == 'checkbox' ? 'checkbox' : 'radio'}
    get multi() {return this.state.multi}
    get items() {return this.props.items}
    onItemClick = item => e => {
        if (this.multi) {
            const idx = this.value.indexOf(item.value)
            if (idx >= 0) this.value.splice(idx, 1)
            else this.value.push(item.value)
            this.setState({value: this.value})
        }
        else this.setState({value: item.value})
    }
    isChecked = item => this.multi ? this.value.indexOf(item.value) >= 0 : this.value == item.value
    render() {
        return <div className={this.className}>
            {this.items.map((item,i) => <CoreInput key={i}
                type={this.type} label={item.label}
                className={this.value == item.value ? 'checked' : ''}
                defaultChecked={this.isChecked(item)}
                onClick={this.onItemClick(item)}/>)}
        </div>
    }
}
