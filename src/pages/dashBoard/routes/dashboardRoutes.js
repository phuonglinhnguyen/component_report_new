import ReportPrtformance from '../../ReportPrtformance/components/ReportComponent';
import Monitoring from '../../Monitoring/components/CapMonitorComponent';

const dashboardRoutes = [
	{ path: '/dashboard/capture_monitoring', exact: true, name: 'Monitoring', component: Monitoring },
	{ path: '/dashboard/report_performance', exact: true, name: 'Report Performance', component: ReportPrtformance },
];

export default dashboardRoutes;
