import React, { useState } from 'react';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import TableCell from '@material-ui/core/TableCell';
import reducer from '../redux/reducers';
import { getDataTaskInfo } from '../redux/actionCreators';
import * as types from '../redux/actions';
const styles = (theme) => {
	return {
		assCursor: {
			width: '3%',
			'&:hover': {
				cursor: 'pointer',
				background: '#3c4858',
				color: 'white'
			}
		}
	};
};

const HeaderTask = (props) => {
	const { classes, tasks, projectId } = props;
	useState(() => {
		props.getDataTaskInfo(projectId);
	});
  const headerTasks = tasks || [];
  
	const renderHeaderTasks = () => {
		return headerTasks.map((task) => {
		return (
			<TableCell
				key={task.id}
				align="center"
				className={classes.rowSmall}
			>
				{task.name}
			</TableCell>
		);
		});
	};

	return renderHeaderTasks();
};

export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: {
			getDataTaskInfo
		},
		mapState: (state) => ({
			tasks: getDataObject(`resources.${types.NAME_REDUCER}.data.tasks`, state.core)
		})
	}),
	withStyles(styles, { withTheme: true })
)(HeaderTask);
