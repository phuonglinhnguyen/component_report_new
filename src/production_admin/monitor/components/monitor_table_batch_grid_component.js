import React from "react";
import _ from "lodash";

import TableX from "../../../../common/table-x/components/table";
import MonitorTableBatchGridTasks from "./monitor_table_batch_grid_tasks_component";
import IconButton from "material-ui/IconButton";

import FileDownloadIcon from "material-ui/svg-icons/file/file-download";

import { I18n } from "react-redux-i18n";
import { numberForReport } from "../../../../../utils/format_number";
import export_file_csv from "../../../../../utils/export_file_csv";

class MonitorTableBatchGrid extends React.Component {
  state = {
    columns: [
      {
        name: "batch_id",
        title: I18n.t("projects.workflow.batch_id"),
        style: { width: "25%" },
        sort: true,
        render: data => {
          return <span title={data.batch_id}>{data.batch_id}</span>;
        }
      },
      {
        name: "name",
        title: I18n.t("projects.workflow.batch"),
        sort: true,
        render: data => {
          return <span title={data.name}>{data.name}</span>;
        }
      },
      {
        name: "processed_documents",
        title: I18n.t("projects.workflow.processed_documents"),
        sort: true,
        align_right: true,
        style: { width: "10%" },
        render: data => {
          return numberForReport(data.processed_documents);
        }
      },
      {
        name: "total",
        title: I18n.t("projects.workflow.total"),
        sort: true,
        align_right: true,
        style: { width: "10%" },
        render: data => {
          return numberForReport(data.total);
        }
      },
      {
        name: "finish",
        title: I18n.t("projects.workflow.finish"),
        sort: true,
        align_right: true,
        style: { width: "10%" },
        render: data => {
          if (data.finish === 0) {
            return 0;
          }
          return data.finish.toFixed(2);
        }
      }
    ]
  };

  shouldComponentUpdate(nextProps) {
    return (
      !_.isEqual(nextProps.muiTheme.palette, this.props.muiTheme.palette) ||
      !_.isEqual(nextProps.instances, this.props.instances) ||
      !_.isEqual(nextProps.datas, this.props.datas) ||
      !_.isEqual(nextProps.task_first_index, this.props.task_first_index) ||
      !_.isEqual(nextProps.show, this.props.show)
    );
  }

  render() {
    const {
      show,
      project,
      datas,
      task_first_index,
      instances,
      sum,
      batch_count,
      muiTheme,
      action_selectBatch,
      action_selectTaskFirst
    } = this.props;
    const { columns } = this.state;
    return (
      <div
        style={{
          display: !show ? "none" : "flex",
          height: 598,
          backgroundColor: muiTheme.palette.background2Color
        }}
      >
        <MonitorTableBatchGridTasks
          sum={sum}
          show_group={true}
          batch_count={batch_count}
          task_index={task_first_index}
          instances={instances}
          primary1Color={muiTheme.palette.primary1Color}
          action_selectTask={action_selectTaskFirst}
        />
        <div style={{ flex: 1 }}>
          <IconButton
            tooltip="Download Batches"
            style={{
              position: "absolute",
              right: 10,
              top: 15
            }}
            onClick={() => {
              export_file_csv(
                { filename: `${project.name}_batches.csv` },
                datas,
                ["batch_id", "name", "processed_documents", "total", "finish"]
              );
            }}
          >
            <FileDownloadIcon color={muiTheme.palette.accent1Color} />
          </IconButton>
          <TableX
            action_cellClick={(...p) => action_selectBatch(p[0] - 1)}
            muiTheme={muiTheme}
            columns={columns}
            datas={datas || []}
            paging={true}
            showRowHover={true}
            ref="table"
            search_keys={["batch_id", "name"]}
            multiSelectable={false}
            pagingPosition={"bottom"}
            searchHintText={"Search"}
            selectable={false}
            tableStyle={{ bodyStyle: { height: 410 } }}
          />
        </div>
      </div>
    );
  }
}

export default MonitorTableBatchGrid;
