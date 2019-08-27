import React, { useState } from 'react';
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
import DetailDialog from './Dialogs/DetailDialog';
import ExportXLSX from './ExportXLSX';
import {getProjects} from '../../../providers/data/mockData/projects'

const styles: any = (theme: any) => {
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
	const { classes } = props;
const urlParams = new URLSearchParams(props.location.search);
const groupId = urlParams.get('groupId');
console.log({groupId})

	const captureMonitors = getProjects();
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
  console.log(captureMonitors);
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

	const checkDongHo = (groupId, cap_group_id) => {
		return true
	}

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
								<TableCell align="right" className={classes.rowSmall}>
									Imported Amount
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Classify
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									OMR
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Invoice Header
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Invoice Item
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Verify Hold/Bad
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Finished Capture
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Available for QC
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Finished QC
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Available for QC Approval
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Finished QC Approval
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Available For Export
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Finished Export
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									Exported Date
								</TableCell>
								<TableCell align="right" className={classes.rowSmall}>
									WorkFlow
								</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</Paper>
				<Paper style={{ overflow: 'auto', height: '675px' }}>
					<Table style={{ tableLayout: 'fixed' }}>
						<TableBody>
							{batchNameData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cap, index) => {
								// groupId is get from url query
								const cap_group_id = cap.group_id || ''
								const isDongHo = checkDongHo(groupId, cap_group_id)
								if (!isDongHo) return null
								
								const classify =get(cap,'classify.total',{})
								const omr =get(cap,'omr.total',{})
								const invoice_header =get(cap,'invoice_header.total',{})
								const invoice_item =get(cap,'invoice_item.total',{})
								const finished_export =get(cap,'finished_export.total',{})
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
											{classify}
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
											{omr}
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
											{invoice_header}
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
											{invoice_item}
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
											onClick={() => {
												setOpenViewDetail(true);
												setSelectedCapture(cap);
												setChoose('Finished Export');
												setRole('QC');
											}}
										>
											{finished_export}
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
