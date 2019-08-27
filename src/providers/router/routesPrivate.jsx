import { Page404, DashboardPage ,CaptureMonitoringPage} from '../../views';
export default [
	{
		name: 'home',
		exact: true,
		path: '/',
		component: DashboardPage
	},
	{
		name: 'dashboard',
		exact: false,
		path: '/dashboard',
		component: DashboardPage
	},
	{
		name: 'test',
		exact: true,
		path: '/dashboard/test',
		component: CaptureMonitoringPage
	},
	{
		name: 'page404',
		component: Page404
	}
];
