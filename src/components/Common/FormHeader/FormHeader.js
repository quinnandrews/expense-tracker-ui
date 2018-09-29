import React from "react";
import PropTypes from "prop-types";
import Render from "../Render/Render";

const formHeader = (props) => {
    return(
        <Render if={props.rendered}>
            <div className="d-md-flex justify-content-between pt-1 pb-3">
                {props.children}
            </div>
        </Render>
    );
};

formHeader.propTypes = {
    rendered: PropTypes.bool
};

formHeader.defaultProps = {
    rendered: true
};

export default formHeader;