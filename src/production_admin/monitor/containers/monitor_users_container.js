import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import MonitorUsersComponent from "../components/monitor_users_component";

import * as actions from "../actions/monitor_users_action";

const mapStateToProps = state => ({
  monitor_item: state.project_monitor.monitor_item,
  monitor_users: state.project_monitor.monitor_users,
  project: state.project.project_item.project
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  MonitorUsersComponent
);
