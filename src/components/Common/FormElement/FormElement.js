import {Component} from "react";
import PropTypes from "prop-types";
import Converter from "../../../converters/Converter";
import Validator from "../../../validators/Validator";
import RequiredValidator from "../../../validators/RequiredValidator";

class FormElement extends Component {

    validators = [];
    converters = [];

    constructor(props) {
        super(props);
        this.state = {
            valid: true,
            validationFeedback: ''
        };
        if (this.props.required) {
            this.addValidator(new RequiredValidator());
        }
        this.addConverter(this.props.converter);
        this.addValidator(this.props.validator);
        this.addConverters(this.props.converters);
        this.addValidators(this.props.validators);
    }

    isValid() {
        return this.state.valid;
    }

    setValid(valid) {
        this.setState({valid: valid});
    }

    getValidationFeedback() {
        return this.state.validationFeedback;
    }

    setValidationFeedback(feedback) {
        this.setState({validationFeedback: feedback});
    }

    getClassName() {
        return "form-control" + (this.state.valid ? '' : ' is-invalid');
    }

    addConverter(converter) {
        if (converter !== undefined) {
            this.converters.push(converter);
        }
    }

    addConverters(converters) {
        if (converters !== undefined) {
            for (const c of converters) {
                this.addConverter(c);
            }
        }
    }

    addValidator(validator) {
        if (validator !== undefined) {
            this.validators.push(validator);
        }
    }

    addValidators(validators) {
        if (validators !== undefined) {
            for (const v of validators) {
                this.addValidator(v);
            }
        }
    }

    convert(event) {
        let value = event.target.value;
        for (const c of this.converters) {
            value = c.convert(value)
        }
        event.target.value = value;
    }

    validate(event) {
        let value = this.props.value;
        if (event !== undefined) {
            value = event.target.value;
        }
        let valid = true;
        for (const v of this.validators) {
            if (!v.validate(value)) {
                valid = false;
                this.setValidationFeedback(v.getMessage(this.props.label));
                break;
            }
        }
        console.log("valid: " + valid);
        this.setValid(valid);
        return valid;
    }

    valueChangeHandler = (event) => {
        this.convert(event);
        this.validate(event);
        this.props.valueChangeHandler(event);
    };

}

FormElement.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    helpText: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    converter: PropTypes.instanceOf(Converter),
    validator: PropTypes.instanceOf(Validator),
    converters: PropTypes.arrayOf(Converter),
    validators: PropTypes.arrayOf(Validator),
    valueChangeHandler: PropTypes.func
};

FormElement.defaultProps = {
    required: false,
};

export default FormElement;