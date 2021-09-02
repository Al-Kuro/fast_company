import React from "react";

const Qualitie = ({ color, name, _id, onBadges }) => {
  return (
    <span key={_id}>
      <span className={`${onBadges()}${color}`}>{name}</span>
      &nbsp;
    </span>
  );
};

export default Qualitie;
