import React, {Component} from "react";
import PropTypes from "prop-types";
import Converter from "../../../converters/Converter";
import Validator from "../../../validators/Validator";
import FormGroupPanel from "../FormGroupPanel/FormGroupPanel";
import formElement from "../FormElement/FormElementHOC";

class TextInput extends Component {

    render() {
        return (
            <FormGroupPanel label={this.props.label}
                            helpText={this.props.helpText}
                            validationFeedback={this.props.validationFeedback}
                            elementId={this.props.id}
                            elementValid={this.props.isValid}
                            elementRequired={this.props.required}
                            renderLabel={this.props.renderLabel}
                            rendered={this.props.rendered}>
                {this.props.prependix}
                <input type="text"
                       className={this.props.className}
                       id={this.props.id}
                       name={this.props.id}
                       value={this.props.value}
                       placeholder={this.props.placeholder}
                       required={this.props.required}
                       maxLength={this.props.maxLength}
                       disabled={this.props.disabled}
                       onChange={(event) => this.props.valueChangeHandler(event)}/>
                {this.props.appendix}
            </FormGroupPanel>
        );
    }

}

TextInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    helpText: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    prependix: PropTypes.any,
    appendix: PropTypes.any,
    converter: PropTypes.instanceOf(Converter),
    validator: PropTypes.instanceOf(Validator),
    converters: PropTypes.arrayOf(Converter),
    validators: PropTypes.arrayOf(Validator),
    valueChangeHandler: PropTypes.func,
    isValid: PropTypes.bool,
    validationFeedback: PropTypes.string,
    className: PropTypes.string,
    renderLabel: PropTypes.bool,
    rendered: PropTypes.bool
};

TextInput.defaultProps = {
    required: false,
    renderLabel: true,
    rendered: true
};

export default formElement(TextInput);