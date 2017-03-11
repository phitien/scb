import React from 'react'
import {DateRangePicker} from 'react-dates'
import CoreComponent from './CoreComponent'

export default class CoreDateRangePicker extends CoreComponent {
    constructor(props) {
        super(props)
        this.state.isOpen = this.props.isOpen != undefined ? this.props.isOpen : true
        this.state.focusedInput = null
        this.state.startDate = null
        this.state.endDate = null
    }
    get mainClassName() {return `date-range-picker`}
    get isOpen() {return this.state.isOpen}
    onDatesChange = ({ startDate, endDate }) => this.refresh({ startDate, endDate })
    onFocusChange = focusedInput => this.refresh({ focusedInput })
    render() {
        const { focusedInput, startDate, endDate } = this.state
        if (this.isOpen) {
            return (
                <DateRangePicker
                    {...this.props}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                    />
            )
        }
        return null
    }
}
