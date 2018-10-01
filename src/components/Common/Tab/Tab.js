import React from "react";
import PropTypes from "prop-types";
import Render from "../Render/Render";

const tab = (props) => {
    return(
        <Render if={props.rendered}>
            <li className="nav-item">
                <a className={props.className}
                   id={props.id}
                   data-toggle="tab"
                   href=""
                   role="tab"
                   aria-controls={props.controlsId}
                   onClick={props.clickListener}>{props.label}</a>
            </li>
        </Render>
    );
};

/* label should be required but produces a warning */
tab.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string.isRequired,
    controlsId: PropTypes.string.isRequired,
    clickListener: PropTypes.func.isRequired,
    rendered: PropTypes.bool
};

tab.defaultProps = {
    rendered: true
};

export default tab;