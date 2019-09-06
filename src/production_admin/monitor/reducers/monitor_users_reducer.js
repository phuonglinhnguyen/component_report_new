import {
  MONITOR_USERS_SET_LIST,
  MONITOR_RESET,
  MONITOR_USERS_FILTER,
  MONITOR_USERS_SHOW_POPUP,
  MONITOR_USERS_HIDE_POPUP,
  MONITOR_USERS_INPUT_CHANGE
} from "../constants";

const initialState = {
  is_fetching: true,
  show: false,
  text_search: ""
};

const monitor_users = (state = { ...initialState }, action) => {
  switch (action.type) {
    case MONITOR_USERS_SET_LIST:
      return {
        ...state,
        is_fetching: false,
        total_working_user: action.total_working_user,
        project_users: action.project_users,
        working_users: action.working_users
      };
    case MONITOR_USERS_INPUT_CHANGE:
      return {
        ...state,
        text_search: action.text_search
      };
    case MONITOR_USERS_FILTER:
      return {
        ...state,
        results: action.results
      };
    case MONITOR_USERS_SHOW_POPUP:
      return {
        ...state,
        show: true
      };
    case MONITOR_USERS_HIDE_POPUP:
      return {
        ...state,
        show: false
      };
    case MONITOR_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default monitor_users;
