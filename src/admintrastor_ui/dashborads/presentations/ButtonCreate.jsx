import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
export default class ButtonCreate extends React.PureComponent {
  state = {
    openMenu: false
  };
  handleOpenMenu = () => {
    this.setState({ openMenu: true });
  };
  handleRequestClose = () => {
    this.setState({
      openMenu: false
    });
  };
  handleMenuAction = key => event => {
    const { onCreateProject, onCreateGroup } = this.props;
    this.handleRequestClose();
    switch (key) {
      case "create_project":
        onCreateProject();
        break;
      case "create_group":
        onCreateGroup();

        break;
      default:
        break;
    }
  };
  render() {
    return (
      <React.Fragment>
        <RaisedButton
          style={{ margin: 0 }}
          primary={true}
          label="Create Group"
          onClick={this.handleMenuAction("create_group")}
          // onClick={this.handleOpenMenu}
        />
        <Popover
          open={this.state.openMenu}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          targetOrigin={{ horizontal: "left", vertical: "bottom" }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Create Group" />
            <MenuItem
              primaryText="Create Project"
              onClick={this.handleMenuAction("create_project")}
            />
          </Menu>
        </Popover>
      </React.Fragment>
    );
  }
}
