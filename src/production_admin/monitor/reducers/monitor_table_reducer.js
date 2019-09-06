import {
  MONITOR_TABLE_SET_LIST_ACTIVITY_INSTANCES,
  MONITOR_TABLE_SET_LIST_BATCH_ID_INSTANCES,
  MONITOR_TABLE_SET_STEP_FIRST,
  MONITOR_TABLE_SET_TASK_FIRST_INDEX,
  MONITOR_TABLE_SET_TASK_SECOND_INDEX,
  MONITOR_TABLE_RECLAIM,
  MONITOR_TABLE_ASSIGN_USER,
  MONITOR_TABLE_GETTING,
  MONITOR_TABLE_SHOW_POPUP,
  MONITOR_TABLE_HIDE_POPUP,
  MONITOR_TABLE_RESET
} from "../constants";

const initialState = {
  show: false,
  data_originals: null,
  datas: null,
  batch_selected: null,
  task_first_index: -1,
  task_second_index: -1,
  sum: 0,
  is_fetching: true
};

const monitor_table = (state = { ...initialState }, action) => {
  switch (action.type) {
    case MONITOR_TABLE_GETTING:
      return {
        ...state,
        is_fetching: true
      };
    case MONITOR_TABLE_SET_LIST_ACTIVITY_INSTANCES:
      return {
        ...state,
        is_fetching: false,
        data_originals: action.datas,
        datas: action.datas,
        sum: action.sum
      };
    case MONITOR_TABLE_SET_TASK_FIRST_INDEX:
      return {
        ...state,
        is_fetching: false,
        datas: action.datas,
        task_first_index: action.index,
        sum: action.sum
      };
    case MONITOR_TABLE_SET_TASK_SECOND_INDEX:
      return {
        ...state,
        is_fetching: false,
        users: action.users,
        user_tasks: action.datas,
        task_second_index: action.index
      };
    case MONITOR_TABLE_RECLAIM:
      return {
        ...state,
        is_fetching: false,
        user_tasks: action.datas
      };
    case MONITOR_TABLE_ASSIGN_USER:
      return {
        ...state,
        is_fetching: false,
        user_tasks: action.datas
      };
    case MONITOR_TABLE_SET_LIST_BATCH_ID_INSTANCES:
      return {
        ...state,
        batch_selected: action.data,
        batch_datas: action.batch_datas
      };
    case MONITOR_TABLE_SET_STEP_FIRST:
      return {
        ...state,
        task_second_index: -1,
        batch_selected: null,
        batch_datas: null,
        user_tasks: null
      };
    case MONITOR_TABLE_SHOW_POPUP:
      return {
        ...state,
        show: true
      };
    case MONITOR_TABLE_HIDE_POPUP:
      return {
        ...state,
        show: false
      };
    case MONITOR_TABLE_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default monitor_table;
