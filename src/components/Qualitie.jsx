import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name, _id, onBadges }) => {
    return (
        <span key={_id}>
            <span className={`${onBadges()}${color}`}>{name}</span>
            &nbsp;
        </span>
    );
};
Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.number.isRequired,
    onBadges: PropTypes.func.isRequired
};

export default Qualitie;
