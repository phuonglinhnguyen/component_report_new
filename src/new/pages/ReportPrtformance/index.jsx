import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { DashboardStyle } from './assets';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import reducer from './redux/reducers';
import * as types from './redux/actions';
import { getData } from './redux/actionCreators';
import ReportComponent from './components/ReportComponent';
import compose from 'recompose/compose';

export interface LayoutDefautProps {
	classes: any,
	theme?: any,
	groups?: any,
	selectItemGroupTree?: (...args: any[]) => void | any
}

class ReportPrtformance extends React.Component<LayoutDefautProps, any> {
	componentWillMount = () => {
		const { getData } = this.props;
		getData();
	};

	render() {
		const { classes} = this.props;
		return (
			<div className={classes.root}>
				<ReportComponent {...this.props} />
			</div>
		);
	}
}
export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: {
			getData
		},
		mapState: (state) => ({
			data: getDataObject(`resources.${types.NAME_REDUCER}.data`, state.core)
		})
	}),
	withStyles(DashboardStyle, { withTheme: true })
)(ReportPrtformance);
