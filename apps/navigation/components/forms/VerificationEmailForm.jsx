import React from 'react'
import FormComponent from 'apps/navigation/components/forms/Form'
import CoreButton from 'common/core/CoreButton'

export default class VerificationEmailForm extends FormComponent {
    get formClassName() {return 'verification-email-form'}
    get user() {return this.props.user}
    get email() {return this.user.email}
    get gotItButton() {
        return <CoreButton className='btn-style-regular btn-style-hilighted btn-got-it' type='button' onClick={e => this.modal = null}>
            {(this.user.email.match(/.+@gmail\.com/g) || this.user.email.match(/.+@yahoo\.com/g) || this.user.email.match(/.+@hotmail\.com/g))
                ? 'Later' : 'Ok'}
            </CoreButton>
    }
    get goToEmailButton() {
        if (this.user.email.match(/.+@gmail\.com/g))
            return <CoreButton className='btn-style-regular btn-got-it' type='button'
                onClick={this.openMailWebsite('//mail.google.com')}
                >Go to Gmail</CoreButton>
        if (this.user.email.match(/.+@yahoo\.com/g))
            return <CoreButton className='btn-style-regular btn-got-it' type='button'
                onClick={this.openMailWebsite('//mail.yahoo.com')}
                >Go to Yahoo Mail</CoreButton>
        if (this.user.email.match(/.+@hotmail\.com/g))
            return <CoreButton className='btn-style-regular btn-got-it' type='button'
                onClick={this.openMailWebsite('//www.hotmail.com')}
                >Go to Hot Mail</CoreButton>
    }

    openMailWebsite = url => () => {
        this.modal = null
        this.util.openNewTab(url)
    }
    resendEmail = () => {
        this.authService.resendEmail(this.email)
        .then(res => this.modalMessage = <div className='info'>An activation email was resent to your inbox.</div>)
        .catch(res => this.modalMessage = <div className='error'>Something went wrong. Please try later.</div>)
    }
    render() {
        return <div className={this.className}>
            <div className='actions'>
                {this.gotItButton}
                {this.goToEmailButton}
            </div>
            <div>
                Can’t find the email? <a onClick={this.resendEmail}>Send again</a>
            </div>
        </div>
    }
}
