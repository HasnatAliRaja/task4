import constants from "./constants";

const moveCard = (result) => {
  return (dispatch) => {
    try {
      dispatch({
        type: constants.MOVE_CARD,
        payload: { result },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const addCard = (result) => {
  return (dispatch) => {
    try {
      dispatch({
        type: constants.ADD_CARD,
        payload: { result },
      });
    } catch (error) {}
  };
};

const addList = (result) => {
  return (dispatch) => {
    try {
      dispatch({
        type: constants.ADD_LIST,
        payload: { result },
      });
    } catch (error) {}
  };
};
const removeCard = (result) => {
  return (dispatch) => {
    try {
      dispatch({
        type: constants.REMOVE_CARD,
        payload: { result },
      });
    } catch (error) {}
  };
};
const renameList = (result,id) => {
  return (dispatch) => {
    try {
      dispatch({
        type: constants.RENAME_LIST,
        payload: { result,
         id},
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export default { moveCard, addCard, addList, removeCard };
