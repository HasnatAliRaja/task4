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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.MOVE_CARD:
      console.log("actionData",action.payload.result);
      return {
        ...state,
        lists: action.payload.result,
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
