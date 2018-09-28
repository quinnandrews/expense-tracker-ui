import React from "react";
import PropTypes from "prop-types";
import Render from "../Render/Render";

const buttonGroup = (props) => {
    return(
        <Render if={props.rendered}>
            <div className={"btn-group" + (props.className !== undefined ? ' ' + props.className : '')}
                 role="group">
                {props.children}
            </div>
        </Render>
    );
};

buttonGroup.propTypes = {
    className: PropTypes.string,
    rendered: PropTypes.bool
};

buttonGroup.defaultProps = {
    rendered: true
};

export default buttonGroup;