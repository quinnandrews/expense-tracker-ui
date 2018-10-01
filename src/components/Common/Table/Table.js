import React from "react";
import PropTypes from "prop-types";
import Render from "../Render/Render";

const table = (props) => {
    return(
        <Render if={props.rendered}>
            <table className="table table-light table-striped table-hover">
                <thead>
                <tr>
                    {
                        props.columnLabels.map((columnLabel, index) => {
                            return (
                                <th key={index} scope="col">{columnLabel}</th>
                            );
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {props.children}
                </tbody>
            </table>
        </Render>
    );
};

table.propTypes = {
    columnLabels: PropTypes.array,
    rendered: PropTypes.bool
};

table.defaultProps = {
    rendered: true
};

export default table;