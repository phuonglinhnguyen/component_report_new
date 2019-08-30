import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { DashboardStyle } from './assets';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import reducer from './redux/reducers';
import * as types from './redux/actions';
import { getData, setCapture, setSelectedCapture, getDataBatch, getDataImportedHistory } from './redux/actionCreators';
import CapMonitorComponent from './components/CapMonitorComponent';
import compose from 'recompose/compose';

export interface LayoutDefautProps {
	classes: any,
	theme?: any,
	groups?: any,
	selectItemGroupTree?: (...args: any[]) => void | any
}

class CaptureMonitoring extends React.Component<LayoutDefautProps, any> {
	componentWillMount = () => {
		const {
			getData,
			data,
			data_batch,
			getDataBatch,
			getDataImportedHistory,
			data_history,
			min,
			max,
			fromDate,
			toDate,
			batchName
		} = this.props;
		getData(data);
		getDataBatch(data_batch);
		getDataImportedHistory(data_history, 1, 10, fromDate, toDate, batchName);
	};

	render() {
		const { classes } = this.props;

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
			getData,
			setCapture,
			setSelectedCapture,
			getDataBatch,
			getDataImportedHistory
		},
		mapState: (state) => ({
			data: getDataObject(`resources.${types.NAME_REDUCER}.data`, state.core),
			capture: getDataObject(`resources.${types.NAME_REDUCER}.data.capture`, state.core),
			data_batch: getDataObject(`resources.${types.NAME_REDUCER}.data.data_batch`, state.core),
			data_history: getDataObject(`resources.${types.NAME_REDUCER}.data.data_history`, state.core),
			min: getDataObject(`resources.${types.NAME_REDUCER}.data.min`, state.core),
			max: getDataObject(`resources.${types.NAME_REDUCER}.data.max`, state.core),
			fromDate: getDataObject(`resources.${types.NAME_REDUCER}.data.fromDate`, state.core),
			toDate: getDataObject(`resources.${types.NAME_REDUCER}.data.toDate`, state.core),
			batchName: getDataObject(`resources.${types.NAME_REDUCER}.data.batchName`, state.core)
		})
	}),
	withStyles(DashboardStyle, { withTheme: true })
)(CaptureMonitoring);
