import * as React from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import { getDataObject } from "../../../dgs-core";
import ListGroup from "./ListGroup";
import SubView from "./SubView";
import ProjectTable from "./ProjectTable";
import ProjectEditer from "./ProjectEditer";
import DialogManager from "./DialogManager";
import BreadCrumd from "./BreadCrumd";
import { I18n } from "react-redux-i18n";
import ProjectList from "./ProjectList";
import { DialogConfirm } from "./dialogConfirm";
import IconButton from "material-ui/IconButton";
import FolderIcon from "material-ui/svg-icons/file/folder";
import FolderOpenIcon from "material-ui/svg-icons/file/folder-open";
import Grid from "@material-ui/core/Grid";
import { FontIcon } from "material-ui";
import AddIcon from "@material-ui/icons/Add";
import SvgIcon from "@material-ui/core/SvgIcon";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
type ResultStyle = {
  wrapper: Object,
  content: Object,
  group_list: Object,
  subview: Object,
  subview_content: Object,
  project_list: Object,
  task_list: Object
};

const getType = (muiTheme): ResultStyle => {
  return {
    wrapper: {
      height: "calc(100vh - 65px)",
      width: "calc(100vw)",
      overflow: "hidden"
      // background: 'rgb(63, 81, 181)',
    },
    content: {
      height: "calc(100%)",
      width: "calc(100%)",
      display: "flex",
      minWidth: "680px",
      minHeight: "680px"
    },
    group_list: {
      height: "calc(100%) ",
      minWidth: "320px",
      width: "25%",
      // background: 'green',//'rgba(255,255,255,0.4)'
      transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
      boxSizing: "border-box",
      boxShadow:
        "rgba(0, 0, 0, 0.12) 0px 0px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
      borderRadius: "0px",
      paddingTop: 16
    },
    subview: {
      height: "calc(100%)",
      width: "100%",
      overflow: "hidden",
      minWidth: "680px"
    },
    subview_content: {
      height: "calc(100% - 120px)",
      marginTop: 0,
      width: "100%",
      overflow: "hidden",
      display: "flex",
      minWidth: "680px"
    },
    project_list: {
      height: "100%",
      minWidth: "450px",
      marginLeft: 8,
      width: "35%",
      overflowY: "auto",
      background: "rgba(255,255,255,0.4)",
      borderRight: "1px solid rgba(0,0,0,0.1)"
    },
    task_list: {}
  };
};

export default props => {
  const {
    group_id = "",
    groups = [],
    users = {},
    project_id = "",
    projects = [],
    resources,
    muiTheme,
    project_guide,
    changeGroup,
    changeProject = () => null,
    changeGroupName,
    changeProjectName,
    changeGroupNameForProject,
    showCreateGroup,
    showCreateProject,
    showEditGroup,
    showEditProject,
    onSubmit,
    changeData,
    hideDialog,
    showDialogConfirm,
    onCancelConfirm,
    onSubmitConfirm,
    checkProjectEdit,
    dashboard = {},
    toggerSiderbar,
    showArrow
  } = props;
  const style = getType(muiTheme);
  let project = projects.filter(item => project_id === item.id)[0] || {};
  let breakCrumd = getDataObject("data.group_data.address", dashboard) || [];
  let _projectName = getDataObject("data.projectName", dashboard);
  let dialogConfirm = getDataObject("data.dialogConfirm", dashboard) || {};
  let showGroup = getDataObject("data.showGroup", dashboard);
  const handleChange = type => (id, data) => {
    let isEditing = checkProjectEdit(project, dashboard);
    if (isEditing) {
      if (type === "project") {
        showDialogConfirm({
          type: "edit_project",
          show: true,
          projectTo: id
        });
      } else {
        showDialogConfirm({
          type: "edit_project",
          show: true,
          groupTo: id,
          groupData: data
        });
      }
    } else {
      if (type === "project") {
        changeProject(id);
      } else {
        changeGroup(id, data);
      }
    }
  };
  let withProject = project_id
      ? !showGroup
        ? "calc(55% - 8px)"
        : "calc(45% - 8px)"
      : "calc(100% - 8px)",
    withDetail = !showGroup ? "45%" : "55%";
  const handleMenuAction = key => event => {
    switch (key) {
      case "create_project":
        showCreateProject();
        break;
      default:
        break;
    }
  };
  return (
    <div style={style.wrapper}>
      <div style={style.content}>
        <DialogConfirm
          open={dialogConfirm.show}
          type={dialogConfirm.type}
          onCancel={onCancelConfirm}
          onSubmit={e => onSubmitConfirm(dialogConfirm)}
        />
        {showGroup && (
          <ListGroup
            showGroup={showGroup}
            toggerSiderbar={toggerSiderbar}
            groupStyle={style.group_list}
            items={groups}
            item_id={group_id}
            muiTheme={muiTheme}
            changeGroupName={changeGroupName}
            onChange={handleChange("group")}
            onCreateProject={showCreateProject}
            onCreateGroup={showCreateGroup}
          />
        )}
        <div style={style.subview}>
          <Paper rounded={false} style={{ width: "100%" }}>
            {!showGroup && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  paddingLeft: "12px"
                }}
              >
                <CompareArrowsIcon
                  style={{ fontSize: 40, cursor: "pointer" }}
                  onClick={event => {
                    toggerSiderbar(!showGroup);
                  }}
                />
              </div>
            )}
            <Grid
              container
              spacing={24}
              style={{ margin: 0, paddingTop: showGroup ? 12 : 0 }}
            >
              <Grid item xs={7} style={{ padding: 0 }}>
                <BreadCrumd
                  items={breakCrumd}
                  muiTheme={muiTheme}
                  onSelect={item => {
                    changeGroup(item.id, { name: item.name });
                  }}
                />
              </Grid>
              <Grid item xs={5} style={{ padding: 0 }}>
                <div style={{ textAlign: "right", paddingRight: 46 }}>
                  <TextField
                    style={{
                      padding: "16px 0px 0x 0px",
                      minWidth: "450px",
                      height: "36px",
                      width: "calc(35%)",
                      lineHeight: "10px",
                      fontSize: "14px",
                      background: "rgba(0, 0, 0, 0.04)",
                      borderRadius: "4px",
                      marginRight: 10
                    }}
                    underlineShow={false}
                    hintText={
                      <p style={{ paddingLeft: 10, margin: 0 }}>Search</p>
                    }
                    value={getDataObject("data.projectName", dashboard)}
                    onChange={e => changeProjectName(e.target.value)}
                  />{" "}
                  <Tooltip title="Create Project" aria-label="Create Project">
                    <Fab
                      color="primary"
                      style={{ borderRadius: 6, height: 36, width: 36 }}
                    >
                      <AddIcon onClick={handleMenuAction("create_project")} />
                    </Fab>
                  </Tooltip>
                </div>
              </Grid>
              <Grid item xs={4} style={{ padding: 0 }} />
            </Grid>
          </Paper>
          <SubView style={style.subview_content}>
            <div
              className="cool_scroll_smart"
              style={{ ...style.project_list, width: withProject }}
            >
              <ProjectList
                project_id={project_id}
                muiTheme={muiTheme}
                showGroup={showGroup}
                projectName={_projectName}
                groupName={getDataObject("data.groupName", dashboard)}
                resources={resources}
                projects={projects}
                project={
                  projects.filter(item => project_id === item.id)[0] || {}
                }
                changeProject={handleChange("project")}
                dashboard={dashboard}
                changeProjectName={changeProjectName}
                showCreateProject={showCreateProject}
              />
            </div>
            {project_id && (
              <div
                style={{
                  height: "100%",
                  minWidth: "420px",
                  width: withDetail,
                  background: "rgba(255,255,255,0.4)",
                  position: "relative"
                }}
              >
                {project_id && (
                  <ProjectEditer
                    groups={groups}
                    users={users}
                    muiTheme={muiTheme}
                    changeData={changeData}
                    dashboard={dashboard}
                    changeProject={changeProject}
                    project={
                      projects.filter(item => project_id === item.id)[0] || {}
                    }
                    onSubmit={onSubmit}
                  />
                )}
              </div>
            )}
          </SubView>
        </div>
      </div>
      <DialogManager
        dialogType={getDataObject("data.dialogType", dashboard)}
        showDialog={getDataObject("data.showDialog", dashboard)}
        groups={groups}
        users={users}
        hideDialog={hideDialog}
        changeData={changeData}
        dashboard={dashboard}
        muiTheme={muiTheme}
        onSubmit={onSubmit}
      />
    </div>
  );
};
