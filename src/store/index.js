import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer";
import Thunk from "redux-thunk";
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

const store = createStore(reducer, initialState, applyMiddleware(Thunk));
export default store;
