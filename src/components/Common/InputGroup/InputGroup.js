import React from "react";

const inputGroup = (props) => {
    return (
        <div className="input-group">
            {props.children}
        </div>
    );
};

export default inputGroup;