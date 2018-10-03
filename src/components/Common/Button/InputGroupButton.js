import React from "react";
import PropTypes from "prop-types";
import BasicButton from "./Button";

const inputGroupButton = (props) => {
    return(
        <div className={"input-group-" + props.position}>
            <BasicButton icon={props.icon}
                         label={props.label}
                         clickListener={props.clickListener}
                         disabled={props.disabled}
                         rendered={props.rendered}
                         className="btn-light input-group-text"/>
        </div>
    );
};

inputGroupButton.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    clickListener: PropTypes.func,
    position: PropTypes.oneOf(["append", "prepend"]),
    disabled: PropTypes.bool,
    rendered: PropTypes.bool
};

inputGroupButton.defaultProps = {
    position: "append"
};

export default inputGroupButton;

/*
<div className="input-group-append">
    <button className="btn btn-light input-group-text"
            type="button"
            disabled={this.isFormDisabled()}
            onClick={this.createCategory}>
        <i className="fa fa-plus" aria-hidden="true"/>
    </button>
</div>
 */