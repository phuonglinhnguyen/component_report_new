import * as React from "react";
import IconButton from "material-ui/IconButton";
import HomeIcon from "material-ui/svg-icons/action/home";
import AddCircleIcon from "material-ui/svg-icons/content/add-box";
import ChevronRightIcon from "material-ui/svg-icons/navigation/chevron-right";
import FlatButton from "material-ui/FlatButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import Popover from "material-ui/Popover";
import StorageIcon from "@material-ui/icons/Storage";

import Menu from "material-ui/Menu";
const getStyle = () => {
  return {
    display: "flex",
    flex: "flex-inline",
    width: "100%",
    height: "42px"
  };
};

const Breack = () => (
  <div
    style={{
      border: 0,
      boxSizing: "border-box",
      display: "inline-block",
      textDecoration: "none",
      margin: 0,
      padding: "12px 0px 12px 0px ",
      outline: "none",
      fontSize: 0,
      fontWeight: "inherit",
      position: "relative",
      overflow: "visible",
      transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
      width: "24px",
      height: "48px",
      background: "none"
    }}
  >
    <ChevronRightIcon color="rgba(0,0,0,.4)" />
  </div>
);

export default props => {
  const { style = {}, items = [], onSelect, onAction } = props;
  return (
    <div style={{ ...getStyle(), ...style }}>
      {items &&
        items.map(item => {
          if (item.id === "all") {
            return (
              <React.Fragment key={item.id}>
                <IconButton
                  onClick={event => {
                    event.preventDefault();
                    onSelect(item);
                  }}
                >
                  <StorageIcon color="rgba(0,0,0,.6)" />
                </IconButton>
                <Breack />
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={item.id}>
              <FlatButton
                style={{ marginTop: 6, padding: 0 }}
                label={item.name}
                onClick={event => {
                  event.preventDefault();
                  onSelect(item);
                }}
              />

              <Breack />
            </React.Fragment>
          );
        })}
    </div>
  );
};
