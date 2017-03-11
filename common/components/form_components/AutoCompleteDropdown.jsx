import React from 'react';
import {Input, label, DropdownButton, MenuItem} from 'react-bootstrap';
import Combobox from 'react-widgets/lib/Combobox.js';
import Multiselect from 'react-widgets/lib/Multiselect';
import _ from 'lodash';

class MultiSelectDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formValues: {},
            mandatoryStyle: {}
        };
        // console.log('*********************************' + this.props.textField);
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.value && nextProps.value.length > 10)
        //     nextProps.value = nextProps.value.slice(0,9)
    }

    handleOnBlur() {
        this.errorRender(this.props.onBlur(this.props.value));
    }

    onChange(value) {
        //this.openMultiSelectDropdown();
        const limit = 10;
        if (value && value.length>limit ) {
            value = value.slice(0,limit)
        }
        this.props.onChange(value);
    }

    // validateInteger() {
    //     const re = /^[0-9]{1,45}$/;
    //     if (typeof this.props.value === 'undefined') {
    //         this.state.validInt = false;
    //     } else {
    //         if (this.props.value.length === 0) {
    //             this.state.validInt = false;
    //         } else {
    //             for (let i = 0; i < this.props.value.length; i++) {
    //                 this.state.validInt = (re.test(this.props.value[i]));
    //             }
    //         }
    //     }
    //
    //     if (!this.state.validInt) {
    //         this.errorRender('Please choose a valid location');
    //     } else {
    //         this.errorRender();
    //     }
    // }

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

    openMultiSelectDropdown(){
        //this.setState({open: this.state.open? false:true});
    }

    render() {
        var label = '';
        var placeholder = '';
        var mandatory;
        var onChange;
        var value;
        var multiple;
        var star;
        var mandatoryLabelClassName = ' hidden';
        var list = [];
        let id = '';
        if (this.props) {
            if (this.props.formComponent) {
                if (this.props.formComponent.label)
                    label = this.props.formComponent.label;
                if (this.props.formComponent.placeholder)
                    placeholder = this.props.formComponent.placeholder;
                if (this.props.formComponent.id)
                    id = this.props.formComponent.id;
                }
            if (this.props.onChange)
                onChange = this.props.onChange;
            if (!_.isEmpty(this.props.value) || (this.props.value && this.props.value.constructor === Array)){
                value = this.props.value;
            }else{
                value = "";
            }
            if (this.props.multiple)
                multiple = this.props.multiple;
            if (this.props.mandatory != undefined) {
                star = <span className="mandatory-star">*</span>
            }
            if (this.props.mandatory == false) {
                mandatoryLabelClassName = ' ';
                mandatoryStyle = ' mandatory';
            }
            if (this.props.runValidation) {
                this.validateInteger();
            }
        }
        switch (multiple) {
            case true:
                // console.log('************************************' + this.props.textField);
                return (
                    <div className={this.props.customized
                        ? ''
                        : 'col-xs-12 padding-bottom'}>
                        <div className={this.props.customized
                            ? 'search-dropdown multi'
                            : "search-dropdown multi col-xs-12"}>
                            {this.props.customized
                                ? (<div/>)
                                : (
                                    <label className="control-label col-xs-12 col-sm-12 col-md-12 col-lg-12">{label}{star}</label>
                                )
}
                            <div className={this.props.customized
                                ? ''
                                : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                                <Multiselect valueField={this.props.valueField
                                    ? this.props.valueField
                                    : "value"} textField={this.props.textField
                                    ? this.props.textField
                                    : 'display_name'} value={value} onChange={this.onChange.bind(this)} data={this.props.source} caseSensitive={false} minLength={1} style={this.state.mandatoryStyle} filter='contains' onBlur={this.handleOnBlur.bind(this)} id={id}>
                                </Multiselect>
                                <i className="rw-i rw-i-caret-down" onClick={this.openMultiSelectDropdown.bind(this)}/>
                            </div>
                        </div>
                        {this.state.emailLabel}
                        {this.props.customized
                            ? (<div/>)
                            : (<label className={"mandatory-label col-lg-12 col-md-12 col-sm-12 col-xs-12 " + mandatoryLabelClassName}>Mandatory Field</label>)}
                    </div>
                );
                break;
            default:
                // console.log('************************************' + this.props.textField);
                return (
                    <div className={this.props.customized
                        ? ''
                        : 'col-xs-12 padding-bottom'}>
                        <div className={this.props.customized
                            ? 'search-dropdown'
                            : "search-dropdown col-xs-12"}>
                            {this.props.customized
                                ? (<div/>)
                                : (<label className="control-label col-xs-12 col-sm-12 col-md-12 col-lg-12">{label}{star}</label>)}
                            <div className={this.props.customized
                                ? ''
                                : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                                <Combobox valueField={this.props.valueField
                                    ? this.props.valueField
                                    : "value"} textField={this.props.textField
                                    ? this.props.textField
                                    : 'display_name'} value={value} onChange={onChange} data={this.props.source} caseSensitive={false} minLength={1} style={this.state.mandatoryStyle} filter='contains' onBlur={this.handleOnBlur.bind(this)} id={id}/>
                            </div>
                        </div>
                        {this.state.emailLabel}
                        {this.props.customized
                            ? (<div/>)
                            : (<label className={"mandatory-label col-lg-12 col-md-12 col-sm-12 col-xs-12 " + mandatoryLabelClassName}>Mandatory Field</label>)}
                    </div>
                );
                break;
        }
    }
}

export default MultiSelectDropdown;
