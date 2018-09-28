import React from "react";
import PropTypes from "prop-types";
import Render from "../Render/Render";

const button = (props) => {
    return(
        <Render if={props.rendered}>
            <button type="button"
                    className="btn btn-secondary btn-block"
                    onClick={props.clickListener}
                    value={props.label}>
                <Render if={props.icon !== undefined}>
                    <i className={"fa " + props.icon + " pr-1 pl-1"}
                       aria-hidden="true"/>
                </Render>
            </button>
        </Render>
    );
};

button.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    clickListener: PropTypes.func,
    rendered: PropTypes.bool
};

button.defaultProps = {
    rendered: true
};

export default button;