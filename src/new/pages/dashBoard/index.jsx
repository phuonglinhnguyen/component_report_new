import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { DashboardStyle } from './assets';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import reducer from './redux/reducers';
import * as types from './redux/actions';
import { getDataProjectInfo, getDataGroupProject } from './redux/actionCreators';
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
		const { match, getDataProjectInfo, projects, getDataGroupProject } = this.props;
		const projectId = getDataObject('params.projectid', match);
		getDataGroupProject();
		getDataProjectInfo(projects);
	};

	render() {
		const { classes, match } = this.props;
		const projectId = getDataObject('params.projectid', match);
		return (
			<div className={classes.root}>
				<DashBoard projectId={projectId} {...this.props} />
			</div>
		);
	}
}
export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: {
			getDataProjectInfo,
			getDataGroupProject
		},
		mapState: (state) => ({
			projects: getDataObject(`resources.${types.NAME_REDUCER}.data.projects`, state.core),
			group_prj: getDataObject(`resources.${types.NAME_REDUCER}.data.group_prj`, state.core)
		})
	}),
	withStyles(DashboardStyle, { withTheme: true })
)(Dashboard);
