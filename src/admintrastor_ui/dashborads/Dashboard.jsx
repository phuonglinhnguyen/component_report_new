import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { LayoutDecorator } from '../layout'
import { redirectApp } from '../../dgs-core'
import { LAYOUT_ADMIN } from '../../components/Layout'

import { crudGetOne, crudGetList, getResources } from '../../dgs-core'

import dashboardReducer from './Dashoard.reducer'
import Dashboard from '../../components/DashboardProduction/DashboardProduction'
import { Page } from '../../dgs-core'
import ProductionWrapper from './presentations/Wrapper';
import usersReducer from './users.reducer'
import { USER_ROLE_MANAGEMENT, USERS } from '../../providers';
import { Route, Redirect } from 'react-router'
import {
  initDataDashboard,
  changeGroup,
  changeProject,
  changeGroupName,
  changeProjectName,
  changeGroupNameForProject,
  showCreateGroup,
  showCreateProject,
  showEditGroup,
  showEditProject,
  hideDialog,
  changeData,
  onSubmit,
  onCancelConfirm,
  onSubmitConfirm,
  checkProjectEdit,
  showDialogConfirm,
  toggerSiderbar,
} from './Dashboard.actionsCreator'

const resources = [
  { name: 'group' },
  { name: 'user' },
  { name: 'project' },
  { name: USERS, reducer: usersReducer },
  { name: USER_ROLE_MANAGEMENT },
  dashboardReducer
]


const getTaskInfo = (tasks, info) => {
  return tasks.map(({ name, form_uri = '' }) => {
    let form_uris = form_uri.split('/')
    let task_id = form_uris[form_uris.length - 1]
    if (info[task_id]) {
      return { ...info[task_id], name, form_uri }
    } else {
      return { name, form_uri }
    }
  })
}

@LayoutDecorator({ name: LAYOUT_ADMIN, title: 'DIGI-TEXX' })
@Page({
  resources: resources,
  actions: {
    crudGetOne,
    crudGetList,
    initDataDashboard,
    changeGroup,
    changeProject,
    changeGroupName,
    changeProjectName,
    changeGroupNameForProject,
    showCreateGroup,
    showCreateProject,
    showEditGroup,
    showEditProject,
    hideDialog,
    changeData,
    onSubmit,
    onCancelConfirm,
    onSubmitConfirm,
    showDialogConfirm,
    toggerSiderbar,
  }
})
export default class DashboardContainer extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { crudGetOne, crudGetList, user } = this.props;
    crudGetList('group', {});
    crudGetList(USERS, {});
    // crudGetOne('user', { username: user.username });
    crudGetList('project', { group_id: 'all' }, {
      onSuccess: {
        notification: {
          body: 'dgs.notification.success',
          level: 'info'
        }
      }
    });
  }
  componentWillReceiveProps = (nextProps) => {
    const { loading, initDataDashboard, resources } = this.props;
    if (loading > 0 && nextProps.loading === 0 && resources.dashboard.data && !resources.dashboard.data.inited) {
      initDataDashboard(resources)
    }
  }
  render() {
    const { muiTheme, history } = this.context;
    const { resources, actions,
      changeGroup,
      changeProject,
      changeGroupName,
      changeProjectName,
      changeGroupNameForProject,
      showCreateGroup,
      showCreateProject,
      showEditGroup,
      showEditProject,
      hideDialog,
      changeData,
      onCancelConfirm,
      onSubmitConfirm,
      showDialogConfirm,
      toggerSiderbar,
      onSubmit
    } = this.props;
    const { dashboard, user, users, group, project, task_info } = resources;
    const { group_id, group_data = {}, project_id = '' } = dashboard && dashboard.data || {}

    const groups = group && group.list ? group.list.ids.map(id => {
      return group.data[id]
    }) : []
    let projects = project && project.data && project.list.ids.map(id => project.data[id]) || [];
    return (
      <React.Fragment>
        <Route path='/:groupId' render={props => {
          try {
            let groupId = props.match.params.groupId
            if (groupId !== group_id) {
              // changeGroup(groupId)
            }
          } catch (error) {
            // return <Redirect to='/'/>
          }
          return ''
        }} />
        <ProductionWrapper
          task_id={''}
          group_id={group_id}
          users={users}
          groups={groups}
          project_id={project_id}
          projects={projects}
          resources={resources}
          project_guide={{}}
          dashboard={dashboard}
          changeGroup={changeGroup}
          changeProject={changeProject}
          changeGroupName={changeGroupName}
          changeProjectName={changeProjectName}
          changeGroupNameForProject={changeGroupNameForProject}
          showCreateGroup={showCreateGroup}
          showCreateProject={showCreateProject}
          showEditGroup={showEditGroup}
          showEditProject={showEditProject}
          hideDialog={hideDialog}
          muiTheme={muiTheme}
          changeData={changeData}
          showDialogConfirm={showDialogConfirm}
          onCancelConfirm={onCancelConfirm}
          onSubmitConfirm={onSubmitConfirm}
          checkProjectEdit={checkProjectEdit}
          onSubmit={onSubmit}
          toggerSiderbar={toggerSiderbar}
        />
      </React.Fragment>
    )
  }
}



