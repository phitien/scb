import React from 'react'
import CoreButton from '../../../CoreButton'
import FormComponent from './Form'

export default class RegistrationSuccessForm extends FormComponent {
    get formClassName() {return 'registration-success-form'}

    render() {
        return <div className={this.className}>
            <CoreButton className='btn-style-regular btn-got-it' type='button'
                onClick={() => this.modal = null}
                >Ok</CoreButton>
        </div>
    }
}
