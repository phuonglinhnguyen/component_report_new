import React from "react";
import PropTypes from "prop-types";
import { Translate } from "react-redux-i18n";
import { I18n } from "react-redux-i18n";
import Avatar from "material-ui/Avatar";
import { Card } from "material-ui/Card";
import Chip from "material-ui/Chip";
import Subheader from "material-ui/Subheader";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem, makeSelectable } from "material-ui/List";
import ExpandMore from "material-ui/svg-icons/navigation/expand-more";
import ExpandLess from "material-ui/svg-icons/hardware/keyboard-arrow-right";
import {
  PRODUCTION_START_KEY_TASKS_ASSIGNED,
  PRODUCTION_START_KEY_PROJECT_PRIORITY
} from "../../constants/production_contant";
import { style } from "../../constants/production_contant";
import wrapState from "../../../components/SelectableList/SelectableListNew";
import { getDataObject } from "../../../dgs-core";
import { isEqual } from "lodash";
import { Table } from "../../../@components/@Table";

let SelectableList = makeSelectable(List);
SelectableList = wrapState(SelectableList);
class ProjectList extends React.Component {
  getColor = priority => {
    if (priority < 2) {
      return style.high;
    } else if (priority < 5) {
      return style.medium;
    }
    return style.low;
  };

  render() {
    const {
      project_id,
      projects = [],
      group_id,
      muiTheme,
      resources,
      groupName = "",
      projectName = "",
      showGroup,
      dashboard,
      changeProjectName,
      changeProject,
      showCreateProject
    } = this.props;
    return (
      <React.Fragment>
        <Table
          datas={
            projectName
              ? projects.filter(
                  item =>
                    !!item.name
                      .toLowerCase()
                      .includes(projectName.toLowerCase())
                )
              : projects
          }
          createData={data => ({
            id: data.id,
            name: data.name,
            customer: data.customer,
            group_name: data.group_name,
            project_managers: data.project_managers ? (
              data.project_managers.map(row => (
                <span>
                  {row}
                  <span>
                    {data.project_managers[data.project_managers.length - 1] ===
                    row
                      ? ""
                      : ", "}
                  </span>
                </span>
              ))
            ) : (
              <p style={{ color: "darkgray" }}>No Project Managers !</p>
            ),
            designers: data.designers ? (
              data.designers.map(row => (
                <span>
                  {row}
                  <span>
                    {data.designers[data.designers.length - 1] === row
                      ? ""
                      : ", "}
                  </span>
                </span>
              ))
            ) : (
              <p style={{ color: "darkgray" }}>No Designers !</p>
            ),
            qc_admins: data.qc_admins ? (
              data.qc_admins.map(row => (
                <span>
                  {row}
                  <span>
                    {data.qc_admins[data.qc_admins.length - 1] === row
                      ? ""
                      : ", "}
                  </span>
                </span>
              ))
            ) : (
              <p style={{ color: "darkgray" }}>No QC Admin !</p>
            ),
            priority: data.priority,
            active: data.active ? (
              <p style={{ color: "green" }}>Active</p>
            ) : (
              <p style={{ color: "red" }}>Inactive</p>
            )
          })}
          columns={[
            {
              id: "name",
              numeric: false,
              disablePadding: true,
              label: I18n.t("dashboard.project_table.column.project_name"),
              visible: true
            },
            {
              id: "customer",
              numeric: false,
              disablePadding: true,
              label: I18n.t("dashboard.project_table.column.customer"),
              visible: true
            },
            {
              id: "group_name",
              numeric: false,
              disablePadding: true,
              label: I18n.t("dashboard.project_table.column.group_name"),
              visible: true
            },
            {
              id: "project_managers",
              numeric: false,
              disablePadding: true,
              label: I18n.t("dashboard.project_table.column.project_manager"),
              visible: !project_id || !showGroup
            },
            {
              id: "designers",
              numeric: false,
              disablePadding: true,
              label: I18n.t("dashboard.project_table.column.designers"),
              visible: !project_id || !showGroup
            },
            {
              id: "qc_admins",
              numeric: false,
              disablePadding: true,
              label: I18n.t("dashboard.project_table.column.qc_admins"),
              visible: !project_id || !showGroup
            },
            {
              id: "priority",
              numeric: false,
              disablePadding: true,
              label: I18n.t("dashboard.project_table.column.priority"),
              visible: !project_id
            },
            {
              id: "active",
              numeric: false,
              disablePadding: true,
              label: I18n.t("dashboard.project_table.column.status"),
              visible: !project_id
            }
          ]}
          item_id={project_id}
          group_id={group_id}
          group_id={group_id}
          muiTheme={muiTheme}
          groupName={getDataObject("data.groupName", dashboard)}
          resources={resources}
          project={projects.filter(item => project_id === item.id)[0] || {}}
          onChange={changeProject}
          dashboard={dashboard}
          changeProjectName={changeProjectName}
          onCreate={showCreateProject}
        />
      </React.Fragment>
    );
  }
}

export default ProjectList;
