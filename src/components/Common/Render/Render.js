import PropTypes from "prop-types";

const render = (props) => {
    return (
        props.if === true ? props.children : null
    );
}

render.propTypes = {
    if: PropTypes.bool.isRequired
};

export default render;