import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./Bookmark";
import QualitiesList from "./QualitiesList";
import Table from "./Table";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDeleteUser,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качество",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggleBookmark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="badge bg-danger"
                    onClick={() => onDeleteUser(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired
};

export default UserTable;
