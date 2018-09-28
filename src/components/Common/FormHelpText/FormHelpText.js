import React from "react";
import Render from "../Render/Render";
import PropTypes from "prop-types";

const formHelpText = (props) => {
    return(
        <Render if={props.rendered}>
            <Render if={props.helpText !== null && props.elementValid === true}>
                <small className="form-text text-muted">
                    {props.helpText}
                </small>
            </Render>
            <Render if={props.elementValid === false}>
                <small className="invalid-feedback">
                        {props.validationFeedback}
                </small>
            </Render>
        </Render>
    );
};

formHelpText.propTypes = {
    helpText: PropTypes.string,
    validationFeedback: PropTypes.string,
    elementValid: PropTypes.bool,
    rendered: PropTypes.bool
};

formHelpText.defaultProps = {
    rendered: true
};

export default formHelpText;