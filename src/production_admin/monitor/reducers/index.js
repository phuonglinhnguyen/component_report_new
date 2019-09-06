import { combineReducers } from "redux";

import monitor_list from "./monitor_list_reducer";
import monitor_item from "./monitor_item_reducer";
import monitor_table from "./monitor_table_reducer";
import monitor_users from "./monitor_users_reducer";

const monitor = combineReducers({
  monitor_table,
  monitor_item,
  monitor_list,
  monitor_users
});

export default monitor;
