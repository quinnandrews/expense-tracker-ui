import React from "react";
import PropTypes from "prop-types";
import FormLabel from "../FormLabel/FormLabel";
import FormGroup from "../FormGroup/FormGroup";
import FormHelpText from "../FormHelpText/FormHelpText";
import Render from "../Render/Render";
import InputGroup from "../InputGroup/InputGroup";

const formGroupPanel = (props) => {
    return (
        <Render if={props.rendered}>
            <FormGroup>
                <FormLabel label={props.label}
                           elementId={props.elementId}
                           elementRequired={props.elementRequired}
                           elementValid={props.elementValid}
                           rendered={props.renderLabel}/>
                <InputGroup>
                    {props.children}
                </InputGroup>
                <FormHelpText helpText={props.helpText}
                              validationFeedback={props.validationFeedback}
                              elementValid={props.elementValid}/>
            </FormGroup>
        </Render>
    );
};

formGroupPanel.propTypes = {
    label: PropTypes.string,
    helpText: PropTypes.string,
    validationFeedback: PropTypes.string,
    elementId: PropTypes.string,
    elementValid: PropTypes.bool,
    elementRequired: PropTypes.bool,
    renderLabel: PropTypes.bool,
    rendered: PropTypes.bool
};

formGroupPanel.defaultProps = {
    required: false,
    renderLabel: true,
    rendered: true
};

export default formGroupPanel;