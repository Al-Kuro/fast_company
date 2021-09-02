import React from "react";

const SearchStatus = ({ length, onBadges }) => {
  let phraseForUser = null;
  let phraseColor = "primary";
  if (!length) {
    phraseForUser = `Никто не тусанет с тобой сегодня`;
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
      <span className={`${onBadges()}${phraseColor}`}>{phraseForUser}</span>
    </h2>
  );
};

export default SearchStatus;
