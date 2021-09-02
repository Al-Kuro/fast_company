import React from "react";

const Bookmark = ({ id, bookmark, onHandleToggleBookmark }) => {
  return (
    <button id={id} onClick={() => onHandleToggleBookmark(id)}>
      {bookmark}
    </button>
  );
};

export default Bookmark;
