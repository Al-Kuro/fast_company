import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, bookmark, onToggleBookmark }) => {
    return (
        <button id={id} onClick={() => onToggleBookmark(id)}>
            {bookmark}
        </button>
    );
};
Bookmark.propTypes = {
    id: PropTypes.string.isRequired,
    bookmark: PropTypes.node.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
