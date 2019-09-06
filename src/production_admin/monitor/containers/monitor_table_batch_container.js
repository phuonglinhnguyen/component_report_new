import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import MonitorTableBatchComponent from "../components/monitor_table_batch_component";

import * as actions from "../actions/monitor_table_action";

const mapStateToProps = state => ({
  monitor_item: state.project_monitor.monitor_item,
  monitor_table: state.project_monitor.monitor_table,
  project: state.project.project_item.project
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  MonitorTableBatchComponent
);
