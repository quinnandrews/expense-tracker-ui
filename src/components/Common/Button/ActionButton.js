import React from "react";
import PropTypes from "prop-types";
import BasicButton from "./Button";

const actionButton = (props) => {
    return(
        <BasicButton icon={props.icon}
                     label={props.label}
                     clickListener={props.clickListener}
                     disabled={props.disabled}
                     rendered={props.rendered}
                     className="btn-outline-secondary"
                     iconClassName="pr-2 pl-2"/>
    );
};

actionButton.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    clickListener: PropTypes.func,
    disabled: PropTypes.bool,
    rendered: PropTypes.bool
};

export default actionButton;