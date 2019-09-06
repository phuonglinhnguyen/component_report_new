import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route } from "react-router";

import LoadingComponent from "../../../../common/ajax/load_page/circle";
import MonitorToolbarContainer from "./monitor_toolbar_container";
import MonitorCanvasContainer from "./monitor_canvas_container";
import MonitorUsersContainer from "./monitor_users_container";
import MonitorTableBatchContainer from "./monitor_table_batch_container";
import CallAjaxContainer from "../../../../common/ajax/call_ajax/containers/call_ajax_container";

import { getWorkflowList, resetState } from "../actions/monitor_list_action";
import muiThemeable from "material-ui/styles/muiThemeable";

class MonitorContainer extends React.Component {
  componentWillMount() {
    const { projectid } = this.props.match.params;
    this.props.actions.getWorkflowList(projectid);
  }

  componentWillUnmount() {
    this.props.actions.resetState();
  }

  render() {
    if (this.props.is_fetching) {
      return <LoadingComponent />;
    }
    const { match } = this.props;
    const { palette } = this.props.muiTheme;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <CallAjaxContainer />
        <MonitorToolbarContainer palette={palette}/>

        <div
          style={{
            display: "flex",
            backgroundColor: palette.background4Color,
            justifyContent: "flex-end"
          }}
        >
          <Route
            path={`/projects/:projectid/monitor/:workflow_id/:deployment_id`}
            render={props => (
              <div style={{ flex: 1 }}>
                <MonitorCanvasContainer {...props} palette={palette} />
                <MonitorTableBatchContainer
                  {...props}
                  muiTheme={this.props.muiTheme}
                />
              </div>
            )}
          />
          <MonitorUsersContainer palette={palette} match={match}/>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  is_fetching: state.project_monitor.monitor_list.is_fetching

});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        getWorkflowList,
        resetState
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  muiThemeable()(MonitorContainer)
);
