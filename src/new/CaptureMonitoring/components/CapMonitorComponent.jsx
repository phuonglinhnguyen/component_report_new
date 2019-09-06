import React, { useState, Suspense } from 'react';
import { get, filter, isEmpty } from 'lodash';
import moment from 'moment';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterDate from './FilterDate';
import IconButton from '@material-ui/core/IconButton';
import ViewWorkflowDialog from './Dialogs/ViewWorkflowDialog';
import ExportXLSX from './ExportXLSX';
import { getGroupProjects } from '../../../../providers/data/mockData/group_project';
import classNames from 'classnames';
import Users from '@material-ui/icons/PermIdentity';
import UserOnline from './Users/UserOnline';
import BatchReport from './BatchReport';
import HeaderTask from './HeaderTask';
const TaskCount = React.lazy(() => import('./TaskCount'));
const drawerWidth = 240;
const styles = (theme) => {
	return {
		rowSmall: {
			width: '3%',
			padding: '10px'
		},
		rowLarge: {
			width: '24%',
			padding: '10px'
		},
		rowMedium: {
			width: '10%',
			padding: '10px'
		},
		ass: {
			width: '3%'
		},
		filter: {
			display: 'flex',
			paddingLeft: '20px',
			justifyContent: 'space-between'
		},
		assCursor: {
			width: '3%',
			'&:hover': {
				cursor: 'pointer',
				background: '#3c4858',
				color: 'white'
			}
		},
		assCursorChild: {
			width: '3%'
		},
		btnViecw: {
			fontSize: '10px'
		},
		menuButton: {
			marginLeft: 12,
			marginRight: 20
		},
		contentUser: {
			flexGrow: 1,
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			marginRight: 0
		},
		contentShiftUser: {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginRight: drawerWidth
		}
	};
};

const theme = createMuiTheme({
	overrides: {
		MuiTableCell: {
			root: {
				padding: '10px'
			}
		},
		MuiTable: {
			root: {
				width: 'none'
			}
		}
	}
});

const CapMonitorComponent = (props) => {
	const { classes, data_history, getDataImportedHistory } = props;
	const captureMonitors = data_history && data_history ? data_history : [];

	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ fromDateSearch, setFromDateSearch ] = useState('');
	const [ toDateSearch, setToDateSearch ] = useState('');
	const [ batchNameSearch, setBatchNameSearch ] = useState('');
	const [ openViewWf, setOpenViewWf ] = React.useState(false);

	const [ openUser, setOpenUser ] = useState(false);

	const headRows = [
		{ id: 'finishCapture', numeric: true, disablePadding: false, label: 'Finished Capture' },
		{ id: 'availQC', numeric: true, disablePadding: false, label: 'Available for QC' },
		{ id: 'finishQC', numeric: true, disablePadding: false, label: 'Finished QC' },
		{ id: 'availQCAppro', numeric: true, disablePadding: false, label: 'Available for QC Approval' },
		{ id: 'finishQCAppro', numeric: false, disablePadding: true, label: 'Finished QC Approval' },
		{ id: 'availExport', numeric: true, disablePadding: false, label: 'Available For Export' },
		{ id: 'finishExport', numeric: true, disablePadding: false, label: 'Finished Export' },
		{ id: 'exportDate', numeric: true, disablePadding: false, label: 'Exported Date' },
		{ id: 'workflow', numeric: true, disablePadding: false, label: 'WorkFlow' }
	];

	//==Rows Per Page

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		// const min = page + 1
		// const max = min + rowsPerPage - 1
		// getDataImportedHistory(min, max)
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		// const min = page + 1
		// const max = min + rowsPerPage - 1
		// getDataImportedHistory(min, max)
	};
	const toggleUser = () => {
		openUser ? setOpenUser(false) : setOpenUser(true);
	};

	const filterDatetime = (data, beginDatetime, endDatetime) => {
		const beginTime = beginDatetime ? moment(beginDatetime).valueOf() : null;
		const endTime = endDatetime ? moment(endDatetime).valueOf() : null;
		return data.filter((capture) => {
			const captureTime = moment(capture.imported_date).valueOf();
			if (beginTime && endTime) {
				return beginTime <= captureTime && captureTime <= endTime;
			} else if (beginTime) {
				return captureTime >= beginTime;
			} else if (endTime) {
				return captureTime <= endTime;
			} else {
				return true;
			}
		});
	};

	const filterData = (data, field, strSearch) => {
		const strSearchLowercase = strSearch ? String(strSearch).toLowerCase() : '';
		return filter(data, (item) => {
			const fieldTextLowercase = item[field] ? String(item[field]).toLowerCase() : '';
			if (!fieldTextLowercase) return false;
			return fieldTextLowercase.indexOf(strSearchLowercase) + 1;
		});
	};

	const start = fromDateSearch.replace(/-/gi, '');
	const end = toDateSearch.replace(/-/gi, '');

	let dateToDateFilteredData = captureMonitors;
	dateToDateFilteredData = filterDatetime(captureMonitors, start, end);

	let batchNameData = dateToDateFilteredData;
	if (batchNameSearch) {
		batchNameData = filterData(dateToDateFilteredData, 'batch_name', batchNameSearch);
	}

	const onRefresh = () => {
		console.log('ahihi chua load');
	};

	const deQuy = (groupProjects, ids) => {
		groupProjects.forEach((groupProject) => {
			const id = groupProject.id || '';
			if (!isEmpty(id)) {
				ids[groupProject.id] = true;
			}
			const groupProjectChilds = groupProject.childs || [];
			if (!isEmpty(groupProjectChilds)) {
				deQuy(groupProjectChilds, ids);
			}
		});
		return ids;
	};

	const getGroupProjectChildIds = (groupProjectChilds, groupProjectIdObject) => {
		groupProjectChilds.forEach((groupProject) => {
			groupProjectIdObject.push(groupProject.id);
			const childs = groupProject.childs || [];
			getGroupProjectChildIds(childs, groupProjectIdObject);
		});
	};

	const prepareGroupProjectIds = (groupProjects, result) => {
		groupProjects.forEach((groupProject) => {
			result[groupProject.id] = [ groupProject.id ];
			const childs = groupProject.childs || [];
			getGroupProjectChildIds(childs, result[groupProject.id]);
			prepareGroupProjectIds(childs, result);
		});
	};

	const modifiedGroupProjectIds = {};
	prepareGroupProjectIds(getGroupProjects(), modifiedGroupProjectIds);

	const checkDongHo = (groupId, cap_group_id) => {
		const groupProjectChildIds = modifiedGroupProjectIds[groupId] || [];
		// if (groupId === null) {
		// 	return batchNameData;
		// }
		return groupProjectChildIds.some((groupProjectChildId) => groupProjectChildId === cap_group_id);
	};

	return (
		<div className={classes.report}>
			<MuiThemeProvider theme={theme}>
				<div className={classes.filter}>
					<FilterDate
						fromDateSearch={fromDateSearch}
						setFromDateSearch={setFromDateSearch}
						toDateSearch={toDateSearch}
						setToDateSearch={setToDateSearch}
						batchNameSearch={batchNameSearch}
						setBatchNameSearch={setBatchNameSearch}
					/>
					<div>
						<IconButton aria-label="Refresh" onClick={onRefresh}>
							<RefreshIcon />
						</IconButton>
						<ExportXLSX batchNameData={batchNameData} />
						<IconButton onClick={toggleUser} className={classNames(classes.menuButton)}>
							<Users />
						</IconButton>
					</div>
				</div>
				<UserOnline open={openUser} {...props} />
				<main
					className={classNames(classes.contentUser, {
						[classes.contentShiftUser]: openUser
					})}
				>
					<Paper style={{ overflow: 'auto' }}>
						<Table>
							<TableHead style={{ background: 'lightgray' }}>
								<TableRow>
									<TableCell style={{ width: '2%' }}>No.</TableCell>
									<TableCell align="center" className={classes.rowSmall}>
										Imported Date
									</TableCell>
									<TableCell align="center" className={classes.rowLarge}>
										File Path
									</TableCell>
									<TableCell align="center" className={classes.rowMedium}>
										Batch Name
									</TableCell>
									<TableCell align="center" className={classes.rowSmall}>
										Imported Amount
									</TableCell>
									<HeaderTask {...props} />

									{headRows.map((row) => (
										<TableCell key={row.id} align="center" className={classes.rowSmall}>
											{row.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
						</Table>
					</Paper>
					<Paper style={{ overflow: 'auto', height: '675px' }}>
						<Table style={{ tableLayout: 'fixed' }}>
							<TableBody>
								{batchNameData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cap, index) => {
									let importedDate = get(cap, 'imported_date', {});
									let showImportedDate = moment(importedDate).format('YYYYMMDD');
									return (
										<TableRow>
											<TableCell style={{ width: '2%' }}>{index + 1}</TableCell>
											<TableCell align="right" style={{ width: '3%' }}>
												{showImportedDate}
											</TableCell>
											<TableCell align="center" style={{ width: '20%' }}>
												{cap.batch_path}
											</TableCell>
											<TableCell
												align="center"
												style={{
													width: '5%'
												}}
											>
												{cap.batch_name}
											</TableCell>
											<TableCell align="right" className={classes.ass}>
												{cap.doc_imported_amount ? cap.doc_imported_amount : 0}
											</TableCell>
											<Suspense fallback={<div>0</div>}>
												<TaskCount cap={cap} {...props} />
											</Suspense>
											<Suspense fallback={<div>0</div>}>
												<BatchReport cap={cap} {...props} />
											</Suspense>

											<TableCell className={classes.ass} align="right">
												{cap.export_date}
											</TableCell>
											<TableCell className={classes.ass} align="right">
												<Button className={classes.btnViecw} color="primary" onClick={() => setOpenViewWf(true)}>
													View
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</Paper>
					<TablePagination
						rowsPerPageOptions={[ 5, 10, 25 ]}
						component="div"
						count={batchNameData.length}
						rowsPerPage={rowsPerPage}
						page={page}
						backIconButtonProps={{
							'aria-label': 'Previous Page'
						}}
						nextIconButtonProps={{
							'aria-label': 'Next Page'
						}}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</main>

				<ViewWorkflowDialog open={openViewWf} setOpen={setOpenViewWf} />
			</MuiThemeProvider>
		</div>
	);
};
export default withStyles(styles, { withTheme: true })(CapMonitorComponent);
