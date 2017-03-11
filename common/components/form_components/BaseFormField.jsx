import React from 'react';
import _ from 'lodash';

const formFieldWrapper = (FormField) => {
    class FormFieldWrapper extends React.Component {
        hasError() {
            return _.has(this.props.errors, this.props.fieldName);
        }
        errorMsg() {
            if (this.hasError()) {
                return _.get(this.props.errors, this.props.fieldName);
            }
            return '';
        }

        render() {
            const props = this.props;
            return (
                <FormField
                    {...props}
                    hasError={this.hasError()}
                    error={this.errorMsg()}
                />
            );
        }
    }

    FormFieldWrapper.propTypes = {
        errors: React.PropTypes.object,
        fieldName: React.PropTypes.string
    };

    return FormFieldWrapper;
};

export default formFieldWrapper;
