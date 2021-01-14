import React from "react";
import "./Task.css";
import CloseIcon from "@material-ui/icons/Close";
const Task = (props) => {
  const { provided, innerRef } = props;
  return (
    <div
      className="taskContainer"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      {" "}
      <CloseIcon
        onClick={() => props.handleRemoveTask(props.taskId, props.pId)}
        className="taskCloseIcon"
      ></CloseIcon>
      <span className="taskText">{props.content}</span>
    </div>
  );
};

export default Task;
