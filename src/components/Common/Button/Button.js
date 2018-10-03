import React from "react";
import PropTypes from "prop-types";
import Render from "../Render/Render";

const button = (props) => {
    return(
        <Render if={props.rendered}>
            <button type="button"
                    value={props.label}
                    className={"btn " + props.className}
                    onClick={props.clickListener}
                    disabled={props.disabled}>
                <Render if={props.icon !== undefined}>
                    <i className={"fa " + props.icon + " " + props.iconClassName}
                       aria-hidden="true"/>
                </Render>
                {props.children}
            </button>
        </Render>
    );
};

button.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    clickListener: PropTypes.func,
    disabled: PropTypes.bool,
    rendered: PropTypes.bool
};

button.defaultProps = {
    disabled: false,
    rendered: true
};

export default button;