import constants from "./constants";

const initialState = {
  lists: [
    {
      id: "0",
      title: "BackLog",
      tasks: [
        {
          taskId: "0",
          content: "This is a task to make a task",
        },
      ],
    },
  ],
  operations: 0,
};
const moveCard = (result, state) => {
  const [selectedTask] = state.lists[result.source.droppableId].tasks.splice(
    result.source.index,
    1
  );
  const length = state.lists[result.destination.droppableId].tasks.length;
  if (result.source.droppableId !== result.destination.droppableId) {
    selectedTask.taskId = `${length}`;
  }
  state.lists[result.destination.droppableId].tasks.splice(
    result.destination.index,
    0,
    selectedTask
  );
  console.log("state.lists", state.lists); //Move
  // dispatch(actions.moveCard(state.lists));
  console.log("result", result); //Move
  return state.lists;
};

const moveList = (result, state) => {
  console.log("column", result);
  const [selectedList] = state.lists.splice(result.source.index, 1);
  state.lists.splice(result.destination.index, 0, selectedList);
  return state.lists;
};

let newState;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.MOVE_CARD:
      console.log("actionData", state);
      newState = moveCard(action.payload.result, state);
      return {
        ...state,
        lists: newState,
        operations: ++state.operations,
      };
    case constants.ADD_CARD:
      return {
        ...state,
        lists: action.payload.result,
      };
    case constants.ADD_LIST:
      return {
        ...state,
        lists: action.payload.result,
      };
    case constants.REMOVE_CARD:
      return {
        ...state,
        lists: action.payload.result,
      };
    case constants.MOVE_LIST:
      newState = moveList(action.payload.result, state);
      return {
        ...state,
        lists: newState,
        operations: ++state.operations,
      };
    // case constants.RENAME_LIST:
    //   return {
    //     ...state,
    //     lists[action.payload]: action.payload.result,
    //   };

    default:
      return state;
  }
};

export default reducer;
