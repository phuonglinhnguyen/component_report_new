import React, { useState, Suspense ,useEffect} from 'react';
import { get } from 'lodash';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import TableCell from '@material-ui/core/TableCell';
import reducer from '../redux/reducers';
import { getDataTaskCount, setSelectedStep, setSelectedCapture } from '../redux/actionCreators';
import * as types from '../redux/actions';
import DetailDialog from './Dialogs/DetailDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
const styles = (theme) => {
	return {
		assTask: {
			width: '3.5%',
			'&:hover': {
				cursor: 'pointer',
				background: '#3c4858',
				color: 'white'
			}
		}
	};
};

const TaskCount = (props) => {
	const {
		classes,
		cap,
		tasks_count,
		task,
		setSelectedStep,
		setSelectedCapture,
		capture,
		projectId,
		getDataTaskCount
	} = props;
	const [ openViewDetail, setOpenViewDetail ] = useState(false);
	const bpmn_definition_id = get(cap, 'bpmn_definition_id');
	const bpmn_instance_id = get(cap, 'bpmn_instance_id');

	useEffect(
		() => {
			let didUpdate = false;

			if (!didUpdate) {
				const fetch = async () => {
					await getDataTaskCount(projectId, bpmn_definition_id, bpmn_instance_id);
				};
				fetch();
			}
			return () => {
				didUpdate = true;
			};
		},
		[ cap ]
	);
	const tasksCount = tasks_count[`${bpmn_definition_id}_${bpmn_instance_id}`] || [];

	const renderTaskCount = () => {
		return tasksCount.map((task) => {
			return (
				<Suspense fallback={<CircularProgress className={classes.progress} color="secondary" />}>
					<TableCell
						key={task.projectId + task.id}
						align="right"
						className={classes.assTask}
						onClick={() => {
							setOpenViewDetail(true);
							setSelectedStep(task);
						}}
					>
						{task.count ? task.count : 0}
					</TableCell>
				</Suspense>
			);
		});
	};

	return (
		<React.Fragment>
			{renderTaskCount()}
			<Suspense fallback={<CircularProgress className={classes.progress} color="secondary" />}>
				<DetailDialog
					open={openViewDetail}
					setOpen={setOpenViewDetail}
					cap={capture}
					task={task}
					setTask={setSelectedStep}
					setCap={setSelectedCapture}
					{...props}
				/>
			</Suspense>
		</React.Fragment>
	);
};

TaskCount.defaultProps = {
	tasks_count: []
};

export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: {
			getDataTaskCount,
			setSelectedCapture,
			setSelectedStep
		},
		mapState: (state) => ({
			tasks_count: getDataObject(`resources.${types.NAME_REDUCER}.data`, state.core),
			task: getDataObject(`resources.${types.NAME_REDUCER}.data.task`, state.core)
		})
	}),
	withStyles(styles, { withTheme: true })
)(TaskCount);
