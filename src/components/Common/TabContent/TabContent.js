import React from "react";
import PropTypes from "prop-types";
import Render from "../Render/Render";

const tabContent = (props) => {
    return(
        <Render if={props.rendered}>
            <div className="tab-content pl-4 pr-4">
                {props.children}
            </div>
        </Render>
    );
};

tabContent.propTypes = {
    rendered: PropTypes.bool
};

tabContent.defaultProps = {
    rendered: true
};

export default tabContent;