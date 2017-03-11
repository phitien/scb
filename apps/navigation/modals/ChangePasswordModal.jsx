import React from 'react'
import CoreModal from 'common/core/CoreModal'
import CoreButton from 'common/core/CoreButton'
import CoreInput from 'common/core/CoreInput'
import NavigationModal from 'apps/navigation/modals/Modal'
import ChangePasswordForm from 'apps/navigation/components/forms/ChangePasswordForm'

export default class ChangePasswordModal extends NavigationModal {
    get subModalClassName() {return `change-password-modal-dialog`}
    get content() {
        return <div className='modal-content'>
            <h3 className='modal-title'>Change Password</h3>
            <ChangePasswordForm/>
            {this.closeButton}
        </div>
    }
}
