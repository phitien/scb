import React from 'react';
import { validate } from 'validate.js';
import _ from 'lodash';
import formFieldWrapper from './BaseFormField.jsx';

const unflatten = obj => {
    const unflattened = {};
    _.forOwn(obj, (val, key) => {
        _.set(unflattened, key, val);
    });

    return unflattened;
};

class BaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            model: {}
        };
        this.validationRules = {};
        this.updateModel = this.updateModel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addCustomValidators = this.addCustomValidators.bind(this);
    }
    onSubmit() {
        const isValid = this.validate();

        if (isValid) {
            this.doSubmission();
        }
    }
    getModel() { return this.state.model; }
    doSubmission() {}
    updateModel(fieldName, value, options) {
        const model = this.state.model;
        _.set(model, fieldName, value); // eg. _.set(object, 'a[0].b.c', 4);
        if (this.validate(options)) {
            this.setState({ model, errors: {} });
        }
    }

    validate(options) {
        // console.log(options);
        const errors = unflatten(validate(this.getModel(), this.validationRules, { fullMessages: false } ));
        // console.log('validation errors', errors);
        if (_.isEmpty(errors)) {
            return true;
        }

        this.setState({errors});
        return false;
    }

    addCustomValidators(customValidators) {
        if (customValidators !== undefined) {
            customValidators.forEach(e => {
                const name = e.name;
                const method = e.method;
                validate.validators[name] = method;
            })
        }
    }

    field(component, props) {
        const _props = props;
        _props.updateModel = this.updateModel;
        _props.errors = this.state.errors;
        this.addCustomValidators(_props.customValidators);
        const _comp = formFieldWrapper(component);
        // console.log('component is :', _comp);
        return React.createElement(
            _comp,
            _props
        );
    }
}

export default BaseForm;
