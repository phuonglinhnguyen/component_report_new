import axios from "axios";
import _ from "lodash";

import {
  MONITOR_LIST_SET_LIST,
  MONITOR_LIST_ERROR,
  MONITOR_RESET
} from "../constants";

import { errorCall } from "../../../../common/ajax/call_ajax/actions/call_ajax_action";
import  * as Router from 'connected-react-router'
import { getUsersByProjectId } from "./monitor_users_action";
import { BPMN_ENDPOINT, API_ENDPOINT ,APP_NAME} from '../../../../../constants';

export const getWorkflowList = project_id => async (dispatch, getState) => {
  try {
    const datas = await axios
      .get(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/designs`)
      .then(res => {
        const datas = [];
        const l = res.data.length;

        for (let index = 0; index < l; index++) {
          let data = res.data[index];
          if (data.publish_id) {
            try {
              const xml = new DOMParser().parseFromString(data.xml, "text/xml");
              let children = xml.childNodes[0].children;
              let children_length = children.length;
              for (let j = 0; j < children_length; j++) {
                if (children[j].nodeName === "bpmn:process") {
                  data.type = children[j]
                    .getAttribute("name")
                    .split("_")[0]
                    .toUpperCase();
                  break;
                }
              }
            } catch (error) {
              data.name = data.id;
              console.log(error);
            }

            datas.push(data);
          }
        }

        return _.orderBy(datas, ["name"], ["asc"]);
      });

    await dispatch(getUsersByProjectId(project_id));

    return dispatch({
      type: MONITOR_LIST_SET_LIST,
      datas
    });
  } catch (error) {
    dispatch({
      type: MONITOR_LIST_ERROR
    });
    return dispatch(errorCall(error.message));
  }
};

export const changeWorkflow = index => async (dispatch, getState) => {
  const data = getState().project_monitor.monitor_list.datas[index];

  return dispatch(Router.push(
    `/projects/${data.project_id}/monitor/${data.id}/0`
  ));
};

export const changeVersion = index => async (dispatch, getState) => {
  const { versions, data } = getState().project_monitor.monitor_item;

  return dispatch(Router.push(
    `/projects/${data.project_id}/monitor/${data.id}/${
      versions[index].id
    }`
  ));
};

export const resetState = () => ({
  type: MONITOR_RESET
});
