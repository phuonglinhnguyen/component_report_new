import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { DashboardStyle } from './assets';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import reducer from './redux/reducers';
import * as types from './redux/actions';
import {
	setCapture,
	setSelectedCapture,
	getDataBatch,
	getDataImportedHistory,
	getDataTaskCount,
	getDataTaskInfo,
	getInstancesDetail,
	setSelectedStep
} from './redux/actionCreators';
import CapMonitorComponent from './components/CapMonitorComponent';
import compose from 'recompose/compose';

export interface LayoutDefautProps {
	classes: any,
	theme?: any,
	groups?: any,
	selectItemGroupTree?: (...args: any[]) => void | any
}

class CaptureMonitoring extends React.Component<LayoutDefautProps, any> {
	componentDidMount = () => {
		const {
			getDataBatch,
			getDataImportedHistory,
			getDataTaskInfo,
			getInstancesDetail,
			getDataTaskCount,
			capture,
			task
		} = this.props;
		
		const instanceId = getDataObject('bpmn_instance_id', capture) || '28a1d948-c8b2-11e9-b7cf-5675acad1b82';
		const processesId = getDataObject('bpmn_definition_id', capture) || '04475bb3-9f0c-11e9-b091-9a45e4d4602b';
		const taskId = getDataObject('id', task) || 'Type';
		getDataBatch();
		getDataImportedHistory();
		getDataTaskInfo();

		getDataTaskCount(processesId, instanceId);
		getInstancesDetail(processesId, instanceId, taskId);
	};

	render() {
		const { classes, capture, getInstancesDetail, getDataTaskCount, tasks_count } = this.props;

		return (
			<div className={classes.root}>
				<CapMonitorComponent {...this.props} />
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
			setSelectedStep
		},
		mapState: (state) => ({
			data: getDataObject(`resources.${types.NAME_REDUCER}.data`, state.core),
			group_prj: getDataObject(`resources.${types.NAME_REDUCER}.data.group_prj`, state.core),
			capture: getDataObject(`resources.${types.NAME_REDUCER}.data.capture`, state.core),
			data_batch: getDataObject(`resources.${types.NAME_REDUCER}.data.data_batch`, state.core),
			data_history: getDataObject(`resources.${types.NAME_REDUCER}.data.data_history`, state.core),
			min: getDataObject(`resources.${types.NAME_REDUCER}.data.min`, state.core),
			max: getDataObject(`resources.${types.NAME_REDUCER}.data.max`, state.core),
			fromDate: getDataObject(`resources.${types.NAME_REDUCER}.data.fromDate`, state.core),
			toDate: getDataObject(`resources.${types.NAME_REDUCER}.data.toDate`, state.core),
			batchName: getDataObject(`resources.${types.NAME_REDUCER}.data.batchName`, state.core),
			tasks: getDataObject(`resources.${types.NAME_REDUCER}.data.tasks`, state.core),
			tasks_count: getDataObject(`resources.${types.NAME_REDUCER}.data.tasks_count`, state.core),
			step: getDataObject(`resources.${types.NAME_REDUCER}.data.step`, state.core),
			task: getDataObject(`resources.${types.NAME_REDUCER}.data.task`, state.core)
		})
	}),
	withStyles(DashboardStyle, { withTheme: true })
)(CaptureMonitoring);
