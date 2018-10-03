import React from "react";
import PropTypes from "prop-types";
import BasicButton from "./Button";

const mobileActionButton = (props) => {
    return(
        <BasicButton icon={props.icon}
                     label={props.label}
                     clickListener={props.clickListener}
                     disabled={props.disabled}
                     rendered={props.rendered}
                     className="btn-secondary btn-block"
                     iconClassName="pr-1 pl-1"/>
    );
};

mobileActionButton.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    clickListener: PropTypes.func,
    disabled: PropTypes.bool,
    rendered: PropTypes.bool
};

export default mobileActionButton;