import React, { useState, useEffect, Suspense } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import compose from 'recompose/compose';
import Table from '@material-ui/core/Table';
import reducer from '../redux/reducers';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import TablePagination from '@material-ui/core/TablePagination';
import { get } from 'lodash';
import { getDataBatchPerhour, getDataDocsMinMax } from '../redux/actionCreators';
import * as types from '../redux/actions';
import CircularProgress from '@material-ui/core/CircularProgress';
const DocsReport = React.lazy(() => import('./DocsReport'));
const styles = (theme) => {
	return {
		rowDoc: {
			width: '10%'
		},
		rowName: {
			width: '20%'
		},
		rowPath: {
			width: '50%',
			overflowWrap: 'break-word'
		}
	};
};

const DetailReport = (props) => {
	const {
		classes,
		docData,
		batchData,
		docSetData,
		cap,
		type,
		projectId,
		batch_id,
		getDataBatchPerhour,
		data_batch_perhour,
		count_docs,
		getCountDocs,
		getDataDocsMinMax
	} = props;
	const [ startDate, setStartDate ] = useState('');
	const [ hour, setHour ] = useState('');
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	useEffect(
		() => {
			let didUpdate = false;

			if (!didUpdate) {
				const fetch = async () => {
					await getDataBatchPerhour(projectId, batch_id, startDate, type, hour);
					await getCountDocs(projectId, batch_id);
				};
				fetch();
			}
			return () => {
				didUpdate = true;
			};
		},
		[ cap, projectId, batch_id, startDate, type, hour ]
	);
	const total_perhour = get(data_batch_perhour, 'export_done', 0);
	const countDocs = get(count_docs, 'total', 0);

	const exportDoc = docData.map((item) => {
		return item.export_done;
	});

	const exportBatch = batchData.map((item) => {
		return item.export_done;
	});

	const exportDocSet = docSetData.map((item) => {
		return item.export_done;
	});

	let totalExport = () => {
		if (type === 'doc') {
			return exportDoc[0];
		} else if (type === 'docset') {
			return exportDocSet[0];
		} else if (type === 'batch') {
			return exportBatch[0];
		}
	};

	const hours = [
		{
			value: '0',
			label: '0'
		},
		{
			value: '1',
			label: '1'
		},
		{
			value: '2',
			label: '2'
		},
		{
			value: '3',
			label: '3'
		},
		{
			value: '4',
			label: '4'
		},
		{
			value: '5',
			label: '5'
		},
		{
			value: '6',
			label: '6'
		},
		{
			value: '7',
			label: '7'
		},
		{
			value: '8',
			label: '8'
		},
		{
			value: '9',
			label: '9'
		},
		{
			value: '10',
			label: '10'
		},
		{
			value: '11',
			label: '11'
		},
		{
			value: '12',
			label: '12'
		},
		{
			value: '13',
			label: '13'
		},
		{
			value: '14',
			label: '14'
		},
		{
			value: '15',
			label: '15'
		},
		{
			value: '16',
			label: '16'
		},
		{
			value: '17',
			label: '17'
		},
		{
			value: '18',
			label: '18'
		},
		{
			value: '19',
			label: '19'
		},
		{
			value: '20',
			label: '20'
		},
		{
			value: '21',
			label: '21'
		},
		{
			value: '22',
			label: '22'
		},
		{
			value: '23',
			label: '23'
		},
		{
			value: '24',
			label: '24'
		}
	];
	const total = totalExport() || 0;

	const handleChange = (e) => {
		const value = e.target.value;
		setHour(value);
	};

	const handleChangeDate = (e) => {
		let value = e.target.value;
		setStartDate(value);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		let minRecord = newPage * rowsPerPage + 1;
		let maxRecord = newPage * rowsPerPage + rowsPerPage;

		getDataDocsMinMax(projectId, batch_id, minRecord, maxRecord);
	};

	const handleChangeRowsPerPage = (event) => {
		const value = event.target.value;
		setRowsPerPage(value);
		let minRecord = page * value + 1;
		let maxRecord = page * value + value;
		getDataDocsMinMax(projectId, batch_id, minRecord, maxRecord);
	};

	return (
		<div>
			<div style={{ marginBottom: '20px' }}>
				<TextField
					label="From"
					name="fromDate"
					type="date"
					margin="dense"
					onChange={handleChangeDate}
					value={startDate}
					InputLabelProps={{
						shrink: true
					}}
				/>
				<TextField select label="Hours" value={hour} onChange={handleChange} margin="dense" style={{ width: '50px' }}>
					{hours.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<div style={{ paddingRight: '25px', color: 'gray' }}>Total Export: {total} (doc)</div>
				<div style={{ paddingRight: '25px', color: 'gray' }}>Total Export Per hour: {total_perhour} (doc)</div>
			</div>
			<Paper style={{ overflow: 'auto' }}>
				<Table>
					<TableHead style={{ background: 'lightgray' }}>
						<TableRow>
							<TableCell className={classes.rowSmall}>No.</TableCell>
							<TableCell align="center" className={classes.rowName}>
								File Name
							</TableCell>
							<TableCell align="center" className={classes.rowPath}>
								File Path
							</TableCell>
							<TableCell align="right" className={classes.rowDoc}>
								Import date
							</TableCell>
							<TableCell align="right" className={classes.rowDoc}>
								Export date
							</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</Paper>
			<Paper style={{ overflow: 'auto', height: '300px' }}>
				<Table style={{ tableLayout: 'fixed' }}>
					<TableBody>
						<Suspense fallback={<CircularProgress className={classes.progress} color="secondary" />}>
							<DocsReport {...props} />
						</Suspense>
					</TableBody>
				</Table>
			</Paper>

			<TablePagination
				rowsPerPageOptions={[ 5, 10, 25 ]}
				component="div"
				count={countDocs}
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
		</div>
	);
};
export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: { getDataBatchPerhour, getDataDocsMinMax },
		mapState: (state) => ({
			data_batch_perhour: getDataObject(`resources.${types.NAME_REDUCER}.data.data_batch_perhour`, state.core),
			count_docs: getDataObject(`resources.${types.NAME_REDUCER}.data.count_docs`, state.core)
		})
	}),
	withStyles(styles, { withTheme: true })
)(DetailReport);
