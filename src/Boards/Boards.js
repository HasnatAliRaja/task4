import React, { useEffect, useState } from "react";
import "./Boards.css";
import List from "../Components/List/List";
import Task from "../Components/Task/Task";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";

const Boards = (props) => {
  
  const initialState = {
    lists: [
      {
        id: "1",
        title: "BackLog",
        tasks: [
          {
            taskId: "1",
            content: "This is a task to make a task",
          },
        ],
      },
      {
        id: "2",
        title: "Acive",
        tasks: [
          {
            taskId: "1",
            content: "This is an active task",
          },
          {
            taskId: "2",
            content: "This is an active task 2",
          },
        ],
      },
      {
        id: "3",
        title: "PassiveActive",
        tasks: [
          {
            taskId: "1",
            content: "This is a passive-active task",
          },
          {
            taskId: "2",
            content: "This is a passive-active task 2",
          },
          {
            taskId: "3",
            content: "This is a passive-active task 3",
          },
        ],
      },
      {
        id: "4",
        title: "Bugs",
        tasks: [
          {
            taskId: "1",
            content: "This is a Bug in the task",
          },
          {
            taskId: "2",
            content: "This is a Bug in the task 2",
          },
          {
            taskId: "3",
            content: "This is a Bug in the task 3",
          },
          {
            taskId: "4",
            content: "This is a Bug in the task 4",
          },
        ],
      },
      {
        id: "5",
        title: "In review",
        tasks: [
          {
            taskId: "1",
            content: "This is a task in Review",
          },
          {
            taskId: "2",
            content: "This is a task in Review 2",
          },
          {
            taskId: "3",
            content: "This is a task in Review 3",
          },
          {
            taskId: "4",
            content: "This is a task in Review 4",
          },
          {
            taskId: "5",
            content: "This is a task in Review 5",
          },
        ],
      },
    ],
  };

  //States
  const [isAddList, setIsAddList] = useState(false);
  const [list, setList] = useState(initialState);
  const [listName, setListName] = useState("");
  useEffect(()=>{},[list]);
  //Functions
  const addCard = (input, id) => {
    let data = list;
    const ID = data.lists[id - 1].tasks.length;
    let obj = {
      taskId: (ID + 1).toString(),
      content: input,
    };

    data.lists[id - 1].tasks.push(obj);
    setList(data);
    console.log("after", data);
    return input;
  };
  const handleListAdd = (e) => {
    setListName(e.target.value);
  };
  const addList = () => {
    let data = list;
    let index = data.lists.length;
    let obj = {
      id: (index - 1).toString,
      title: listName.toString(),
      tasks: [],
    };
    data.lists.push(obj);
    setList(data);
    console.log("koko", index, data);
    return true;
  };

  const handleOnDragEnd = (result) => {
    let items = list;
    const [selectedTask] = items.lists[
      result.source.droppableId - 1
    ].tasks.splice(result.source.index, 1);
    // selectedTask.taskId
    const length = items.lists[result.destination.droppableId - 1].tasks.length;
    if(result.source.droppableId !== result.destination.droppableId){
      selectedTask.taskId = `${length + 1}`;
    }
    items.lists[result.destination.droppableId - 1].tasks.splice(
      result.destination.index,
      0,
      selectedTask
    );
    // items.lists[result.destination.droppableId-1].tasks[length].taskId=length;
    console.log(
      "list:",
      list,
      "selectedTask:",
      selectedTask,
      "result:",
      result,
      "length:",
      length
    );
    setList(items);
    console.log("items", items);
  };
  return (
    <div className="boardsContainer">
      <div className="containerWrapper">
        <div className="boards">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {list.lists.map((x, index) => {
              return (
                <Droppable droppableId={x.id}>
                  {(provided) => (
                    <List
                      key={x.id}
                      title={x.title}
                      id={x.id}
                      addCard={addCard}
                      provided={provided}
                      {...provided.droppableProps}
                      innerRef={provided.innerRef}
                    >
                      {x.tasks !== undefined
                        ? x.tasks.map((k, index) => {
                            return (
                              <Draggable
                                key={x.id + k.taskId}
                                draggableId={x.id + k.taskId}
                                index={index}
                              >
                                {(provided) => (
                                  <Task
                                    content={k.content}
                                    provided={provided}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    innerRef={provided.innerRef}
                                    key={x.id + k.taskId}
                                  ></Task>
                                )}
                              </Draggable>
                            );
                          })
                        : ""}
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              );
            })}
          </DragDropContext>
        </div>
        <div className="addListContainer">
          <div className="addList">
            {!isAddList && (
              <Button
                onClick={() => setIsAddList(true)}
                className="addListButton"
              >
                <AddIcon />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add another List
              </Button>
            )}
            {isAddList && (
              <div className="addListTrue">
                <TextField
                  label="New List Title"
                  size="small"
                  variant="outlined"
                  className="addListInput"
                  onChange={handleListAdd}
                  // value={listName}
                  autoFocus
                />
                <br />
                <Button
                  onClick={addList}
                  className="addListButton"
                  variant="contained"
                  size="small"
                >
                  Add List
                </Button>
                <CloseIcon
                  className="addListCloseIcon"
                  onClick={() => setIsAddList(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boards;
