import React from "react";
import User from "./User.jsx";

const Users = ({ users, ...rest }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        {users.map((user) => (
          <User key={user._id} {...user} {...rest} />
        ))}
      </table>
    </div>
  );
};

export default Users;
