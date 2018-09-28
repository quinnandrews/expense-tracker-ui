import React from "react";
import PropTypes from "prop-types";
import Render from "../Render/Render";

const formLabel = (props) => {
    return(
        <Render if={props.rendered}>
            <label className={(props.elementValid ? '' : ' is-invalid')}
                   htmlFor={props.elementId}>
                {props.label + (props.elementRequired ? ' *' : '')}
            </label>
        </Render>
    );
};

formLabel.propTypes = {
    label: PropTypes.string,
    elementId: PropTypes.string,
    elementRequired: PropTypes.bool,
    elementValid: PropTypes.bool,
    rendered: PropTypes.bool
};

formLabel.defaultProps = {
    rendered: true
};

export default formLabel;