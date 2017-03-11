import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalAction from 'common/actions/ModalAction';

class PopupModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const modalList = this.props.modal.modalList;
        return (
            <div>
                {
                    modalList.map((e, index) => {
                        if (React.isValidElement(e)) {
                            return React.cloneElement(e, {
                                key: index
                            });
                        }
                        return null;
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    modal: state.modal
});

PopupModal = connect(mapStateToProps)(PopupModal);

export default PopupModal;
