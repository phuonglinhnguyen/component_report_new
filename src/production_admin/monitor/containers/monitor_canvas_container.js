import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import MonitorCanvasComponent from "../components/monitor_canvas_component";

import * as item_actions from "../actions/monitor_item_action";
import {
  showPopup,
  selectTaskFirst,
  selectTaskSecond,
  resetStateTable
} from "../actions/monitor_table_action";

const mapStateToProps = state => ({
  monitor_table: state.project_monitor.monitor_table,
  monitor_list: state.project_monitor.monitor_list,
  monitor_item: state.project_monitor.monitor_item,
  project: state.project.project_item.project
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...item_actions,
      resetStateTable,
      showPopup,
      selectTaskFirst,
      selectTaskSecond
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(
  MonitorCanvasComponent
);
