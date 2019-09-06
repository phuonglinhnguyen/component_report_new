import React from "react";

import CanvasComponent from "../../../../common/bpmn";

import Modeler from "../../../../common/bpmn/libs/modeler";
import _ from "lodash";

class MonitorCanvas extends React.Component {
  componentDidMount() {
    const { project, palette, match, actions } = this.props;
    let modeler = new Modeler({
      type: "monitor",
      project_id: project.id,
      project_name: project.name,
      canvas_id: "#js-canvas",
      onClickElement: (event => {
        const id = event.element.id;
        const { batch_selected } = this.props.monitor_table;
        if (!batch_selected) {
          const { instances } = this.props.monitor_item;
          if (instances) {
            const index = instances.findIndex(e => id === e.id);
            this.props.actions.selectTaskFirst(index);
          }
        } else {
          const { batch_datas } = this.props.monitor_table;
          if (batch_datas) {
            const index = batch_datas.findIndex(e => id === e.id);
            this.props.actions.selectTaskSecond(project.id,index);
          }
        }
      }).bind(this),
      primary1Color: palette.primary1Color,
      accent1Color: palette.accent1Color
    });

    actions.setCanvas(modeler);

    this.onZoom = this.onZoom.bind(this);
    this.downloadPDF = this.downloadPDF.bind(this);
    this.downloadXML = this.downloadXML.bind(this);

    actions.getWorkflowById(
      match.params.workflow_id,
      match.params.deployment_id
    );
  }

  shouldComponentUpdate(nextProps) {
    return (
      !_.isEqual(nextProps.match.params, this.props.match.params) ||
      !_.isEqual(nextProps.monitor_item, this.props.monitor_item)
    );
  }

  componentWillUnmount() {
    this.props.actions.resetStateItem();
    this.props.actions.resetStateTable();
  }

  componentWillUpdate(nextProps) {
    const { actions } = nextProps;

    if (
      nextProps.match.params.workflow_id !== this.props.match.params.workflow_id
    ) {
      actions.getWorkflowById(
        nextProps.match.params.workflow_id,
        nextProps.match.params.deployment_id
      );
    } else {
      if (
        nextProps.match.params.deployment_id !==
        this.props.match.params.deployment_id
      ) {
        actions.getVersionByDeploymentId(nextProps.match.params.deployment_id);
      }
    }
  }

  onZoom(is_zoom_out) {
    this.props.monitor_item.modeler.onZoom(is_zoom_out);
  }

  downloadXML(e) {
    const { data, modeler } = this.props.monitor_item;
    if (data) {
      modeler.downloadXML();
    }
  }

  downloadPDF(e) {
    const { data, modeler } = this.props.monitor_item;
    if (data) {
      modeler.downloadPDF();
    }
  }

  render() {
    const { palette, monitor_item, actions } = this.props;
    return (
      <div
        style={{
          height: monitor_item.is_expand
            ? "calc(100vh - 56px)"
            : "calc(100vh - 170px)",
          backgroundColor: palette.background4Color,
          position: "relative"
        }}
      >
        <CanvasComponent
          is_view={true}
          is_expand={monitor_item.is_expand}
          action_resetZoom={() => {
            monitor_item.modeler.viewer
              .get("canvas")
              .zoom("fit-viewport", "center");
          }}
          action_onZoom={this.onZoom}
          action_expandView={actions.expandView}
          action_downloadPDF={this.downloadPDF}
          action_downloadXML={this.downloadXML}
        />
      </div>
    );
  }
}

export default MonitorCanvas;
