import React from "react";
import PropTypes from "prop-types";
import Render from "../Render/Render";

const tabPane = (props) => {
    return(
        <Render if={props.rendered}>
            <div className={props.className}
                 id={props.id}
                 role="tabpanel"
                 aria-labelledby={props.controlledById}>
                {props.children}
            </div>
        </Render>
    );
};

tabPane.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    controlledById: PropTypes.string.isRequired,
    rendered: PropTypes.bool
};

tabPane.defaultProps = {
    rendered: true
};

export default tabPane;