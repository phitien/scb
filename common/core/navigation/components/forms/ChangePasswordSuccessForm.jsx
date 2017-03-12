import React from 'react'
import CoreInput from '../../../CoreInput'
import CoreButton from '../../../CoreButton'
import FormComponent from './Form'

export default class ChangePasswordSuccessForm extends FormComponent {
    get formClassName() {return 'change-password-success-form'}

    render() {
        return <div className={this.className}>
            <CoreButton className='btn-style-regular btn-got-it' type='button'
                onClick={() => {
                    this.modal = null
                    this.history.replace(location.pathname.replace('reset-password', ''))
                }}
                >Got it</CoreButton>
        </div>
    }
}
