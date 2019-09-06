import * as React from "react";
import { List, makeSelectable } from "material-ui/List";
import wrapState from "../../../components/SelectableList/SelectableListNew";
import GroupTree from "./GroupTree";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import { getDataObject } from "../../../dgs-core";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
});
export default props => {
  const {
    groupStyle,
    zDepth = 1,
    items,
    item_id,
    muiTheme,
    onChange,
    groupName = "",
    changeGroupName,
    onCreateGroup,
    onCreateProject,
    classes,
    dashboard = {},
    toggerSiderbar,
    showGroup
  } = props;

  // const showGroup = getDataObject("data.showGroup", dashboard);
  const handleMenuAction = key => event => {
    switch (key) {
      case "create_group":
        onCreateGroup();

        break;
      default:
        break;
    }
  };
  let items_filtered = groupName
    ? items.filter(
        item => !!item.name.toLowerCase().includes(groupName.toLowerCase())
      )
    : items;
  return (
    <div style={groupStyle}>
      <div
        className="cool_scroll_smart"
        style={{ width: "100%", height: "calc(100% - 64px)", overflow: "auto" }}
      >
        <div style={{ height: 36 }}>
          <CompareArrowsIcon
            style={{ fontSize: 40, cursor: "pointer", paddingLeft: 16 }}
            onClick={_ => toggerSiderbar(false)}
          />
          <Tooltip title="Create Group" aria-label="Create Group">
            <Fab
              color="primary"
              style={{ borderRadius: 6, height: 36, width: 36, float: "right" }}
            >
              <AddIcon
                onClick={handleMenuAction("create_group")}
                onCreateProject={onCreateProject}
                onCreateGroup={onCreateGroup}
              />
            </Fab>
          </Tooltip>
        </div>
        <GroupTree
          redirectGroup={onChange}
          datas={items_filtered}
          item_id={item_id}
          id_selected={groupName}
          primary1Color={muiTheme.palette.primary1Color}
          secondaryTextColor={muiTheme.palette.secondaryTextColor}
        />
      </div>
    </div>
  );
};
