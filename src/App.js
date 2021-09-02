import React, { useState } from "react";
import Users from "./components/Users.jsx";
import SearchStatus from "./components/SearchStatus.jsx";
import api from "./api";

function App() {
  const bookmark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-bookmark"
      viewBox="0 0 16 16"
    >
      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
    </svg>
  );
  const bookmarkFill = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-bookmark-fill"
      viewBox="0 0 16 16"
    >
      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
    </svg>
  );

  const usersApi = api.users.fetchAll();
  const updateUsersApi = [...usersApi].map(
    (user) =>
      (user = {
        ...user,
        bookmark: bookmark,
        isBookmark: false,
      })
  );
  const [users, setUsers] = useState(updateUsersApi);

  const handleDelete = (userId) => {
    const usersUpdate = users.filter((user) => user._id !== userId);
    setUsers(usersUpdate);
  };

  const handleToggleBookmark = (id) => {
    const newUsers = [...users];
    const elementIndex = newUsers.findIndex((user) => user._id === id);
    if (!newUsers[elementIndex].isBookmark) {
      newUsers[elementIndex].bookmark = bookmarkFill;
      newUsers[elementIndex].isBookmark = true;
    } else {
      newUsers[elementIndex].bookmark = bookmark;
      newUsers[elementIndex].isBookmark = false;
    }
    setUsers(newUsers);
  };

  const getBadges = () => {
    return "badge bg-";
  };

  return (
    <div>
      <SearchStatus length={users.length} onBadges={getBadges} />
      {users.length ? (
        <Users
          users={users}
          onDelete={handleDelete}
          onBadges={getBadges}
          onHandleToggleBookmark={handleToggleBookmark}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
