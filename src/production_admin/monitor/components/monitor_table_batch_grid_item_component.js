import React from "react";

import TableX from "../../../../common/table-x/components/table";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from "material-ui/IconButton";

import MonitorTableBatchGridTasksComponent from "./monitor_table_batch_grid_tasks_component";
import MonitorTableBatchGridItemAssignComponent from "./monitor_table_batch_grid_item_assign_component";

import PageviewIcon from "material-ui/svg-icons/action/pageview";

import { I18n, Translate } from "react-redux-i18n";
import _ from "lodash";
import Moment from "moment";

class MonitorTableBatchGridItem extends React.Component {
  state = {
    columns: [
      {
        name: "doc_id",
        title: I18n.t("projects.workflow.doc_id"),
        sort: true
      },
      {
        name: "doc_name",
        title: I18n.t("projects.workflow.doc_name"),
        sort: true
      },
      {
        name: "assignee",
        title: I18n.t("projects.workflow.assignee"),
        style: { width: "15%" },
        sort: true,
        render: data => {
          if (!data.assignee) {
            return "";
          }
          if (data.is_online) {
            return data.assignee;
          } else {
            return (
              <span>
                {data.assignee}
                <b style={{ color: "#F44336" }}>{"_(offline)"}</b>
              </span>
            );
          }
        }
      },
      {
        name: "started",
        title: I18n.t("projects.workflow.started"),
        style: { width: "20%" },
        render: data => {
          if (!data.started) {
            return "";
          }
          return Moment(data.started).format("YYYY/MM/DD HH:mm");
        }
      },
      {
        name: "",
        style: { width: "7%" },
        render: data => (
          <IconButton
            title="View Image"
            onClick={() => window.open(`${data.s2_url}`, "_blank")}
          >
            <PageviewIcon />
          </IconButton>
        )
      }
    ]
  };

  shouldComponentUpdate(nextProps) {
    return (
      !_.isEqual(nextProps.datas, this.props.datas) ||
      !_.isEqual(nextProps.task_second_index, this.props.task_second_index)
    );
  }

  renderActions() {
    const {
      users,
      muiTheme,
      action_reClaimTasks,
      project_id,
      action_assignTo
    } = this.props;

    return (
      <div>
        <RaisedButton
          secondary={true}
          onClick={() => {
            const datas = this.refs.table.getSelectedData();
            action_reClaimTasks(project_id,datas);
          }}
          label={<Translate value="projects.workflow.un_claim" />}
        />
        <MonitorTableBatchGridItemAssignComponent
          action_assignTo={username => {
            const datas = this.refs.table.getSelectedData();
            action_assignTo(username, datas, project_id);

          }}
          users={users}
          accent1Color={muiTheme.palette.accent1Color}
        />
      </div>
    );
  }

  render() {
    const {
      task_second_index,
      batch_datas,
      user_tasks,
      muiTheme,
      action_selectTaskSecond,
      project_id
    } = this.props;
    const { columns } = this.state;
    return (
      <div
        style={{
          height: 598,
          display: "flex",
          backgroundColor: muiTheme.palette.background2Color
        }}
      >
        <MonitorTableBatchGridTasksComponent
          show_group={false}
          instances={batch_datas}
          task_index={task_second_index}
          primary1Color={muiTheme.palette.primary1Color}
          action_selectTask={action_selectTaskSecond}
          project_id={project_id}
        />
        <div style={{ flex: 1 }}>
          {user_tasks && (
            <TableX
              tableActions={this.renderActions.bind(this)}
              muiTheme={muiTheme}
              columns={columns}
              datas={user_tasks}
              paging={true}
              showRowHover={true}
              ref="table"
              multiSelectable={true}
              selectable={true}
              search_keys={["doc_id", "doc_name", "assignee"]}
              pagingPosition={"bottom"}
              searchHintText={"Search"}
              tableStyle={{ bodyStyle: { height: 410 } }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default MonitorTableBatchGridItem;
