import React, { useState } from 'react';
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
import DetailDialog from './Dialogs/DetailDialog';
import ExportXLSX from './ExportXLSX';
import { getGroupProjects } from '../../../../providers/data/mockData/group_project';

const styles = (theme) => {
	return {
		rowSmall: {
			width: '4%',
			padding: '10px'
		},
		rowLarge: {
			width: '18%',
			padding: '10px'
		},
		rowMedium: {
			width: '10%',
			padding: '10px'
		},
		ass: {
			width: '30px'
		},
		filter: {
			display: 'flex',
			paddingLeft: '20px',
			justifyContent: 'space-between'
		},
		assCursor: {
			width: '30px',
			'&:hover': {
				cursor: 'pointer',
				background: '#3c4858',
				color: 'white'
			}
		},
		btnViecw: {
			fontSize: '10px'
		}
	};
};

const theme = createMuiTheme({
	overrides: {
		MuiTableCell: {
			root: {
				padding: '10px'
			}
		}
	}
});

const CapMonitorComponent = (props) => {
	const { classes, data } = props;
	const urlParams = new URLSearchParams(props.location.search);
	const groupId = urlParams.get('groupId');

	const captureMonitors = get(data, 'data', []);
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(25);
	const [ fromDateSearch, setFromDateSearch ] = useState('');
	const [ toDateSearch, setToDateSearch ] = useState('');
	const [ batchNameSearch, setBatchNameSearch ] = useState('');
	const [ openViewWf, setOpenViewWf ] = React.useState(false);
	const [ openViewDetail, setOpenViewDetail ] = useState(false);
	const [ selectedCapture, setSelectedCapture ] = useState(null);
	const [ choose, setChoose ] = useState('');
	const [ role, setRole ] = useState('');

	const headRows = [
		{ id: 'importedAmonut', numeric: false, disablePadding: true, label: 'Imported Amount' },
		{ id: 'classify', numeric: true, disablePadding: false, label: 'Classify' },
		{ id: 'omr', numeric: true, disablePadding: false, label: 'OMR' },
		{ id: 'invoiveHeader', numeric: true, disablePadding: false, label: 'Invoice Header' },
		{ id: 'invoiveItem', numeric: true, disablePadding: false, label: 'Invoice Item' },
		{ id: 'verify', numeric: false, disablePadding: true, label: 'Verify Hold/Bad' },
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
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	const filterDatetime = (captureMonitors, beginDatetime, endDatetime) => {
		const beginTime = beginDatetime ? moment(beginDatetime).valueOf() : null;
		const endTime = endDatetime ? moment(endDatetime).valueOf() : null;
		return captureMonitors.filter((capture) => {
			const captureTime = moment(capture.import_date).valueOf();
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
		if (groupId === null) {
			return batchNameData;
		}
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
					</div>
				</div>
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
								const cap_group_id = cap.group_id || '';

								const isDongHo = checkDongHo(groupId, cap_group_id);
								if (!isDongHo) return null;
								return (
									<TableRow>
										<TableCell style={{ width: '20px' }}>{index + 1}</TableCell>
										<TableCell align="right" className={classes.ass}>
											{cap.import_date}
										</TableCell>
										<TableCell align="center" style={{ width: '140px' }}>
											{cap.file_path}
										</TableCell>
										<TableCell
											align="center"
											style={{
												width: '60px',
												padding: '10px'
											}}
										>
											{cap.batch_name}
										</TableCell>
										<TableCell align="right" className={classes.ass}>
											{cap.imported_amount}
										</TableCell>
										<TableCell
											align="right"
											className={classes.assCursor}
											onClick={() => {
												setOpenViewDetail(true);
												setSelectedCapture(cap);
												setRole('PM');
												setChoose('Classify');
											}}
										>
											{cap.classify.total}
										</TableCell>
										<TableCell
											align="right"
											className={classes.assCursor}
											onClick={() => {
												setOpenViewDetail(true);
												setSelectedCapture(cap);
												setRole('PM');
												setChoose('Omr');
											}}
										>
											{cap.omr.total}
										</TableCell>
										<TableCell
											align="right"
											className={classes.assCursor}
											onClick={() => {
												setOpenViewDetail(true);
												setSelectedCapture(cap);
												setRole('PM');
												setChoose('Invoice Header');
											}}
										>
											{cap.invoice_header.total}
										</TableCell>
										<TableCell
											align="right"
											className={classes.assCursor}
											onClick={() => {
												setOpenViewDetail(true);
												setSelectedCapture(cap);
												setRole('PM');
												setChoose('Invoice Item');
											}}
										>
											{cap.invoice_item.total}
										</TableCell>
										<TableCell align="right" className={classes.assCursor}>
											{cap.verify}
										</TableCell>
										<TableCell align="right" className={classes.assCursor}>
											{cap.finished_capture}
										</TableCell>
										<TableCell align="right" className={classes.assCursor}>
											{cap.available_QC}
										</TableCell>
										<TableCell align="right" className={classes.assCursor}>
											{cap.finished_QC}
										</TableCell>
										<TableCell align="right" className={classes.assCursor}>
											{cap.available_QC_Approval}
										</TableCell>
										<TableCell align="right" className={classes.assCursor}>
											{cap.finished_QC_Approval}
										</TableCell>
										<TableCell align="right" className={classes.assCursor}>
											{cap.available_export}
										</TableCell>
										<TableCell
											className={classes.assCursor}
											align="right"
										>
											{cap.finished_export.total}
										</TableCell>
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
					count={captureMonitors.length}
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
				<ViewWorkflowDialog open={openViewWf} setOpen={setOpenViewWf} />
				<DetailDialog
					open={openViewDetail}
					setOpen={setOpenViewDetail}
					captureMonitors={captureMonitors}
					cap={selectedCapture}
					setCap={setSelectedCapture}
					choose={choose}
					role={role}
					{...props}
				/>
			</MuiThemeProvider>
		</div>
	);
};
export default withStyles(styles, { withTheme: true })(CapMonitorComponent);
