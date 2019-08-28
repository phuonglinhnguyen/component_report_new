import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { DashboardStyle } from './assets';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import reducer from './redux/reducers';
import * as types from './redux/actions';
import { getData, setCapture, setSelectedCapture } from './redux/actionCreators';
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
		const { getData, data } = this.props;
		getData(data);
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
			setSelectedCapture
		},
		mapState: (state) => ({
			data: getDataObject(`resources.${types.NAME_REDUCER}.data`, state.core),
			capture: getDataObject(`resources.${types.NAME_REDUCER}.data.capture`, state.core)
		})
	}),
	withStyles(DashboardStyle, { withTheme: true })
)(CaptureMonitoring);
