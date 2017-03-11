import React from 'react';
import {
    // Input,
    OverlayTrigger,
    // Button,
    Popover,
    InputGroup,
    FormControl
} from 'react-bootstrap';

class TextAreaWithLabel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formValues: {}
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.value) {
        //     if (nextProps.value.length > nextProps.limitChar)
        //         nextProps.value = nextProps.value.substring(0, this.props.limitChar);
        // }
    }

    handleOnBlur() {
        if (this.props.onBlur) {
            this.props.onBlur(this.props);
        }
    }

    validationState() {
        let length;
        let limitChar;
        if (this.props.value) length = this.props.value.length;
        if (this.props.limitChar) limitChar = this.props.limitChar;
        if (length > limitChar) {
            return 'error';
        } else if (length > 0) {
            return 'success';
        }
    }

    onChange(e) {
        const value = e.target.value;
        const _e = e;
        if (value.length > this.props.limitChar) {
            _e.target.value = value.substr(0, this.props.limitChar);
                this.errorRender('This field cannot exceed '+ this.props.limitChar + ' characters');
        } else {
            this.errorRender();
        }
        this.props.onChange(_e);
    }

    errorRender(errorMsg) {
        let newState = {};
        if (errorMsg) {
            newState.emailLabel = (
                <label className={"mandatory-label col-lg-12 col-md-12 col-sm-12 col-xs-12"}>{errorMsg}</label>
            )
            newState.mandatoryStyle = {
                border: '1px solid #E52737'
            }
        } else {
            newState.emailLabel = null;
            newState.mandatoryStyle = {};
        }
        this.setState(newState);
    }

    render() {
        var label = '';
        var placeholder = '';
        var value = '';
        var mandatory;
        var onChange;
        var limitChar;
        var helpLabelClassName = 'hidden';
        var mandatoryLabelClassName = 'hidden';
        var validateEmailClassName = 'hidden';
        var minimumCharacterNotFullfilledLabelClassName = 'hidden';
        var mandatoryStyle = {};
        var star;
        var help;
        var input;
        let id;
        let helpText = '';
        // console.log('rerender');
        // console.log(this.props.value);
        if (this.props) {
            if (this.props.formComponent) {
                if (this.props.formComponent.label) label = this.props.formComponent.label;
                if (this.props.formComponent.placeholder) placeholder = this.props.formComponent.placeholder;
                if (this.props.formComponent.id) id = this.props.formComponent.id;
            }
            if (this.props.limitChar) limitChar = this.props.limitChar;
            if (this.props.value) {
                value = this.props.value;
                if (value.length > 0) {
                    helpText = (limitChar - value.length) + ' Characters Left';
                    helpLabelClassName = ' ';
                }
            }
            if (this.props.onChange) onChange = this.props.onChange;
            if (this.props.mandatory !== undefined) {
                star = <span className="mandatory-star">*</span>;
            }
            if (this.props.mandatory === false) {
                mandatoryLabelClassName = ' ';
                mandatoryStyle = {
                    border: '1px solid #E52737'
                };
            }
            if (this.props.minimunCharFullfilled === false) {
                minimumCharacterNotFullfilledLabelClassName = ' ';
                mandatoryStyle = {
                    border: '1px solid #E52737'
                };
            }
            if (this.props.validEmail === false) {
                validateEmailClassName = ' ';
                mandatoryStyle = {
                    borderBottom: '1px solid #E52737'
                };
            }
            if (this.props.minimumCharFullfilled) {}
            input = (
                <InputGroup className="col-xs-12">
                    <FormControl componentClass="textarea" onChange={this.onChange} style={mandatoryStyle} onBlur={this.handleOnBlur.bind(this)} bsStyle={this.validationState()} buttonAfter={help} placeholder={placeholder} value={value} id={id}></FormControl>
                </InputGroup>
            );
            if (this.props.help) {
                input = (
                    <OverlayTrigger container={this} trigger="focus" placement="left" overlay={<Popover id='popover'> {
                        this.props.help
                    } </Popover>}>

                        {input}

                    </OverlayTrigger>
                );
            }
            if (this.props.runValidation) {
                this.validateEmail();
            }
        }

        return (
            <div className='col-xs-12 padding-bottom'>
                <div className="text-area-with-label col-xs-12">
                    <label className="control-label col-lg-12 col-md-12 col-sm-12 col-xs-12">{label}{star}</label>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        {input}
                    </div>
                </div>
                <label className={"help-label col-lg-12 col-md-12 col-sm-12 col-xs-12 " + helpLabelClassName}>{(limitChar - value.length) + ' Characters Left'}
                </label>
                <label className={"mandatory-label col-lg-12 col-md-12 col-sm-12 col-xs-12 " + validateEmailClassName}>Please Input a Valid Email Address</label>
                <label className={"mandatory-label col-lg-12 col-md-12 col-sm-12 col-xs-12 " + mandatoryLabelClassName}>Mandatory Field</label>
                <label className={"mandatory-label col-lg-12 col-md-12 col-sm-12 col-xs-12 " + minimumCharacterNotFullfilledLabelClassName}>{"Minimum input is " + this.props.minimunChar + " characters"}
                </label>
            </div>
        );
    }
}
export default TextAreaWithLabel;
