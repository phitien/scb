import React from 'react';
import { Button } from 'react-bootstrap';

class ActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            btn: this.props.msg,
            style: this.props.style
        };
        this.onClickedCallback = this.onClickedCallback.bind(this);
    }

    onClickedCallback() {
        if (this.state.disabled) {
            return;
        }
        this.props.onClick();
        this.deactivateBtn();
    }
    deactivateBtn() {
        this.setState({ disabled: true, btn: this.props.loadingMsg });
    }
    activateBtn() {
        this.setState({ disabled: false, btn: this.props.msg });
    }
    render() {
        return (
            <Button
                type="submit"
                className="btn red-button"
                disabled={this.state.disabled}
                onClick={this.onClickedCallback.bind(this)}
                style={this.state.style}
            >
                {this.state.btn}
            </Button>
        );
    }
}

ActionButton.propTypes = {
    onClick: React.PropTypes.func,
    loadingMsg: React.PropTypes.string,
    msg: React.PropTypes.string
};
ActionButton.defaultProps = {
    loadingMsg: 'Saving',
    msg: 'Save'
};

export default ActionButton;
