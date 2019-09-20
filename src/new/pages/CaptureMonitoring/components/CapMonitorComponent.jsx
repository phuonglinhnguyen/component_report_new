import React, { useState, Suspense, useEffect } from 'react';
import { get, filter } from 'lodash';
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
import classNames from 'classnames';
import Users from '@material-ui/icons/PermIdentity';
import UserOnline from './Users/UserOnline';
import CircularProgress from '@material-ui/core/CircularProgress';
import HeaderTask from './HeaderTask';
const BatchReport = React.lazy(() => import('./BatchReport'));
const TaskCount = React.lazy(() => import('./TaskCount'));

const drawerWidth = 240;
const styles = (theme) => {
	return {
		rowSmall: {
			width: '3%',
			padding: '5px'
		},
		rowLarge: {
			width: '15%',
			padding: '10px'
		},
		rowMedium: {
			width: '10%',
			padding: '10px'
		},
		ass: {
			width: '3%',
			padding: '5px'
		},
		filter: {
			display: 'flex',
			paddingLeft: '20px',
			justifyContent: 'space-between'
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
				padding: '5px'
			},
			head: {
				fontSize: '11px'
			},
			body: {
				fontSize: '11px'
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
	const { classes, data_history, projectId, getDataImportedHistory, getUserOnline, count } = props;
	const { getCountData } = props;

	const captureMonitors = data_history && data_history ? data_history : [];
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ fromDateSearch, setFromDateSearch ] = useState('');
	const [ toDateSearch, setToDateSearch ] = useState('');
	const [ batchNameSearch, setBatchNameSearch ] = useState('');
	const [ openViewWf, setOpenViewWf ] = React.useState(false);
	const countData = get(count, 'total', 0); //count=6
	const [ openUser, setOpenUser ] = useState(false);

	const headRows = [
		{ id: 'finishCapture', numeric: true, disablePadding: false, label: 'Finished Capture' },
		{ id: 'availQC', numeric: true, disablePadding: false, label: 'Available for QC' },
		{ id: 'finishQC', numeric: true, disablePadding: false, label: 'Finished QC' },
		{ id: 'availQCAppro', numeric: true, disablePadding: false, label: 'Available for QC Approval' },
		{ id: 'finishQCAppro', numeric: false, disablePadding: true, label: 'Finished QC Approval' },
		{ id: 'availExport doc', numeric: true, disablePadding: false, label: 'Available For Export Doc' },
		{ id: 'finishExport doc', numeric: true, disablePadding: false, label: 'Finished Export Doc' },
		{ id: 'availExport doc_set', numeric: true, disablePadding: false, label: 'Available For Export Doc Set' },
		{ id: 'finishExport doc_set', numeric: true, disablePadding: false, label: 'Finished Export Doc Set' },
		{ id: 'availExport batch', numeric: true, disablePadding: false, label: 'Available For Export Batch ' },
		{ id: 'finishExport batch', numeric: true, disablePadding: false, label: 'Finished Export Batch' },
		{ id: 'workflow', numeric: true, disablePadding: false, label: 'WorkFlow' }
	];

	useEffect(
		() => {
			let didUpdate = false;
			if (!didUpdate) {
				const fetch = async () => {
					await getDataImportedHistory(projectId, 1, 5);
					await getCountData(projectId);
				};
				fetch();
			}
			return () => {
				didUpdate = true;
			};
		},
		[ getDataImportedHistory, getCountData, projectId ]
	);

	//==Rows Per Page
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		let minRecord = newPage * rowsPerPage + 1;
		let maxRecord = newPage * rowsPerPage + rowsPerPage;

		getDataImportedHistory(projectId, minRecord, maxRecord);
	};

	const handleChangeRowsPerPage = (event) => {
		const value = event.target.value;
		setRowsPerPage(value);
		let minRecord = page * value + 1;
		let maxRecord = page * value + value;
		getDataImportedHistory(projectId, minRecord, maxRecord);
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
		let minRecord = page * rowsPerPage + 1;
		let maxRecord = page * rowsPerPage + rowsPerPage;
		getDataImportedHistory(projectId, minRecord, maxRecord);
		getUserOnline();
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
						<ExportXLSX batchNameData={batchNameData} {...props} />
						<IconButton onClick={toggleUser} className={classNames(classes.menuButton)}>
							<Users />
						</IconButton>
					</div>
				</div>
				<UserOnline {...props} open={openUser} />
				<main
					className={classNames(classes.contentUser, {
						[classes.contentShiftUser]: openUser
					})}
				>
					<Paper style={{ overflow: 'auto' }}>
						<Table>
							<TableHead style={{ background: 'lightgray' }}>
								<TableRow>
									<TableCell style={{ width: '2%', padding: '5px' }}>No.</TableCell>
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
					<Paper style={{ overflow: 'auto', height: '645px' }}>
						<Table style={{ tableLayout: 'fixed' }}>
							<TableBody>
								{batchNameData.map((cap, index) => {
									let importedDate = get(cap, 'imported_date', {});
									let showImportedDate = moment(importedDate).format('YYYYMMDD');
									return (
										<TableRow key={cap.id}>
											<TableCell style={{ width: '2%' }}>{index + 1}</TableCell>
											<TableCell align="right" style={{ width: '3%' }}>
												{showImportedDate || 'no date'}
											</TableCell>
											<TableCell align="center" style={{ width: '18%' }}>
												{cap.batch_path || "no path"}
											</TableCell>
											<TableCell
												align="center"
												style={{
													width: '5%'
												}}
											>
												{cap.batch_name || "no name"}
											</TableCell>
											<TableCell align="right" className={classes.ass}>
												{cap.doc_imported_amount ? cap.doc_imported_amount : 0}
											</TableCell>

											<Suspense
												fallback={
													<React.Fragment>
														<TableCell>0</TableCell>
														<TableCell>0</TableCell>
														<TableCell>0</TableCell>
														<TableCell>0</TableCell>
														<TableCell>0</TableCell>
														<TableCell>0</TableCell>
														<TableCell>0</TableCell>
														<TableCell>0</TableCell>
													</React.Fragment>
												}
											>
												<TaskCount key={cap.id} cap={cap} {...props} />
											</Suspense>

											<Suspense fallback={<CircularProgress className={classes.progress} color="secondary" />}>
												<BatchReport key={cap.id} cap={cap} {...props} />
											</Suspense>

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
						count={countData}
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
