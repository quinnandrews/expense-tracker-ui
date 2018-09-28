import React from "react";

const formGroup = (props) => {
    return (
        <div className="form-group">
            {props.children}
        </div>
    );
};

export default formGroup;