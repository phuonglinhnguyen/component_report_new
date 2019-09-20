import * as React from 'react';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import reducer from './redux/reducers';
import { DashboardStyle } from './assets';
import * as types from './redux/actions';
import {
	setCapture,
	setSelectedCapture,
	getDataBatch,
	getDataImportedHistory,
	getDataTaskCount,
	getDataTaskInfo,
	getInstancesDetail,
	setSelectedStep,
	getUserAssign,
	getUserOnline,
	getUsers,
	getProject,
	unclaimStep,
	getVariablesTask,
	getDataBatchPerhour,
	updateStepArr,
	getCountData,
	getDataDocsMinMax,
	getCountDocs
} from './redux/actionCreators';
import CapMonitorComponent from './components/CapMonitorComponent';

export interface LayoutDefautProps {
	classes: any,
	theme?: any,
	groups?: any,
	selectItemGroupTree?: (...args: any[]) => void | any
}

class CaptureMonitoring extends React.Component<LayoutDefautProps, any> {
	componentDidMount = async () => {
		const {
			getUserAssign,
			getUserOnline,
			getProject,
			getUsers,
			match,
		} = this.props;
		const projectId = getDataObject('params.projectId', match);

		await getProject(projectId);
		await getUsers();
		await getUserAssign(projectId);
		await getUserOnline();
	};

	render() {
		const { classes, match } = this.props;
		const projectId = getDataObject('params.projectId', match);

		return (
			<div className={classes.root}>
				<CapMonitorComponent {...this.props} projectId={projectId} />
			</div>
		);
	}
}

export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: {
			setCapture,
			setSelectedCapture,
			getDataBatch,
			getDataImportedHistory,
			getDataTaskCount,
			getDataTaskInfo,
			getInstancesDetail,
			setSelectedStep,
			getUserAssign,
			getUserOnline,
			getUsers,
			getProject,
			unclaimStep,
			getVariablesTask,
			getCountData,
			updateStepArr,
			getDataDocsMinMax,
			getDataBatchPerhour,
			getCountDocs
		},
		mapState: (state) => ({
			data: getDataObject(`resources.${types.NAME_REDUCER}.data`, state.core),
			capture: getDataObject(`resources.${types.NAME_REDUCER}.data.capture`, state.core),
			data_history: getDataObject(`resources.${types.NAME_REDUCER}.data.data_history`, state.core),
			min: getDataObject(`resources.${types.NAME_REDUCER}.data.min`, state.core),
			max: getDataObject(`resources.${types.NAME_REDUCER}.data.max`, state.core),
			project: getDataObject(`resources.${types.NAME_REDUCER}.data.project`, state.core),
			count: getDataObject(`resources.${types.NAME_REDUCER}.data.count`, state.core),
			users: getDataObject(`resources.${types.NAME_REDUCER}.data.users`, state.core),
			user_assign: getDataObject(`resources.${types.NAME_REDUCER}.data.user_assign`, state.core),
			user_online: getDataObject(`resources.${types.NAME_REDUCER}.data.user_online`, state.core),
		})
	}),
	withStyles(DashboardStyle, { withTheme: true })
)(CaptureMonitoring);
