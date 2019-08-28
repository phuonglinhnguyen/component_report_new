import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { DashboardStyle } from './assets';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import reducer from './redux/reducers';
import * as types from './redux/actions';
import { getDataUserOnline, getDataUsersAPI, getDataUsersAssignAPI, setUsersAssign } from './redux/actionCreators';
import compose from 'recompose/compose';
import DashBoard from './components/DashBoard';

export interface LayoutDefautProps {
	classes: any,
	theme?: any,
	groups?: any,
	selectItemGroupTree?: (...args: any[]) => void | any
}

class Dashboard extends React.Component<LayoutDefautProps, any> {
	componentWillMount = () => {
		const { getDataUserOnline, getDataUsersAPI, getDataUsersAssignAPI } = this.props;
		// getDataUserOnline();
		// getDataUsersAPI();
		// getDataUsersAssignAPI();
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<DashBoard {...this.props} />
			</div>
		);
	}
}
export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: {
			// getDataUserOnline,
			// getDataUsersAPI,
			// getDataUsersAssignAPI,
			// setUsersAssign
		},
		mapState: (state) => ({
			// users: getDataObject(`resources.${types.NAME_REDUCER}.data.users`, state.core),
			// user_assign: getDataObject(`resources.${types.NAME_REDUCER}.data.user_assign`, state.core),
			// user_online: getDataObject(`resources.${types.NAME_REDUCER}.data.user_online`, state.core)
		})
	}),
	withStyles(DashboardStyle, { withTheme: true })
)(Dashboard);
