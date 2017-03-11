import React from 'react';
import _ from 'lodash';
import { FormControl } from 'react-bootstrap';

class BaseInputBox extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        // this.onChange = this.onChange.bind(this);
    }

    /* onChange(event) {
     *     const val = event.target.value;
     *     this.props.updateModel(this.props.fieldName, val);
     * }*/

    onBlur(event) {
        const val = event.target.value;
        // console.log(this.props.validateOptions);
        this.props.updateModel(this.props.fieldName, val, this.props.validateOptions);
    }

    render() {
        const props = {
            onBlur: this.onBlur
            // onChange: this.onChange
        };
        _.assign(props, this.props);
        return (
            <FormControl
                type="text"
                {...props}
            />
        );
    }
}

BaseInputBox.propTypes = {
    updateModel: React.PropTypes.func.isRequired,
    defaultValue: React.PropTypes.oneOfType([
        React.PropTypes.number, React.PropTypes.string
    ]),
    fieldName: React.PropTypes.string.isRequired
};


export default BaseInputBox;
