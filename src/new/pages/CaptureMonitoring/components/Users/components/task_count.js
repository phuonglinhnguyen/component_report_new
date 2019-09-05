import React, { useState } from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

const TaskCount = (props) => {
  const { cap, dataRedux } = props

  const bpmn_definition_id = get(cap, 'bpmn_definition_id');
  const bpmn_instance_id = get(cap, 'bpmn_instance_id');

  useState(() => {
    props.getTaskCountAction(bpmn_definition_id, bpmn_instance_id)
  }) 

  const tasksCount = dataRedux[`${bpmn_definition_id}_${bpmn_instance_id}`] || []

  const renderTaskCount = () => {
    return tasksCount.map((task,) => {
      return (
        <TableCell
          key={task.projectId+task.id}
          align="right"
          className={classes.assCursor}
        // onClick={() => {
        //   setOpenViewDetail(true);
        //   setSelectedCapture(cap);
        //   setSelectedStep(task);
        // }}
        >
          {task.count}
        </TableCell>
      );
    })
  }

  return (
    {
      renderTaskCount()
    }
  );
};

TaskCount.defaultProps = {
  dataRedux: {} 
}

export default compose(
  PageDecorator({
    resources: [reducer],
    actions: {
      getTaskCountAction,
    },
    mapState: (state) => ({
      dataRedux: getDataObject(`resources.${types.NAME_REDUCER}.data`, state.core)
    })
  }),
  withStyles(styles, { withTheme: true })
)(TaskCount);
