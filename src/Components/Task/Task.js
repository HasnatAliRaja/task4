import React from "react";
import "./Task.css";

const Task = (props) => {
  console.log("Content Lala G", props.content, props);
  const { provided, innerRef } = props;

  return (
    <div
      className="taskContainer"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      <span className="taskText">{props.content}</span>
    </div>
  );
};

export default Task;
