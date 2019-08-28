import ReportPrtformance from '../../ReportPrtformance';
import CapMonitorComponent from '../../CaptureMonitoring';

const dashboardRoutes = [
	{ path: '/dashboard/capture_monitoring', exact: true, component: CapMonitorComponent },
	{ path: '/dashboard/report_performance', exact: true,  component: ReportPrtformance },
];

export default dashboardRoutes;
