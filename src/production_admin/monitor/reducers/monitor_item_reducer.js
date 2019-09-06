import {
  MONITOR_ITEM_EXPAND,
  MONITOR_ITEM_SET_ITEM,
  MONITOR_ITEM_SET_CANVAS,
  MONITOR_ITEM_RESET
} from "../constants";

const initialState = {
  is_expand: false,
  data: null,
  modeler: null,
  instances: null
};

const monitor_item = (state = { ...initialState }, action) => {
  switch (action.type) {
    case MONITOR_ITEM_EXPAND:
      return {
        ...state,
        is_expand: action.expand
      };
    case MONITOR_ITEM_SET_ITEM:
      return {
        ...state,
        versions: action.versions || state.versions,
        instances: action.instances,
        data: action.data
      };
    case MONITOR_ITEM_SET_CANVAS:
      return {
        ...state,
        modeler: action.modeler
      };
    case MONITOR_ITEM_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default monitor_item;
