import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import MonitorToolbarComponent from "../components/monitor_toolbar_component";

import * as actions from "../actions/monitor_list_action";

const mapStateToProps = state => ({
  monitor_item: state.project_monitor.monitor_item,
  monitor_list: state.project_monitor.monitor_list,
  ajax_call_ajax: state.common.ajax_call_ajax
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  MonitorToolbarComponent
);
