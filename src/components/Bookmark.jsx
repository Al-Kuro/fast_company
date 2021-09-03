import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, bookmark, onHandleToggleBookmark }) => {
    return (
        <button id={id} onClick={() => onHandleToggleBookmark(id)}>
            {bookmark}
        </button>
    );
};
Bookmark.propTypes = {
    id: PropTypes.string.isRequired,
    bookmark: PropTypes.node.isRequired,
    onHandleToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
