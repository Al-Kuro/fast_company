import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name, _id }) => {
    return (
        <span key={_id}>
            <span className={`badge bg-${color}`}>{name}</span>
            &nbsp;
        </span>
    );
};
Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default Qualitie;
