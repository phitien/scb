import React from 'react';
import {Input,OverlayTrigger,Button,Popover,InputGroup,FormControl} from 'react-bootstrap';
import Textarea from 'react-textarea-autosize';

class TextAreaWithLabel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formValues: {}
        };

    }

    handleOnBlur() {
        if(this.props.onBlur) {
            this.props.onBlur.bind(this)(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            if (nextProps.value.length > nextProps.limitChar)
                nextProps.value = nextProps.value.substring(0, this.props.limitChar);
        }
    }

    validationState() {
        let length;
        let limitChar;
        if (this.props.value) length = this.props.value.length;
        if (this.props.limitChar) limitChar = this.props.limitChar;
        if (length > limitChar) return 'error';
        else if (length > 0) return 'success';
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
        var defaultValue;

        if (this.props) {
            if (this.props.formComponent) {
                if (this.props.formComponent.label)  label = this.props.formComponent.label;
                if (this.props.formComponent.placeholder) placeholder = this.props.formComponent.placeholder;

            }
            if (this.props.limitChar) limitChar = this.props.limitChar;
            if (this.props.value) {
                value = this.props.value;
                if (this.props.value.length > 0) helpLabelClassName = ' ';
            }
            if (this.props.defaultValue) {
                defaultValue = this.props.defaultValue;
            }
            if (this.props.onChange) onChange = this.props.onChange;
            if (this.props.mandatory != undefined) {
                star = <span className="mandatory-star">*</span>
            }
            if (this.props.mandatory == false) {
                mandatoryLabelClassName = ' ';
                mandatoryStyle = {border: '1px solid #E52737'};
            }
            if (this.props.minimunCharFullfilled == false){
                minimumCharacterNotFullfilledLabelClassName = ' ';
                mandatoryStyle = {border: '1px solid #E52737'};
            }
            if (this.props.validEmail == false) {
                validateEmailClassName = ' ';
                mandatoryStyle = {borderBottom: '1px solid #E52737'};
            }
            if (this.props.minimumCharFullfilled){

            }

            input = (
                        <Textarea  className="form-control" componentClass="textarea" onChange={onChange} style={mandatoryStyle} onBlur={this.handleOnBlur.bind(this)}
                                   bsStyle={this.validationState()} buttonAfter={help} value={value} defaultValue="yes"
                                   placeholder={placeholder}>
                        </Textarea>
                    )
            if (this.props.help) {

                input = (<OverlayTrigger container={this}
                                    trigger="focus"
                                    placement="left"
                                    overlay={<Popover id='popover'>{this.props.help}</Popover>}>

                            {input}

                        </OverlayTrigger>)
            }

        }


        return (
            <div className='col-xs-12'>
                <div className="text-area-with-label col-xs-12">
                    <label className="control-label col-lg-12 col-md-12 col-sm-12 col-xs-12">{label}{star}</label>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        {input}
                    </div>
                </div>
                <label
                    className={"help-label col-lg-12 col-md-12 col-sm-12 col-xs-12 "+helpLabelClassName}>{(limitChar-value.length)+' Characters Left'} </label>
                <label className={"mandatory-label col-lg-12 col-md-12 col-sm-12 col-xs-12 "+validateEmailClassName}>Please
                    Input a Valid Email Address</label>
                <label className={"mandatory-label col-lg-12 col-md-12 col-sm-12 col-xs-12 "+mandatoryLabelClassName}>Mandatory
                    Field</label>
                <label className={"mandatory-label col-lg-12 col-md-12 col-sm-12 col-xs-12 "+minimumCharacterNotFullfilledLabelClassName}>{"Minimum input is "+this.props.minimunChar+" characters"}
                    </label>
            </div>
        );

    }


}
export default TextAreaWithLabel;
