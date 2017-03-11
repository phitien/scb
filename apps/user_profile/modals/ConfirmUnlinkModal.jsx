import React from 'react'
import CoreModal from 'common/core/CoreModal'
import CoreButton from 'common/core/CoreButton'
import UserProfileModal from 'apps/user_profile/modals/Modal'

export default class ConfirmUnlinkModal extends UserProfileModal {
    get subModalClassName() {return `confirm-unlink-modal-dialog`}
    get content() {
        return (
            <div className='modal-content'>
                <h3 className='modal-title'>Unlink {this.props.title}</h3>
                <div className='intro'>
                    Are you sure you want to unlink your Facebook account?<br/>
                    You will be able to link it back anytime.
                </div>
                <div className='actions'>
                    <CoreButton className='btn-style-regular btn-style-hilighted' onClick={this.onClose}>Cancel</CoreButton>
                    <CoreButton className='btn-style-regular' onClick={this.props.onConfirm}>Unlink</CoreButton>
                </div>
                {this.closeButton}
            </div>
        )
    }
}
