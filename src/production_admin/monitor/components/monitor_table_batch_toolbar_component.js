import React from "react";

import RaisedButton from "material-ui/RaisedButton";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import { Step, Stepper, StepButton } from "material-ui/Stepper";

import ExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";

import { Translate } from "react-redux-i18n";

class MonitorTableBatchToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    const { monitor_table, action_hidePopup } = this.props;
    let keyCode = event.keyCode;
    if (keyCode === 27 && monitor_table && monitor_table.show) {
      action_hidePopup();
      return;
    }
  }

  render() {
    const {
      activeStep,
      batch_selected,
      background3Color,
      action_setFirstStep,
      action_hidePopup
    } = this.props;

    return (
      <span style={{ cursor: "pointer" }} className="cursor">
        <Toolbar
          style={{
            height: 72,
            backgroundColor: background3Color
          }}
        >
          <ToolbarGroup>
            <Stepper
              linear={false}
              style={{ width: 700 }}
              activeStep={activeStep}
            >
              <Step>
                <StepButton onClick={action_setFirstStep}>
                  {"Remaining Batches"}
                </StepButton>
              </Step>
              {batch_selected && (
                <Step>
                  <StepButton>{`Batch: ${batch_selected.name}`}</StepButton>
                </Step>
              )}
            </Stepper>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <RaisedButton
              style={{
                minWidth: 40,
                position: "absolute",
                margin: 0,
                top: 0,
                left: 5
              }}
              primary={true}
              tooltip={<Translate value="commons.action.close" />}
              icon={<ExpandMoreIcon />}
              onClick={action_hidePopup}
            />
          </ToolbarGroup>
        </Toolbar>
      </span>
    );
  }
}

export default MonitorTableBatchToolbar;
