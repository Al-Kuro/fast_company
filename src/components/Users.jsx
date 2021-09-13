import React, { useEffect, useState } from "react";
import Pagination from "./Pagination.jsx";
import { paginate } from "../utils/paginate.js";
import User from "./User.jsx";
import GroupList from "./GroupList.jsx";
import api from "../api/index.js";
import SearchStatus from "./SearchStatus.jsx";

const Users = () => {
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

    const [users, setUsers] = useState([]);
    const [professions, setProfessions] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;

    // Получаем начальные состояния для users и professions
    useEffect(() => {
        api.users.fetchAll().then((users) =>
            setUsers(
                users.map(
                    (user) =>
                        (user = {
                            ...user,
                            bookmark: bookmark,
                            isBookmark: false
                        })
                )
            )
        );
        api.professions
            .fetchAll()
            .then((professions) => setProfessions(professions));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

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

    const filteredUsers =
        users && selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;
    const count = filteredUsers.length;
    const usersToPaginate = paginate(filteredUsers, currentPage, pageSize);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        professions={professions}
                        selectedItem={selectedProf}
                        valueProperty={"_id"}
                        contentProperty={"name"}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
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
                        {usersToPaginate.map((user) => (
                            <User
                                key={user._id}
                                onDeleteUser={handleDelete}
                                onToggleBookmark={handleToggleBookmark}
                                {...user}
                            />
                        ))}
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Users;
