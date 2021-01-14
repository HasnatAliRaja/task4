import React, { useEffect, useState } from "react";
import "./Boards.css";
import List from "../Components/List/List";
import Task from "../Components/Task/Task";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";

const Boards = (props) => {
  //Dispatch

  const dispatch = useDispatch();

  //States

  const list = useSelector((state) => state.lists);
  const [isAddList, setIsAddList] = useState(false);
  const [listName, setListName] = useState("");
  const [ob, setOb] = useState({});
  useEffect(() => {}, [list]);
  //Functions
  //Add Functions
  const addCard = (input, id) => {
    let data = list;
    const ID = data[id].tasks.length;
    let obj = {
      taskId: ID.toString(),
      content: input,
    };
    data[0].title = data[0].title;
    data[id].tasks.push(obj);
    dispatch(actions.addCard(data));
    setOb(obj);
    console.log("ID Card", data);
    return input;
  };

  const handleListAdd = (e) => {
    setListName(e.target.value);
  };

  const addList = () => {
    let data = list;
    let index = data.length;
    let obj = {
      id: index.toString(),
      title: listName.toString(),
      tasks: [],
    };
    data.push(obj);
    dispatch(actions.addList(data));
    setOb(obj);
    console.log("List", data);
    return true;
  };
  const handleRemoveTask = (id, parentId) => {
    let items = list;

    let length = items[parentId].tasks.length;
    let index;
    for (let x = 0; x < length; x++) {
      if (items[parentId].tasks[x].taskId == id) {
        index = x;
      }
    }
    const [selectedTask] = items[parentId].tasks.splice(index, 1);
    dispatch(actions.removeCard(items));
    setOb({});
  };

  const handleRemoveList = (id) => {
    let items = list;
    id = parseInt(id);
    let length = items.length;
    let index;
    for (let x = 0; x < length; x++) {
      if (id == items[x].id) {
        index = x;
      }
    }

    const [selectedTask] = items.splice(index, 1);
    dispatch(actions.removeCard(items));
    setOb({});
    console.log("ID", parseInt(id), items, index);
  };

  const handleOnDragEnd = (result) => {
    let items = list;
    if (result.type == "task") {
      const [selectedTask] = items[result.source.droppableId].tasks.splice(
        result.source.index,
        1
      );
      const length = items[result.destination.droppableId].tasks.length;
      if (result.source.droppableId !== result.destination.droppableId) {
        selectedTask.taskId = `${length}`;
      }
      items[result.destination.droppableId].tasks.splice(
        result.destination.index,
        0,
        selectedTask
      );
      console.log("Items", items); //Move
      dispatch(actions.moveCard(items));
      console.log("result", result); //Move
      setOb({});
    } else if (result.type == "column") {
      console.log("column", result);
      const [selectedList] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, selectedList);
      console.log("List Selected", selectedList);
      dispatch(actions.moveCard(items));
      setOb({});
    }
    console.log("newState", list);
  };

  return (
    <div className="boardsContainer">
      <div className="containerWrapper">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="columns" direction="horizontal" type="column">
            {(provided) => (
              <div
                className="boards"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list.map((x, index) => {
                  return (
                    <List
                      handleRemoveList={handleRemoveList}
                      index={index}
                      key={x.id}
                      title={x.title}
                      id={x.id}
                      addCard={addCard}
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
                                    handleRemoveTask={handleRemoveTask}
                                    content={k.content}
                                    provided={provided}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    innerRef={provided.innerRef}
                                    key={x.id + k.taskId}
                                    taskId={k.taskId}
                                    pId={x.id}
                                  >
                                    {" "}
                                  </Task>
                                )}
                              </Draggable>
                            );
                          })
                        : ""}
                      {/* {provided.placeholder} */}
                    </List>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
