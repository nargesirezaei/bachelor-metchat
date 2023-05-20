import classNames from "classnames";
import React from "react";

export const Conversations = ({
  conversations,
  onSelectConversation,
  currentId,
}) => {
  return (
    <ul className="conversations p-0 m-0 d-flex flex-column">
      {conversations?.map((x) => (
        <li
          key={x._id}
          className={classNames("badge badge-pill p-2 mb-1", {
            "badge-info": currentId !== x._id,
            "badge-dark": currentId === x._id,
          })}
          style={{ cursor: "pointer" }}
          onClick={() => onSelectConversation(x)}
        >
          {x.title}
        </li>
      ))}
    </ul>
  );
};
