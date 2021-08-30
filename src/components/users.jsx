import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const getBadges = () => {
    return "badge bg-";
  };

  const renderTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((qualitie) => (
                  <span key={qualitie._id}>
                    <span className={`${getBadges()}${qualitie.color}`}>
                      {qualitie.name}
                    </span>
                    &nbsp;
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}</td>
              <td>
                <button
                  className={`${getBadges()}danger`}
                  onClick={() => handleDelete(user._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleDelete = (userId) => {
    const usersUpdate = users.filter((user) => user._id !== userId);
    setUsers(usersUpdate);
  };

  const renderPhrase = (number) => {
    let phraseForUser = null;
    let phraseColor = "primary";
    if (!number) {
      phraseForUser = `Никто не тусанет с тобой сегодня`;
      phraseColor = "danger";
    } else if (number < 5 && number > 1) {
      phraseForUser = `${number} человека тусанет с тобой сегодня`;
    } else if (number === 1) {
      phraseForUser = `${number} человек тусанет с тобой сегодня`;
    } else {
      phraseForUser = `${number} человек тусанут с тобой сегодня`;
    }

    return (
      <h2>
        <span className={`${getBadges()}${phraseColor}`}>{phraseForUser}</span>
      </h2>
    );
  };

  return (
    <div>
      {renderPhrase(users.length)}
      {users.length ? renderTable() : ""}
    </div>
  );
};

export default Users;
