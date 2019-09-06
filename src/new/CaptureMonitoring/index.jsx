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
	setSelectedStep,
	// getUserAssign,
	// getUserOnline,
	getProject
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
		const { getDataImportedHistory, 
			// getUserAssign, 
			// getUserOnline, 
			getProject 
		} = this.props;
		const projectId = '5d099a031927c3001465f932';
		getProject(projectId);
		getDataImportedHistory(projectId, 1, 3);
	
		// getUserAssign(projectId);
		// getUserOnline();
	};

	render() {
		const { classes } = this.props;
		const projectId = '5d099a031927c3001465f932';
		return (
			<div className={classes.root}>
				<CapMonitorComponent projectId={projectId} {...this.props} />
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
			// getUserAssign,
			// getUserOnline,
			getProject
		},
		mapState: (state) => ({
			data: getDataObject(`resources.${types.NAME_REDUCER}.data`, state.core),
			group_prj: getDataObject(`resources.${types.NAME_REDUCER}.data.group_prj`, state.core),
			project: getDataObject(`resources.${types.NAME_REDUCER}.data.project`, state.core),
			capture: getDataObject(`resources.${types.NAME_REDUCER}.data.capture`, state.core),
			data_history: getDataObject(`resources.${types.NAME_REDUCER}.data.data_history`, state.core),
			user_assign: getDataObject(`resources.${types.NAME_REDUCER}.data.user_assign`, state.core),
			user_online: getDataObject(`resources.${types.NAME_REDUCER}.data.user_online`, state.core),

		})
	}),
	withStyles(DashboardStyle, { withTheme: true })
)(CaptureMonitoring);
