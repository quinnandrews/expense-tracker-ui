import React from "react";
import PropTypes from "prop-types";
import Render from "../Render/Render";

const stateMessage = (props) => {
    return(
        <Render if={props.rendered}>
            <div className="stateMessage text-uppercase">
                {props.message}
            </div>
        </Render>
    );
};

stateMessage.propTypes = {
    message: PropTypes.string,
    rendered: PropTypes.bool
};

stateMessage.defaultProps = {
    rendered: true
};

export default stateMessage;