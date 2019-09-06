import React from "react";

import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import SelectField from "material-ui/SelectField";

import { Translate } from "react-redux-i18n";

class MonitorToolbar extends React.PureComponent {
  render() {
    const {
      monitor_list,
      monitor_item,
      palette,
      ajax_call_ajax,
      actions
    } = this.props;

    if (ajax_call_ajax.is_calling) {
      return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <FlatButton
              fullWidth={true}
              label={<Translate value={ajax_call_ajax.action_type} />}
            />
          </ToolbarGroup>
        </Toolbar>
      );
    }

    let workflow_id, deployment_id;
    if (monitor_item.data) {
      workflow_id = monitor_item.data.id;
      if (monitor_item.data.version) {
        deployment_id = monitor_item.data.version.deploymentId;
      }
    }

    return (
      <Toolbar>
        <ToolbarGroup>
          <SelectField
            style={{ height: 66, width: 220 }}
            value={workflow_id}
            floatingLabelFixed={true}
            floatingLabelText={
              <Translate dangerousHTML value="projects.workflow.workflow" />
            }
            onChange={(event, index, value) => actions.changeWorkflow(index)}
            floatingLabelStyle={{ color: palette.primary1Color }}
            underlineStyle={{ borderColor: palette.primary1Color }}
            iconStyle={{ fill: palette.primary1Color }}
          >
            {monitor_list.datas&&monitor_list.datas.map((d, i) => (
              <MenuItem key={i} value={d.id} primaryText={d.type} />
            ))}
          </SelectField>
          <SelectField
            value={deployment_id}
            style={{ height: 66, width: 220, marginLeft: 40 }}
            floatingLabelFixed={true}
            floatingLabelText={
              <Translate dangerousHTML value="projects.workflow.version" />
            }
            floatingLabelStyle={{ color: palette.primary1Color }}
            underlineStyle={{ borderColor: palette.primary1Color }}
            iconStyle={{ fill: palette.primary1Color }}
            onChange={(event, index, value) => actions.changeVersion(index)}
          >
            {monitor_item.versions &&
              monitor_item.versions.map((v, i) => (
                <MenuItem
                  key={i}
                  value={v.deploymentId}
                  primaryText={v.version}
                />
              ))}
          </SelectField>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default MonitorToolbar;
