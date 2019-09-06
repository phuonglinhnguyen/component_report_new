import axios from "axios";
import _ from "lodash";
import {
  MONITOR_USERS_SET_LIST,
  MONITOR_USERS_FILTER,
  MONITOR_USERS_HIDE_POPUP,
  MONITOR_USERS_SHOW_POPUP,
  MONITOR_USERS_INPUT_CHANGE
} from "../constants";
import { UAC_ENDPOINT, API_SOCKET, API_ENDPOINT, APP_NAME } from "../../../../../constants";
import { getDataObject } from '@dgtx/coreui'
import clone from 'clone';

export const hidePopup = () => ({
  type: MONITOR_USERS_HIDE_POPUP
});

export const showPopup = () => ({
  type: MONITOR_USERS_SHOW_POPUP
});


export const getUsersByProjectId = (project_id) => async (dispatch, getState) => {
  const project = await axios
    .get(`${API_ENDPOINT}/apps/${APP_NAME}/projects/${project_id}`)
    .then(res => res.data)
    .catch(e => {
      console.log(e);
      return [];
    });
  let projectName = getDataObject('name', project);

  const project_users = await axios
    .get(`${UAC_ENDPOINT}/apps/production/projects/${project_id}/tasks-assigned`)
    .then(res => res.data)
    .catch(e => {
      console.log(e);
      return [];
    });

  const userOnline = await getWorkingUsers();

  if (projectName && project_users.length > 0 && userOnline) {
    let userOnlineOfProject = clone(getDataObject(["production", projectName], userOnline) || undefined);
    let _data = (userOnlineOfProject && Object.values(userOnlineOfProject)) || undefined;
    let working_users = [];
    if (userOnlineOfProject && _data) {
      _data.map(({ users }) => {
        working_users = working_users.concat(users)
      })

      let total_working_user = working_users.length;
      project_users.forEach(function (project_user) {
        project_user.is_online = working_users.includes(project_user.username);
        Object.keys(userOnlineOfProject).map((key, i) => {
          if (userOnlineOfProject[key].users.includes(project_user.username)) {
            project_user.location = key.toUpperCase();
          }
        })
      });

      let crrentWorkingUser = clone(getDataObject("project_monitor.monitor_users.working_users", getState()) || []);
      let crrentProjectUser = clone(getDataObject("project_monitor.monitor_users.project_users", getState()) || []);

      if (!_.isEqual(crrentWorkingUser, working_users) ||
        !_.isEqual(crrentProjectUser, project_users)
      ) {
        return dispatch({
          type: MONITOR_USERS_SET_LIST,
          project_users: _.orderBy(
            project_users,
            ["is_online", "username"],
            ["desc", "asc"]
          ),
          working_users,
          total_working_user
        });
      }
    }
    else {
      return dispatch({
        type: MONITOR_USERS_SET_LIST,
        project_users,
        working_users: [],
        total_working_user: 0
      });
    }
  }
};

export const inputSearchChange = text_search => ({
  type: MONITOR_USERS_INPUT_CHANGE,
  text_search
});

export const filterByName = name => async (dispatch, getState) => {
  const project_users = getState().project_monitor.monitor_users.project_users;

  let results = null;
  if (name) {
    results = project_users.filter(d => d.username.toLowerCase().includes(name));
  }

  return dispatch({
    type: MONITOR_USERS_FILTER,
    results
  });
};

export const getWorkingUsers = () =>
  axios
    .get(`${API_SOCKET}/user-onlines`)
    .then(res => res.data)
    .catch(e => {
      console.log(e);
      return null;
    });