import React from "react";
import PropTypes from "prop-types";
import Render from "../Render/Render";

const tabNav = (props) => {
    return(
        <Render if={props.rendered}>
            <ul className="nav nav-tabs mb-3 pl-4 pr-4"
                role="tablist">
                <div className="tabs-container">
                    {props.children}
                </div>
            </ul>
        </Render>
    );
};

tabNav.propTypes = {
    rendered: PropTypes.bool
};

tabNav.defaultProps = {
    rendered: true
};

export default tabNav;