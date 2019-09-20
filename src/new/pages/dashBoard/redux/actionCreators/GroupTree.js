import { cloneDeep, isEmpty, orderBy, isEqual } from 'lodash';
import { getValueByObject } from '@dgtx/core-component-ui';
import { showNotification } from '@dgtx/coreui';
import * as types from '../actions';
import { callAPIGetAllGroup, callAPIGetProjectInfo, callAPIGetFunctions } from './CallAPI';
import { executeActionReducer } from './General';
import { I18n } from 'react-redux-i18n';
import { FUNCTIONS } from '../../../../../providers/router/functions';
export const getDataGroupProject = () => async (dispatch, getState) => {
  const state = getValueByObject(cloneDeep(getState()), `core.resources.${types.NAME_REDUCER}.data`, {});
  const group_prj_parent = getValueByObject(state, 'group_prj_parent', []);
  const searchKeyWordsGroups = getValueByObject(state, 'searchKeyWordsGroups', '');
  const groups = await dispatch(callAPIGetAllGroup());
  const projects = await dispatch(callAPIGetProjectInfo());
  if (!isEmpty(searchKeyWordsGroups) && !isEmpty(group_prj_parent)) {

  }
  else {
   
    if (groups.code || projects.code) {
      const message = `${I18n.t(`${types.KEY_TRANSLATE}.groups_projects_error`)}`
      dispatch(showNotification(message, 'error', { i18n: false, duration: 3000 }));
    }
    else {
      let newGroups = getChildsByGroups(orderBy(groups, 'name', 'asc'), projects);
      dispatch(
        executeActionReducer(
          types.GET_GROUP_PROJECTS,
          {
            group_prj_parent: groups,
            group_prj_search: newGroups,
            projects
          }
        )
      );
    }
  }
};

export const setClickProject = (project) => async (dispatch, getState) => {
  if (project.group_id) {
    const state = getValueByObject(cloneDeep(getState()), `core.resources.${types.NAME_REDUCER}.data`, {});
    const group_prj_parent = getValueByObject(state, 'group_prj_parent', false);
    const data = await dispatch(callAPIGetFunctions({ projectId: project.id, role: project.auth }));
    if (!isEqual(group_prj_parent, data)) {
      if (data.code) {
        dispatch(showNotification(data.message, 'error', { i18n: false, duration: 3000 }));
      }
      else {
        let newFunctions = data.map(i => i.item);
        let functions = FUNCTIONS().filter(f => newFunctions.includes(f.name));
        dispatch(
          executeActionReducer(
            types.CLICK_PROJECT,
            {
              functions_search: orderBy(functions, 'name', 'asc'),
              functions_parent: orderBy(functions, 'name', 'asc'),
              project_selected: project.id,
              searchKeyWordsFunctions: '',
              isClickProject: true,
              isRenderFuctions: true,
            }
          )
        );
      }
    }
  }
}

export const setIsOpenGroupChild = () => async (dispatch, getState) => {
  const state = getValueByObject(cloneDeep(getState()), `core.resources.${types.NAME_REDUCER}.data`, {});
  const isOpenGroupTree = getValueByObject(state, 'isOpenGroupTree', false);
  dispatch(
    executeActionReducer(
      types.OPEN_GROUP_TREE,
      {
        isOpenGroupTree: !isOpenGroupTree
      }
    )
  );
};

const getChildsByGroups = (groups, projects) => {
  let newGroups = [];
  for (let index = 0; index < groups.length; index++) {
    let group = groups[index];
    let groupProject = projects.filter(i => i.group_id === group.id);
    if (!isEmpty(groupProject)) {
      let newGroup = cloneDeep(group);
      if (!isEmpty(group.childs)) {
        let newGroup2 = getChildsByGroups(group.childs, projects)
        newGroup.childs = newGroup2;
      }
      if (!newGroup.childs) newGroup.childs = [];
      groupProject.forEach((p) => {
        newGroup.childs.push(p)
      })
      newGroups.push(newGroup)
    }
    else {
      if (!isEmpty(group.childs)) {
        let newGroup3 = getChildsByGroups(group.childs, projects)
        let group3 = cloneDeep(group);
        group3.childs = newGroup3;
        newGroups.push(group3);
      }
    }
  }
  return newGroups;
}

const deleteChildsEmptyByGroups = (groups) => {
  let newGroups = []
  for (let index = 0; index < groups.length; index++) {
    let group = groups[index];
    let childs = getValueByObject(group, 'childs', null);
    if (childs && !isEmpty(childs)) {
      let newGroup = cloneDeep(group);
      let newGroup2 = deleteChildsEmptyByGroups(childs)
      newGroup.childs = newGroup2;
      if (!isEmpty(newGroup2)) {
        newGroups.push(newGroup)
      }
    }
    else {
      if (getValueByObject(group, 'group_id', null)) {
        newGroups.push(group)
      }
    }
  }
  return newGroups;
}


export const setOnSearchGroupTree = (searchKeyWords) => async (dispatch, getState) => {
  const state = getValueByObject(cloneDeep(getState()), `core.resources.${types.NAME_REDUCER}.data`, {});
  const projects = getValueByObject(state, 'projects', false);
  const group_prj_parent = getValueByObject(state, 'group_prj_parent', false);
  let newSearchKeyWords = searchKeyWords.toUpperCase();
  let newProject = projects.filter(p => p.name.toUpperCase().search(newSearchKeyWords) !== -1);
  let newGroups = getChildsByGroups(orderBy(group_prj_parent, 'name', 'asc'), newProject);
  let newGroups2 = deleteChildsEmptyByGroups(orderBy(newGroups, 'name', 'asc'));
  dispatch(
    executeActionReducer(
      types.ON_SEARCH_GROUP_TREE,
      {
        group_prj_search: newGroups2,
        searchKeyWordsGroups: searchKeyWords
      }
    )
  );
}

const GROUPS = [
  {
    "ancestors": [],
    "name": "SAGA",
    "parent": null,
    "created_date": "2019-04-18T06:34:07.457Z",
    "last_modified": "2019-04-18T06:34:07.457Z",
    "childs": [
      {
        "ancestors": [
          "5cb81a5f952d2a001457a955"
        ],
        "name": "Invoice",
        "parent": "5cb81a5f952d2a001457a955",
        "created_date": "2019-04-18T06:35:49.957Z",
        "last_modified": "2019-04-18T06:35:49.957Z",
        "id": "5cb81ac5952d2a001457a957",
        "childs": [
          {
            "ancestors": [
              "5cb81a5f952d2a001457a955",
              "5cb81ac5952d2a001457a957"
            ],
            "name": "040_test",
            "parent": "5cb81ac5952d2a001457a957",
            "created_date": "2019-06-03T06:26:37.697Z",
            "last_modified": "2019-06-03T06:26:37.697Z",
            "id": "5cf4bd9dedcc35001ed50757"
          }
        ]
      },
      {
        "ancestors": [
          "5cb81a5f952d2a001457a955"
        ],
        "name": "Form",
        "parent": "5cb81a5f952d2a001457a955",
        "created_date": "2019-04-18T06:35:57.744Z",
        "last_modified": "2019-04-18T06:35:57.744Z",
        "id": "5cb81acd952d2a001457a958"
      },
      {
        "ancestors": [
          "5cb81a5f952d2a001457a955"
        ],
        "name": "FORM",
        "parent": "5cb81a5f952d2a001457a955",
        "created_date": "2019-07-02T09:35:32.808Z",
        "last_modified": "2019-07-02T09:35:32.808Z",
        "id": "5d1b25641384e400177c86e1"
      }
    ],
    "id": "5cb81a5f952d2a001457a955"
  },
  {
    "ancestors": [],
    "name": "Ancestry",
    "parent": null,
    "created_date": "2019-04-18T06:34:40.478Z",
    "last_modified": "2019-04-18T06:34:40.478Z",
    "childs": [],
    "id": "5cb81a80952d2a001457a956"
  },
  {
    "ancestors": [],
    "name": "UIBK",
    "parent": null,
    "created_date": "2019-05-20T07:14:08.909Z",
    "last_modified": "2019-05-20T07:14:08.909Z",
    "childs": [],
    "id": "5ce253c0612a670018d9d70c"
  },
  {
    "ancestors": [],
    "name": "Banking",
    "parent": null,
    "created_date": "2019-05-28T06:13:25.904Z",
    "last_modified": "2019-05-28T06:13:25.904Z",
    "childs": [],
    "id": "5cecd185dcb2eb001634ecad"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DGS1.0",
    "parent": null,
    "created_date": "2019-04-18T06:34:07.457Z",
    "last_modified": "2019-04-18T06:34:07.457Z",
    "childs": [],
    "id": "5d5240a2eceb4b0019dbe068"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
  {
    "ancestors": [],
    "name": "DEMO",
    "parent": null,
    "created_date": "2019-05-28T06:41:24.149Z",
    "last_modified": "2019-05-28T06:41:24.149Z",
    "childs": [],
    "id": "5cecd814dcb2eb001634ee3a"
  },
]