import React from "react";

const Bookmark = ({
  id,
  bookmarkStart,
  bookmarkEnd,
  onHandleToggleBookmark,
}) => {
  // в return пытался сравнить состояние начальное с обновленным
  // чтобы менялось состояние отдельной кнопки
  // а в любом случае меняется одновременно состояние у всех кнопок
  return (
    <button id={id} onClick={() => onHandleToggleBookmark(id)}>
      {bookmarkStart === bookmarkEnd ? bookmarkStart : bookmarkEnd}
    </button>
  );
};

export default Bookmark;
