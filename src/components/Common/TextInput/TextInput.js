import React from "react";
import PropTypes from "prop-types";
import Converter from "../../../converters/Converter";
import Validator from "../../../validators/Validator";
import FormElement from "../FormElement/FormElement";
import FormLabel from "../FormLabel/FormLabel";
import FormGroup from "../FormGroup/FormGroup";
import FormHelpText from "../FormHelpText/FormHelpText";
import Render from "../Render/Render";

class TextInput extends FormElement {

    render() {
        return (
            <Render if={this.props.rendered}>
                <FormGroup>
                    <FormLabel label={this.props.label}
                               elementId={this.props.id}
                               elementRequired={this.props.required}
                               elementValid={this.isValid()}
                               rendered={this.props.renderLabel}/>
                    <input type="text"
                           className={this.getClassName()}
                           id={this.props.id}
                           name={this.props.id}
                           value={this.props.value}
                           placeholder={this.props.placeholder}
                           required={this.props.required}
                           maxLength={this.props.maxLength}
                           disabled={this.props.disabled}
                           onChange={this.valueChangeHandler}/>
                    <FormHelpText helpText={this.props.helpText}
                                  validationFeedback={this.getValidationFeedback()}
                                  elementValid={this.isValid()}/>
                </FormGroup>
            </Render>
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
    maxlength: PropTypes.number,
    disabled: PropTypes.bool,
    converter: PropTypes.instanceOf(Converter),
    validator: PropTypes.instanceOf(Validator),
    converters: PropTypes.arrayOf(Converter),
    validators: PropTypes.arrayOf(Validator),
    valueChangeHandler: PropTypes.func,
    renderLabel: PropTypes.bool,
    rendered: PropTypes.bool
};

TextInput.defaultProps = {
    required: false,
    renderLabel: true,
    rendered: true
};

export default TextInput;