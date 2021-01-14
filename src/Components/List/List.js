import React, { useState } from "react";
import "./List.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = (props) => {
  const [addCard, setAddCard] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  // const list = useSelector((state) => state.lists);
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        // width:"15ch",
        // height: "5ch",
      },
    },
    button: {
      "& > *": {
        color: "gray",
        width: "100%",
        textTransform: "none",
        alignSelf: "center",
        justifySelf: "center",
      },
      textField: {
        color: "grey",
      },
      buttonAdd: {
        "& > *": {
          color: "green",
          height: "12ch",
          textTransform: "none",
        },
      },
    },
  }));

  const handleOpenAddCard = (id) => {
    setAddCard(true);
  };

  const handleCloseCard = () => {
    setAddCard(!addCard);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRenameList = () => {
    setEditTitle(true);
  };

  const [input, setInput] = useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  // const handleTitleChange = (e) => {
  //   let data = list;
  //   data[props.id].title = e.target.value;
  //   //dispatch(actions.)
  //   setEditTitle(false);
  // };
  const { provided, innerRef } = props;

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <div
          className="listContainer"
          key={props.id}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="list">
            <div className="cardTitleSection">
              <span onClick={handleRenameList} className="title">
                {editTitle ? (
                  <TextField
                    onBlur={() => {
                      setEditTitle(false);
                    }}
                    placeholder={props.title}
                    size="small"
                    focused
                    className={classes.root}
                    id="inputText"
                    // onBlur={handleTitleChange}
                    autoFocus
                  ></TextField>
                ) : (
                  props.title
                )}
              </span>
              <MoreHorizIcon
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="moreHorizonIcon"
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem className="menuItem">Rename</MenuItem>
                {/* <MenuItem className='menuItem' onClick={handleClose}></MenuItem> */}
                <MenuItem
                  className="menuItem"
                  onClick={
                    (handleClose, () => props.handleRemoveList(props.id))
                  }
                >
                  Delete
                </MenuItem>
              </Menu>
            </div>
            <Droppable
              droppableId={props.id}
              index={props.index}
              key={props.id}
              type="task"
            >
              {(provided) => (
                <div
                  className="listContent"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {props.children}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="listFooter">
              {addCard && (
                <div className="addNewCardContent">
                  <TextField
                    className={classes.root}
                    id="inputText"
                    label="New task"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    value={input}
                    autoFocus
                  ></TextField>
                  <div className="addNewCardControls">
                    <CloseIcon
                      onClick={handleCloseCard}
                      className="closeIcon"
                    />
                    <Button
                      onClick={() => props.addCard(input, props.id)}
                      className={classes.buttonAdd}
                    >
                      Add Card
                    </Button>
                  </div>
                </div>
              )}
              {!addCard && (
                <Button onClick={handleOpenAddCard} className={classes.button}>
                  <AddIcon />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add another Task
                </Button>
              )}
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};
export default List;
