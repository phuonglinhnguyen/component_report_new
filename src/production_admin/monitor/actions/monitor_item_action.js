import axios from "axios";
import clone from "clone";
import { BPMN_ENDPOINT, API_ENDPOINT ,APP_NAME} from '../../../../../constants';
import {
  MONITOR_ITEM_EXPAND,
  MONITOR_ITEM_SET_ITEM,
  MONITOR_ITEM_SET_CANVAS,
  MONITOR_TABLE_RESET,
  MONITOR_ITEM_RESET
} from "../constants";

import {
  beginCall,
  completeCall,
  errorCall,
  isCalling
} from "../../../../common/ajax/call_ajax/actions/call_ajax_action";
import {
  getDetailTask,
  getWorkflowsByProjectId
} from "../../workflow/actions/workflow_item_history_action";
import { getActivityInstances } from "./monitor_table_action";
import * as ReactRouter from 'connected-react-router'

import { I18n } from "react-redux-i18n";

export const expandView = expand => ({
  type: MONITOR_ITEM_EXPAND,
  expand
});

export const setCanvas = modeler => ({
  type: MONITOR_ITEM_SET_CANVAS,
  modeler
});

const setXmlForCanvas = async (modeler, xml, instances) => {
  modeler.viewer.clear();
  modeler.importXML(xml, instances, () => {
    modeler.updateInstances(instances);
  });
};

export const getWorkflowById = (workflow_id, deployment_id) => async (
  dispatch,
  getState
) => {
  if (isCalling(getState())) {
    return;
  }
  dispatch(beginCall(I18n.t("commons.actions.loading")));

  const { monitor_item, monitor_list } = getState().project_monitor;

  const data = monitor_list.datas.find(d => d.id === workflow_id);

  try {
    const versions_ = await getWorkflowsByProjectId(data.project_id);

    const versions = [];
    versions_.forEach(function(version) {
      if (version.key === data.definition_key) {
        versions.push(version);
      }
    });

    let version;
    if (!deployment_id || deployment_id === "0") {
      version = versions.find(v => v.deploymentId === data.publish_id);
    } else {
      version = versions.find(v => v.id === deployment_id);
    }

    let instances;
    if (version) {
      data.version = version;
      monitor_item.modeler.changeType(data.type);
      const detailTask = await getDetailTask(data.project_id, data.version.id);
      instances = detailTask.instances;

      await setXmlForCanvas(monitor_item.modeler, data.xml, instances);
      await dispatch(getActivityInstances(data.project_id,data.version.id));
    }

    dispatch(completeCall());

    dispatch({
      type: MONITOR_ITEM_SET_ITEM,
      versions,
      instances,
      data
    });

    return dispatch(ReactRouter.push(
      `/projects/${data.project_id}/monitor/${data.id}/${
        data.version.id
      }`
    ));
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

export const getVersionByDeploymentId = deployment_id => async (
  dispatch,
  getState
) => {
  if (isCalling(getState())) {
    return;
  }

  const { monitor_item } = getState().project_monitor;
  const data = clone(monitor_item.data);

  if (data.version && data.version.id === deployment_id) {
    return;
  }
  dispatch({
    type: MONITOR_TABLE_RESET
  });

  dispatch(beginCall(I18n.t("commons.actions.loading")));
  try {
    const version = monitor_item.versions.find(v => v.id === deployment_id);

    data.version = version;
    const xml = await axios
      .get(
        `${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${data.project_id}/designs/${data.id}/publish/${
          data.version.deploymentId}/xml`
      )
      .then(res => res.data);
    data.xml = xml;

    const { instances } = await getDetailTask(data.project_id, data.version.id);
    await setXmlForCanvas(monitor_item.modeler, xml, data.version.id);
    await dispatch(getActivityInstances(data.project_id, data.version.id));

    dispatch(completeCall());

    return dispatch({
      type: MONITOR_ITEM_SET_ITEM,
      instances,
      data
    });
  } catch (error) {
    return dispatch(errorCall(error.message));
  }
};

export const resetStateItem = () => ({
  type: MONITOR_ITEM_RESET
});
