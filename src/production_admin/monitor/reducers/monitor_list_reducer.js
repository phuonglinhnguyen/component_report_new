import {
  MONITOR_LIST_SET_LIST,
  MONITOR_LIST_ERROR,
  MONITOR_RESET
} from "../constants";

const initialState = {
  is_fetching: true,

  datas: null
};

const monitor_list = (state = { ...initialState }, action) => {
  switch (action.type) {
    case MONITOR_LIST_SET_LIST:
    case MONITOR_LIST_ERROR:
      return {
        ...state,
        is_fetching: false,
        datas: action.datas
      };
    case MONITOR_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default monitor_list;
