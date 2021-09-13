import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    professions: items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    let renderItems = null;
    if (Array.isArray(items)) {
        renderItems = (
            <ul className="list-group">
                {items.map((item) => (
                    <li
                        key={item[valueProperty]}
                        className={
                            "list-group-item" +
                            (item === selectedItem ? " active" : "")
                        }
                        onClick={() => onItemSelect(item)}
                        role="button"
                    >
                        {item[contentProperty]}
                    </li>
                ))}
            </ul>
        );
    } else {
        renderItems = (
            <ul className="list-group">
                {Object.keys(items).map((item) => (
                    <li
                        key={items[item][valueProperty]}
                        className={
                            "list-group-item" +
                            (items[item] === selectedItem ? " active" : "")
                        }
                        onClick={() => onItemSelect(items[item])}
                        role="button"
                    >
                        {items[item][contentProperty]}
                    </li>
                ))}
            </ul>
        );
    }
    return renderItems;
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};

export default GroupList;
