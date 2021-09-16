import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./QualitiesList";

const User = ({
    _id,
    name,
    profession,
    qualities,
    completedMeetings,
    rate,
    ...rest
}) => {
    return (
        <tbody>
            <tr key={_id}>
                <td>{name}</td>
                <td>
                    <QualitiesList />
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}</td>
            </tr>
        </tbody>
    );
};
User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.object.isRequired,
    qualities: PropTypes.array.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired
};

export default User;
