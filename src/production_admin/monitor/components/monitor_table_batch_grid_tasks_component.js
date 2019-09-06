import React from "react";

import Subheader from "material-ui/Subheader";
import Paper from "material-ui/Paper";
import { List, ListItem, makeSelectable } from "material-ui/List";
import wrapState from "../../../../common/selectable_list_new";
import Avatar from "material-ui/Avatar";

import FileFolderIcon from "material-ui/svg-icons/file/folder";
import ActionAssignmentIcon from "material-ui/svg-icons/action/assignment";

import { numberForReport } from "../../../../../utils/format_number";

let SelectableList = makeSelectable(List);
SelectableList = wrapState(SelectableList);

class MonitorTableBatchGridTasks extends React.PureComponent {
  render() {
    const {
      sum,
      show_group,
      batch_count,
      task_index,
      instances,
      primary1Color,
      action_selectTask,
      project_id
    } = this.props;
    const items = [];
    instances.forEach(function(e, i) {
      items.push(
        <ListItem
          key={i}
          value={i}
          primaryText={e.name || e.id}
          onClick={e => {
            if (task_index === i) {
              action_selectTask(project_id, -1);
            }
          }}
          leftAvatar={<Avatar icon={<FileFolderIcon />} />}
          rightIcon={
            <div
              style={{
                width: "auto",
                color: primary1Color,
                lineHeight: "24px",
                fontWeight: 500
              }}
            >
              {numberForReport(e.instances)}
            </div>
          }
        />
      );
    });

    return (
      <Paper
        style={{
          flex: "0 0 25%",
          margin: 5
        }}
      >
        {show_group && (
          <List>
            <ListItem
              leftAvatar={
                <Avatar
                  icon={<ActionAssignmentIcon />}
                  backgroundColor={primary1Color}
                />
              }
              primaryText="Batches"
              rightIcon={
                <div
                  style={{
                    width: "auto",
                    color: primary1Color,
                    lineHeight: "24px",
                    fontWeight: 500
                  }}
                >
                  {numberForReport(batch_count)}
                </div>
              }
            />
            <ListItem
              leftAvatar={
                <Avatar
                  icon={<ActionAssignmentIcon />}
                  backgroundColor={primary1Color}
                />
              }
              primaryText="Docs"
              rightIcon={
                <div
                  style={{
                    width: "auto",
                    color: primary1Color,
                    lineHeight: "24px",
                    fontWeight: 500
                  }}
                >
                  {numberForReport(sum)}
                </div>
              }
            />
          </List>
        )}
        <Subheader>Remaining Tasks</Subheader>
        <div className="cool_scroll" style={{ height: "412px" }}>
          <SelectableList
            handleRequestChange={i => {
              action_selectTask(project_id, i);
            }}
            defaultValue={task_index}
          >
            {items}
          </SelectableList>
        </div>
      </Paper>
    );
  }
}

export default MonitorTableBatchGridTasks;
