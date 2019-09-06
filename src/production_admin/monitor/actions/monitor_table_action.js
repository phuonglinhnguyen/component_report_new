import axios from "axios";
import _ from "lodash";
import { BPMN_ENDPOINT, API_ENDPOINT ,APP_NAME} from '../../../../../constants';
import {
  MONITOR_TABLE_SET_LIST_ACTIVITY_INSTANCES,
  MONITOR_TABLE_SET_LIST_BATCH_ID_INSTANCES,
  MONITOR_TABLE_SET_STEP_FIRST,
  MONITOR_TABLE_SET_TASK_FIRST_INDEX,
  MONITOR_TABLE_SET_TASK_SECOND_INDEX,
  MONITOR_TABLE_RECLAIM,
  MONITOR_TABLE_ASSIGN_USER,
  MONITOR_TABLE_GETTING,
  MONITOR_TABLE_RESET,
  MONITOR_TABLE_SHOW_POPUP,
  MONITOR_TABLE_HIDE_POPUP
} from "../constants";
import { getDataObject } from "@dgtx/coreui";
import clone from 'clone';

export const hidePopup = () => ({
  type: MONITOR_TABLE_HIDE_POPUP
});

export const showPopup = () => ({
  type: MONITOR_TABLE_SHOW_POPUP
});

export const setFirstStep = () => (dispatch, getState) => {
  const { modeler, instances } = getState().project_monitor.monitor_item;
  modeler.updateInstances(instances);

  return dispatch({
    type: MONITOR_TABLE_SET_STEP_FIRST
  });
};

export const getActivityInstances = (project_id, id) => async (dispatch, getState) => {
  dispatch({
    type: MONITOR_TABLE_GETTING
  });

  try {
    const datas = await axios
      .get(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/processes/${id}/activity_instances/statistics`)
      .then(res => res.data)
      .catch(e => {
        console.log(e);
        return [];
      });

    let sum = 0;
    datas.forEach(function (data) {
      let total = 0;
      let total_not_done = 0;

      const activities = data.activities;
      const keys = Object.getOwnPropertyNames(activities);
      for (let i = 0; i < keys.length; i++) {
        var element = activities[keys[i]];
        if (element.name === "Doc-sets Instances") {
          total = element.count;
        } else if (element.name === "Docs Instances") {
          total_not_done = element.count;
        }
      }
      const import_path = data.import_path;
      data.name = import_path.substring(
        import_path.split("/", 3).join("/").length + 1,
        import_path.length
      );

      sum += total;
      data.total = total;
      data.processed_documents = total - total_not_done;

      let finish = data.processed_documents < 1 ? 0 : (data.processed_documents / total * 100);
      data.finish = finish;
    });

    return dispatch({
      type: MONITOR_TABLE_SET_LIST_ACTIVITY_INSTANCES,
      datas: _.orderBy(datas, ["finish"], ["desc"]),
      sum
    });
  } catch (error) {
    return dispatch({
      type: MONITOR_TABLE_SET_LIST_ACTIVITY_INSTANCES
    });
  }
};

export const selectBatch = index => async (dispatch, getState) => {
  const data = getState().project_monitor.monitor_table.datas[index];

  const tasks = data.activities;
  const keys = Object.getOwnPropertyNames(tasks);

  const batch_datas = [];
  keys.forEach(function (key) {
    const { id, name, count, type } = tasks[key];
    if (type === "userTask") {
      batch_datas.push({ id, name: name || id, instances: count });
    }
  });

  const { modeler } = getState().project_monitor.monitor_item;
  modeler.updateInstances(batch_datas);

  return dispatch({
    type: MONITOR_TABLE_SET_LIST_BATCH_ID_INSTANCES,
    data,
    batch_datas: _.orderBy(batch_datas, ["instances"], ["desc"])
  });
};

export const selectTaskFirst = (projectId, index) => async (dispatch, getState) => {
  const {
    monitor_item,
    monitor_table
  } = getState().project_monitor;
  const instance = clone(getDataObject(['instances', index], monitor_item));
  const data_originals = clone(getDataObject("data_originals", monitor_table));
  if(!instance || !data_originals) return;
  const datas = [];
  if (index > -1) {
    let sum = 0;
    data_originals && data_originals.forEach(function (data) {
      const activities = data.activities;
      const keys = Object.keys(activities);

      for (var i = 0; i < keys.length; i++) {
        if (activities[keys[i]].id === instance.id) {
          datas.push(data);
          sum += data.total;
          break;
        }
      }
    });

    return dispatch({
      type: MONITOR_TABLE_SET_TASK_FIRST_INDEX,
      datas,
      index,
      sum
    });
  } else {
    return dispatch({
      type: MONITOR_TABLE_SET_TASK_FIRST_INDEX,
      datas: data_originals,
      index: -1,
      sum: 0
    });
  }
};

const getUserTask = async (project_id, process_instance_id, task_id, working_users) => {
  const datas = await axios
    .get(
      `${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/process-instances/${process_instance_id}/task_instances?taskDefinitionKey=${task_id}`
    )
    .then(res => res.data)
    .catch(e => {
      console.log(e);
      return [];
    });

  datas.forEach(function (data) {
    const working_user = working_users.find(w => w === data.assignee);
    if (working_user) {
      data.is_online = true;
    }

    const variables = data.variables;
    if (variables) {
      for (let i = 0; i < variables.length; i++) {
        try {
          let variable = variables[i];
          if (variable.name === "input_data") {
            const s2_url = variable.value.s2_url;
            data.doc_id = variable.value.id;
            data.s2_url = s2_url;
            if (s2_url) {
              data.doc_name = s2_url.split(/(\\|\/)/g).pop();
            }
          }
        } catch (error) {
          console.log("########ERROR#############");
          console.log(data);
          console.log("########ERROR#############");
        }
      }
    }
  });
  return datas;
};

export const selectTaskSecond = (project_id,index) => async (dispatch, getState) => {
  const {
    batch_datas,
    batch_selected
  } = getState().project_monitor.monitor_table;
  const { data } = getState().project_monitor.monitor_item;
  const {
    project_users,
    working_users
  } = getState().project_monitor.monitor_users;

  if (index < 0) {
    return dispatch({
      type: MONITOR_TABLE_SET_TASK_SECOND_INDEX,
      index
    });
  }

  dispatch({
    type: MONITOR_TABLE_GETTING
  });

  const task_id = batch_datas[index].id;

  const datas = await getUserTask(
    project_id,
    batch_selected.process_instance_id,
    task_id,
    working_users
  );

  const users = [];
  project_users.forEach(function (user) {
    if (user.tasks) {
      for (let i = 0; i < user.tasks.length; i++) {
        let id = user.tasks[i].form_uri;
        if (id && id.includes(task_id)) {
          let user_name = user.username;

          if (!user.is_online) {
            user_name += "_(offline)";
          }

          users.push({
            textKey: user_name,
            valueKey: user.username
          });
        }
      }
    }
  });

  return dispatch({
    type: MONITOR_TABLE_SET_TASK_SECOND_INDEX,
    users,
    datas,
    index
  });
};

export const reClaimTasks = (project_id, user_tasks) => async (dispatch, getState) => {
  if (!user_tasks || user_tasks.length < 1) {
    return;
  }

  dispatch({
    type: MONITOR_TABLE_GETTING
  });

  for (let i = 0; i < user_tasks.length; i++) {
    let data = user_tasks[i];
    if (data.assignee) {
      await axios
        .patch(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/tasks/${data.id}/unclaim`)
        .then(res => res.data)
        .catch(e => {
          console.log(e);
        });
    }
  }

  const {
    task_second_index,
    batch_selected,
    batch_datas
  } = getState().project_monitor.monitor_table;
  const { working_users } = getState().project_monitor.monitor_users;

  const datas = await getUserTask(
    project_id,
    batch_selected.process_instance_id,
    batch_datas[task_second_index].id,
    working_users
  );

  return dispatch({
    type: MONITOR_TABLE_RECLAIM,
    datas
  });
};

export const assignTo = (user_name, user_tasks, project_id) => async (
  dispatch,
  getState
) => {
  const {
    users
  } = getState().project_monitor.monitor_table;
  let us = users.filter(item=>item.textKey === user_name)
  user_name = us[0]["valueKey"];
  if (!user_tasks || user_tasks.length < 1) {
    return;
  }

  dispatch({
    type: MONITOR_TABLE_GETTING
  });

  for (let i = 0; i < user_tasks.length; i++) {
    let data = user_tasks[i];
    await axios
      .patch(`${BPMN_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}/tasks/${data.id}/assignee`, {
        user_name
      })
      .then(res => res.data)
      .catch(e => {
        console.log(e);
      });
  }

  const {
    task_second_index,
    batch_selected,
    batch_datas
  } = getState().project_monitor.monitor_table;
  const { working_users } = getState().project_monitor.monitor_users;

  const datas = await getUserTask(
    project_id,
    batch_selected.process_instance_id,
    batch_datas[task_second_index].id,
    working_users
  );

  return dispatch({
    type: MONITOR_TABLE_ASSIGN_USER,
    datas
  });
};

export const resetStateTable = () => ({
  type: MONITOR_TABLE_RESET
});
