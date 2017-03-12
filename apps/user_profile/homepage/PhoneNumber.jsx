import React from 'react'
import Select from 'react-select'
import CoreInput from '../../../common/core/CoreInput'
import UserProfileComponent from '../components/Component'

export default class PhoneNumberComponent extends UserProfileComponent {
    get changed() {return this.phoneNumberInput.changed
        || this.countryCodeInput.value != this.state.mobileNumber.countryCode}
    get value() {return {
        country_code: this.state.countryCode,
        number: this.state.number
    }}
    validate = () => this.validateFieldNotEmpty('phoneNumberInput', 'Please enter a mobile number.')
        ? this.removeError() : false
    get selectedCountryOption() {
        const matched = this.countryList.filter(e => e.value == this.state.countryCode)
        return matched ? matched[0] : null
    }
    init() {
        let mobileNumber = this.util.isEmpty(this.authStore.getUserInfoProp('mobileNumber')) ?
            {countryCode: 65, number: ''} : this.authStore.getUserInfoProp('mobileNumber')
        this.state.mobileNumber = mobileNumber
        this.state.countryCode = mobileNumber.countryCode
        this.state.number = mobileNumber.number
    }
    get countryList() {return []}

    renderValue = option => {
        return <div className='country-code-display'>
            <span className='country-flag'>{option.flag}</span>
            <span className='country-code'>{`(+${this.util.numberOf(option.value)})`}</span>
        </div>
    }
    renderOption = option => <div className='country-code-display'>
        <span className='country-flag'>{option.flag} </span>
        <span className='country-code'>{`${option.label} (+${this.util.numberOf(option.value)})`}</span>
    </div>

    render() {
        return <div className='field-phone-number'>
            <div className='field-label field-label-phone'>Contact number</div>
            <div className='phone'>
                <Select clearable={false} className='country-list'
                    ref={e => this.countryCodeInput = e}
                    onChange={e => this.state.countryCode = e.value}
                    options={this.countryList}
                    value={this.selectedCountryOption}
                    valueRenderer={this.renderValue}
                    optionRenderer={this.renderOption}/>
                <CoreInput className='phone-number' type='number' placeholder='Number'
                    defaultValue={this.state.number}
                    onChange={e => this.state.number = e.target.value}
                    ref={e => this.phoneNumberInput = e} hideMessage={true}
                    errorMessage={this.state.errorField == 'phoneNumberInput' ? this.state.message : null}/>
            </div>
            {(this.state.errorField == 'countryCodeInput' || this.state.errorField == 'phoneNumberInput') ?
            <label className='field-error'>{this.state.message}</label> : null}
        </div>
    }
}
