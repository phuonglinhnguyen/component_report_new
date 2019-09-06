import React from "react";

import _ from "lodash";

import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import ListVirtualized from "react-virtualized/dist/commonjs/List";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import { numberForReport } from "../../../../../utils/format_number";
import FiberManualRecordIcon from "material-ui/svg-icons/av/fiber-manual-record";
import GroupIcon from "material-ui/svg-icons/social/group";
import ChevronRighIcon from "material-ui/svg-icons/navigation/chevron-right";
import * as global_constants from "../../../../../constants";
import { getDataObject } from "@dgtx/coreui";
import clone from 'clone';

const styles = {
  icon_open: {
    position: "fixed",
    height: 38,
    zIndex: 10,
    top: "49%",
    right: -60
  },
  icon_close: {
    position: "fixed",
    minWidth: 40,
    right: 302
  }
};

let timeoutId = 0;
class MonitorUsers extends React.Component {
  state = {
    dataView: []
  }
  
  componentDidMount() {
    const self =this;
    const { project, actions } = this.props;
    const interval_id = setInterval(()=>{
      this.handleGetUserOnline();
    }, 30000);
    this.interval_id = interval_id;
  }

  handleGetUserOnline=()=>{
    const { actions, match } = this.props;
    const { getUsersByProjectId } = actions;
    let projectId = clone(getDataObject("params.projectid",match) || undefined)
    if(projectId && getUsersByProjectId){
      getUsersByProjectId(projectId);
    }
  }

  componentWillReceiveProps = (nextProps)=>{
    let crrentData = this.state.dataView;
    let nextData = clone(getDataObject("monitor_users.project_users",nextProps) || [])
    if(!_.isEqual(crrentData, nextData) && nextData.length > 0){
      this.setState({
        dataView: nextData
      })
    }
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(this.props.monitor_users, nextProps.monitor_users);
  }

  componentWillUnmount() {
    clearInterval(this.interval_id);
  }

  inputSearchChange = e => {
    const { actions } = this.props;
    const value = e.target.value.toLowerCase();
    actions.inputSearchChange(value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      actions.filterByName(value);
    }, global_constants.TIME_OUT_KEY_SEARCH);
  };

  render() {
    const { palette, monitor_item, monitor_users, actions } = this.props;
    const {
      show,
      text_search,
      results,
      total_working_user,
      project_users = [],
      working_users
    } = monitor_users;
    const { dataView } = this.state;
    const total_project_users = project_users.length;

    if (!show) {
      return (
        <div
          id="overplay_users"
          onMouseEnter={() =>
            (document.getElementById("overplay_users").style.right = 0)
          }
          onMouseLeave={() => {
            document.getElementById("overplay_users").style.right = "-60px";
          }}
          style={styles.icon_open}
        >
          <RaisedButton
            label="Users"
            primary={true}
            icon={<GroupIcon />}
            onClick={() => {
              actions.showPopup();
            }}
          />
        </div>
      );
    }

    return (
      <Paper
        style={{
          height: monitor_item.is_expand
            ? "calc(100vh - 56px)"
            : "calc(100vh - 170px)",
          flex: "0 0 300px",
          position: "relative"
        }}
      >
        <RaisedButton
          primary={true}
          style={styles.icon_close}
          icon={<ChevronRighIcon />}
          onClick={() => {
            actions.hidePopup();
          }}
        />
        <List>
          <ListItem
            primaryText="Online"
            rightIcon={
              <div
                style={{
                  width: "auto",
                  color: palette.primary1Color,
                  lineHeight: "24px",
                  fontWeight: 500
                }}
              >
                {numberForReport(total_working_user)}
              </div>
            }
            onClick={event => this.handleGetUserOnline()}
          />
          <ListItem
            primaryText="Offline"
            rightIcon={
              <div
                style={{
                  width: "auto",
                  lineHeight: "24px",
                  fontWeight: 500
                }}
              >
                {numberForReport(total_project_users - total_working_user)}
              </div>
            }
          />
        </List>
        <div style={{ width: "100%", marginTop: 8 }}>
          <div style={{ margin: "0 15px" }}>
            <TextField
              value={text_search}
              onChange={this.inputSearchChange}
              hintStyle={{ bottom: 0 }}
              hintText={
                <Subheader style={{ paddingLeft: 0 }}>
                  <span
                    style={{
                      color: palette.primary1Color,
                      paddingRight: 5,
                      fontWeight: 500
                    }}
                  >
                    {total_project_users}
                  </span>
                  Users
                </Subheader>
              }
              fullWidth={true}
            />
          </div>
        </div>
        <div
          style={{
            height: "calc(100% - 170px)"
          }}
        >
          <AutoSizer>
            {({ height, width }) => (
              <ListVirtualized
                className="cool_scroll"
                width={width}
                height={height}
                rowCount={dataView.length}
                rowHeight={53}
                rowRenderer={options => {
                  const { key, index, style } = options;
                  const data = dataView[index];
                  return (
                    <div key={key} style={style}>
                      <ListItem
                        primaryText={`${data.username} ${data.location && `--> ${data.location}` || ""}` }
                        rightIcon={
                          <FiberManualRecordIcon
                            color={data.is_online ? palette.primary1Color : ""}
                          />
                        }
                      />
                    </div>
                  );
                }}
              />
            )}
          </AutoSizer>
        </div>
      </Paper>
    );
  }
}

export default MonitorUsers;
