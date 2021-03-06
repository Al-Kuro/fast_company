import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    let phraseForUser = null;
    let phraseColor = "primary";
    if (!length) {
        phraseForUser = "Никто не тусанет с тобой сегодня";
        phraseColor = "danger";
    } else if (length < 5 && length > 1) {
        phraseForUser = `${length} человека тусанет с тобой сегодня`;
    } else if (length === 1) {
        phraseForUser = `${length} человек тусанет с тобой сегодня`;
    } else {
        phraseForUser = `${length} человек тусанут с тобой сегодня`;
    }

    return (
        <h2>
            <span className={`badge bg-${phraseColor}`}>{phraseForUser}</span>
        </h2>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
