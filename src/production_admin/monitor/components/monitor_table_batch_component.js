import React from "react";

import Paper from "material-ui/Paper";
import Draggable from "react-draggable";
import RaisedButton from "material-ui/RaisedButton";
import MonitorTableBatchGridComponent from "./monitor_table_batch_grid_component";
import MonitorTableBatchGridItemComponent from "./monitor_table_batch_grid_item_component";
import MonitorTableBatchToolbarComponent from "./monitor_table_batch_toolbar_component";

import ExpandLessIcon from "material-ui/svg-icons/navigation/expand-less";
import CircularProgress from "material-ui/CircularProgress";

const styles = {
  main: {
    position: "fixed",
    height: 38,
    zIndex: 10,
    bottom: -15,
    width: 122,
    left: "calc(50% - 66px)"
  },
  table: {
    height: 400,
    width: "100%",
    position: "fixed",
    bottom: 0
  }
};

class MonitorTableBatch extends React.Component {
  state = {
    bottom: -15
  };

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    const { monitor_table, actions } = this.props;
    let keyCode = event.keyCode;
    if (keyCode === 27 && monitor_table.show) {
      actions.hidePopup();
      return;
    }
  }

  render() {
    const { project, monitor_item, monitor_table, muiTheme, actions } = this.props;

    if (!monitor_table.show) {
      return (
        <div
          onMouseEnter={() => this.setState({ bottom: 0 })}
          onMouseLeave={() => this.setState({ bottom: -15 })}
          style={{ ...styles.main, bottom: this.state.bottom }}
        >
          <RaisedButton
            label="Report"
            primary={true}
            icon={<ExpandLessIcon />}
            onClick={() => {
              this.setState({ bottom: -15 });
              actions.showPopup();
            }}
          />
        </div>
      );
    }

    const {
      datas,
      sum,
      batch_selected,
      is_fetching,
      task_first_index,
      task_second_index,

      users,
      batch_datas,
      user_tasks,
      batch_labels,
      batch_percents
    } = monitor_table;

    let activeStep = -1;
    if (!is_fetching) {
      activeStep = batch_selected ? 1 : 0;
    }

    let batch_count = 0;
    if (datas) {
      batch_count = datas.length;
    }

    return (
      <Draggable handle="span">
        <Paper
          zDepth={3}
          style={{
            position: "absolute",
            width: "90%",
            left: "5%",
            bottom: 10,
            zIndex: 1000
          }}
        >
          <MonitorTableBatchToolbarComponent
            sum={sum}
            batch_count={batch_count}
            activeStep={activeStep}
            batch_selected={batch_selected}
            primary1Color={muiTheme.palette.primary1Color}
            background3Color={muiTheme.palette.background3Color}
            action_setFirstStep={actions.setFirstStep}
            action_hidePopup={actions.hidePopup}
            action_showPopup={actions.showPopup}
          />
          {activeStep === -1 && (
            <div style={{ width: "100%", height: 598 }}>
              <CircularProgress
                style={{
                  top: "45%",
                  left: "45%"
                }}
                size={90}
                thickness={6}
              />
            </div>
          )}
          <MonitorTableBatchGridComponent
            show={activeStep === 0}
            project={project}
            instances={monitor_item.instances || []}
            task_first_index={task_first_index}
            datas={datas}
            sum={sum}
            batch_count={batch_count}
            muiTheme={muiTheme}
            action_selectBatch={actions.selectBatch}
            action_selectTaskFirst={actions.selectTaskFirst}
          />
          {activeStep === 1 && (
            <MonitorTableBatchGridItemComponent
              muiTheme={muiTheme}
              task_second_index={task_second_index}
              total={batch_selected.total}
              batch_datas={batch_datas}
              user_tasks={user_tasks}
              labels={batch_labels}
              percents={batch_percents}
              users={users}
              action_selectTaskSecond={actions.selectTaskSecond}
              project_id={project.id}
              action_reClaimTasks={actions.reClaimTasks}
              action_assignTo={actions.assignTo}
            />
          )}
        </Paper>
      </Draggable>
    );
  }
}

export default MonitorTableBatch;
