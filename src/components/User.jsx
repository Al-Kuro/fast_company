import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./Qualitie.jsx";
import Bookmark from "./Bookmark.jsx";

const User = ({
    _id,
    name,
    profession,
    qualities,
    completedMeetings,
    rate,
    onDelete,
    onBadges,
    ...rest
}) => {
    return (
        <tbody>
            <tr key={_id}>
                <td>{name}</td>
                <td>
                    {qualities.map((qualitie) => (
                        <Qualitie
                            key={qualitie._id}
                            {...qualitie}
                            onBadges={onBadges}
                        />
                    ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}</td>
                <td>
                    <Bookmark key={_id} id={_id} {...rest} />
                </td>
                <td>
                    <button
                        className={`${onBadges()}danger`}
                        onClick={() => onDelete(_id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </tbody>
    );
};
User.propTypes = {
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBadges: PropTypes.func.isRequired
};

export default User;
