import React from 'react'
import CoreModal from 'common/core/CoreModal'
import CoreButton from 'common/core/CoreButton'
import UserProfileModal from 'apps/user_profile/modals/Modal'

export default class SaveAccreditionConfirmModal extends UserProfileModal {
    get subModalClassName() {return `save-accredition-confirm-modal-dialog`}
    onConfirm = () => {
        this.props.onConfirm(this.props.value)
        this.onClose()
    }
    get content() {
        return (
            <div className='modal-content'>
                <h3 className='modal-title'>Are you sure you want to proceed?</h3>
                <div className='intro'>
                    You have to choose your investor status and agree on our terms and conditions in order to be qualified as an investor.<br/>
                    Missing required fields would result in failure of verification.<br/>
                    Do you still wish to proceed?
                </div>
                <div className='actions'>
                    <CoreButton className='btn-style-regular btn-style-hilighted' onClick={this.onClose}>Cancel</CoreButton>
                    <CoreButton className='btn-style-regular' onClick={this.onConfirm}>Process</CoreButton>
                </div>
                {this.closeButton}
            </div>
        )
    }
}
