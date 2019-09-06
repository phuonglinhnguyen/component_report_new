import React from "react";
import PropTypes from "prop-types";
import { Translate, I18n } from "react-redux-i18n";
import { isEqual } from "lodash";

import ExpandLess from "material-ui/svg-icons/hardware/keyboard-arrow-right";
import ExpandMore from "material-ui/svg-icons/navigation/expand-more";

import CloseIcon from "material-ui/svg-icons/navigation/close";

import IconButton from "material-ui/IconButton";

import FloatingActionButton from "material-ui/FloatingActionButton";

import Toggle from "material-ui/Toggle";
import { Card, CardText, CardHeader, CardActions } from "material-ui/Card";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import AutoComplete from "material-ui/AutoComplete";

import { getDataObject } from "../../../dgs-core";
import TextUser from "./TextUser";
import { TableX } from "../../../components/TableX";
import { DASHBROAD_DIALOG_TYPE_EDIT_PROJECT } from "../Dashboard.actionsCreator";
import GroupSelect from "./GroupSelect";
class ProjectEditer extends React.Component {
  state = {
    dataSourceUserName: [],
    role: ""
  };
  handleUpdateInputUserName = value => {
    const { users } = this.props;
    this.setState({
      dataSourceUserName: []
    });
    let dataSourceUserName = [];
    if (users.data && users.data.OtherMember) {
      dataSourceUserName = users.data.OtherMember.filter(
        item =>
          Object.values(item)
            .join(" ")
            .indexOf(value) > -1
      ).map(item => ({
        text: item.UserName,
        value: (
          <MenuItem
            primaryText={
              <p
                style={{
                  display: "inline",
                  height: "12",
                  whiteSpace: "nowrap"
                }}
              >
                <span style={{ margin: "0x 5px", color: "green" }}>
                  {item.UserName}
                </span>
                <span>{item.FullName}</span>
                <span>{item.Department}</span>
              </p>
            }
            secondaryText={item.WorkLocation}
          />
        )
      }));
    }
    if (dataSourceUserName.length > 10) {
      this.setState({
        dataSourceUserName: dataSourceUserName.slice(0, 10)
      });
    } else {
      dataSourceUserName;
    }
  };
  handleSearch = (searchText: string, key: string) => {
    return true;
  };
  handleChangeRole = (event, index, value) => this.setState({ role: value });
  render() {
    const {
      muiTheme,
      project,
      changeData,
      changeProject,
      dashboard,
      getData,
      users,
      groups,
      onSubmit
    } = this.props;
    let active = getDataObject("data.edit.active", dashboard);
    return (
      <React.Fragment>
        <CardHeader
          title={
            <p style={{ color: "rgb(63, 81, 181)", margin: 0 }}>
              PROJECT DETAI
            </p>
          }
          subtitle={`Project Name: ${project.name}`}
        />
        {!isEqual(
          getDataObject(
            "data.edit.name,customer,group_id,group_name,priority,folder,active,project_managers,designers,qc_admins",
            dashboard
          ),
          getDataObject(
            "name,customer,group_id,group_name,priority,folder,active,project_managers,designers,qc_admins",
            project
          )
        ) ? (
          <div
            style={{ position: "absolute", top: 8, right: 16, zIndex: 1000 }}
          >
            <RaisedButton
              label="CANCEL"
              style={{ margin: 12 }}
              onClick={event => {
                event.preventDefault();
                changeProject(project.id);
              }}
            />
            <RaisedButton
              label="UPDATE"
              primary={true}
              onClick={event => {
                event.preventDefault();
                onSubmit(DASHBROAD_DIALOG_TYPE_EDIT_PROJECT);
              }}
            />
          </div>
        ) : (
          <div style={{ position: "absolute", top: 0, right: 0, zIndex: 1000 }}>
            <IconButton
              style={{ margin: 8 }}
              tooltip="Close"
              onClick={event => {
                event.preventDefault();
                changeProject();
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}
        <CardText style={{ paddingTop: 0 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              flexDirection: "row",
              width: "calc(100%)",
              paddingBottom: 16
            }}
          >
            <div
              style={{
                width: "calc(50% - 16px)",
                marginRight: 16
              }}
            >
              <TextField
                fullWidth={true}
                autoFocus={true}
                value={getDataObject("data.edit.name", dashboard)}
                onChange={event => {
                  changeData("data.edit.name", event.target.value);
                }}
                floatingLabelText={
                  <Translate value="dashboard.form.input_project_name_title" />
                }
                hintText={
                  <Translate value="dashboard.form.input_project_name_hint" />
                }
                floatingLabelFixed={true}
              />
              <br />
              <TextField
                fullWidth={true}
                value={getDataObject("data.edit.customer", dashboard)}
                onChange={event => {
                  changeData("data.edit.customer", event.target.value);
                }}
                floatingLabelText={
                  <Translate value="dashboard.form.input_customer_name_title" />
                }
                hintText={
                  <Translate value="dashboard.form.input_group_name_hint" />
                }
                floatingLabelFixed={true}
              />
              <br />
              {/* <GroupSelect
                groups={groups}
                group_id={getDataObject('data.edit.group_id', dashboard)}
                group_name={getDataObject('data.edit.group_name', dashboard)}
                primary1Color={muiTheme.palette.primary1Color}
                secondaryTextColor={muiTheme.palette.secondaryTextColor}
                onChange={(id, data) => {
                  changeData('data.edit.group_id',data.id)
                  changeData('data.edit.group_name',data.name)
                }}
                fullWidth={true}
                floatingLabelText={<Translate value='dashboard.form.input_group_name_title' />}
                hintText={<Translate value='dashboard.form.input_group_name_hint' />}
                floatingLabelFixed={true}
              />
              <br /> */}
              <Toggle
                style={{ marginTop: "35px" }}
                label={
                  active ? (
                    <p style={{ display: "inline" }}>
                      Status: <span style={{ color: "green" }}>Active</span>
                    </p>
                  ) : (
                    <p style={{ display: "inline" }}>
                      Status: <span style={{ color: "red" }}>Inactive</span>
                    </p>
                  )
                }
                labelPosition="right"
                defaultToggled={active}
                onToggle={(event, isInputChecked) => {
                  changeData("data.edit.active", isInputChecked);
                }}
              />
            </div>
            <div style={{ width: "calc(50% - 16px)" }}>
              <TextField
                fullWidth={true}
                value={getDataObject("data.edit.priority", dashboard)}
                onChange={event => {
                  changeData("data.edit.priority", event.target.value);
                }}
                floatingLabelText={
                  <Translate value="dashboard.form.input_project_priority_title" />
                }
                hintText={
                  <Translate value="dashboard.form.input_project_priority_hint" />
                }
                floatingLabelFixed={true}
              />
              <br />
              <TextField
                fullWidth={true}
                value={getDataObject("data.edit.folder", dashboard)}
                onChange={event => {
                  changeData("data.edit.folder", event.target.value);
                }}
                floatingLabelText={
                  <Translate value="dashboard.form.input_project_path_title" />
                }
                hintText={
                  <Translate value="dashboard.form.input_project_path_hint" />
                }
                floatingLabelFixed={true}
              />
              <br />
            </div>
          </div>
          <div style={{ paddingBottom: 16 }}>
            <TextUser
              floatingLabelText={
                <p
                  style={{
                    color: "rgb(63, 81, 181)",
                    margin: 0,
                    fontSize: 15,
                    fontWeight: 500
                  }}
                >
                  PROJECT MANAGER
                </p>
              }
              value={getDataObject("data.edit.project_managers", dashboard)}
              onUpdateInput={name => {
                let value = getDataObject(
                  "data.edit.project_managers",
                  dashboard
                );
                value = Array.isArray(value) ? [...value, name] : [name];
                changeData("data.edit.project_managers", value);
              }}
              onDeleteItem={name => {
                let value = getDataObject(
                  "data.edit.project_managers",
                  dashboard
                );
                value = value.filter(item => item !== name);
                changeData("data.edit.project_managers", value);
              }}
              users={users}
            />
            <br />
          </div>
          <div style={{ paddingBottom: 16 }}>
            <TextUser
              floatingLabelText={
                <p
                  style={{
                    color: "rgb(63, 81, 181)",
                    margin: 0,
                    fontSize: 15,
                    fontWeight: 500
                  }}
                >
                  PROJECT DESIGNER
                </p>
              }
              value={getDataObject("data.edit.designers", dashboard)}
              onUpdateInput={name => {
                let value = getDataObject("data.edit.designers", dashboard);
                value = Array.isArray(value) ? [...value, name] : [name];
                changeData("data.edit.designers", value);
              }}
              onDeleteItem={name => {
                let value = getDataObject("data.edit.designers", dashboard);
                value = value.filter(item => item !== name);
                changeData("data.edit.designers", value);
              }}
              users={users}
            />
            <br />
          </div>
          <TextUser
            floatingLabelText={
              <p
                style={{
                  color: "rgb(63, 81, 181)",
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 500
                }}
              >
                QC ADMIN
              </p>
            }
            value={getDataObject("data.edit.qc_admins", dashboard)}
            onUpdateInput={name => {
              let value = getDataObject("data.edit.qc_admins", dashboard);
              value = Array.isArray(value) ? [...value, name] : [name];
              changeData("data.edit.qc_admins", value);
            }}
            onDeleteItem={name => {
              let value = getDataObject("data.edit.qc_admins", dashboard);
              value = value.filter(item => item !== name);
              changeData("data.edit.qc_admins", value);
            }}
            users={users}
          />
          <br />
        </CardText>
      </React.Fragment>
    );
  }
}

export default ProjectEditer;
