import * as React from 'react';
import { Page404, DashboardPage, CaptureMonitoringPage } from '../../views';
const Warper = (ComponentConPo) => (props) => {
	return (
	<DashboardPage>
		<ComponentConPo match={props.match}/>
	</DashboardPage>
	)
}
export default (func)=>([
	{
		name: 'dashboard',
		exact: true,
		path: '/',
		component: DashboardPage
	},
	{
		name: 'capture_monitoring',
		exact: true,
		path: '/projects/:projectId/capture-monitoring',
		component: Warper(CaptureMonitoringPage)
	},
	{
		name: 'page404',
		component: Page404
	}
])
