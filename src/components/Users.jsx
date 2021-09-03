import React, { useState } from "react";
import PropTypes from "prop-types";
import Pagination from "./Pagination.jsx";
import { paginate } from "../utils/paginate.js";
import User from "./User.jsx";

const Users = ({ users: allUsers, ...rest }) => {
    const count = allUsers.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const users = paginate(allUsers, currentPage, pageSize);
    return (
        <div>
            {count > 0 && (
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
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
