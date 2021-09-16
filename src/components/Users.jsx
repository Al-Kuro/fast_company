import React, { useEffect, useState } from "react";
import Pagination from "./Pagination.jsx";
import { paginate } from "../utils/paginate.js";
import GroupList from "./GroupList.jsx";
import api from "../api/index.js";
import SearchStatus from "./SearchStatus.jsx";
import UserTable from "./UserTable.jsx";
import _ from "lodash";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [professions, setProfessions] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 4;

    // Получаем начальные состояния для users и professions
    useEffect(() => {
        api.users.fetchAll().then((users) => setUsers(users));
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
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers =
            users && selectedProf
                ? users.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersToPaginate = paginate(sortedUsers, currentPage, pageSize);

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
                        <UserTable
                            users={usersToPaginate}
                            onDeleteUser={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
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
    }
    return "Идет загрузка данных...";
};

export default Users;
