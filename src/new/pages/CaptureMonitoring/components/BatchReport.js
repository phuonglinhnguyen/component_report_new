import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import TableCell from '@material-ui/core/TableCell';
import reducer from '../redux/reducers';
import { getDataBatch } from '../redux/actionCreators';
import * as types from '../redux/actions';
import DetailReportDialog from './Dialogs/DetailReportDialog';
const styles = (theme) => {
	return {
		assDoc: {
			width: '3.5%',
			padding: '5px',
			'&:hover': {
				cursor: 'pointer',
				background: '#3c4858',
				color: 'white'
			}
		},
		assDocSet: {
			width: '3.5%',
			padding: '5px'
		},
		assBatch: {
			width: '3.5%',
			padding: '5px'
		}
	};
};

const BatchReport = (props) => {
	const { classes, cap, data_batch, projectId, getDataBatch } = props;
	
	const [ openReport, setOpenReport ] = useState(false);
	const [ type, setType ] = useState('');
	const batch_id = get(cap, 'batch_id', '');

	useEffect(
		() => {
			let didUpdate = false;

			if (!didUpdate) {
				const fetch = async () => {
					await getDataBatch(projectId, batch_id);
				};
				fetch();
			}
			return () => {
				didUpdate = true;
			};
		},
		[ cap ]
	);
	const datasBatch = data_batch[`${batch_id}`] || {};
	const docData = get(datasBatch, 'document_report', []);
	const batchData = get(datasBatch, 'batch_report', []);
	const docSetData = get(datasBatch, 'doc_set_report', []);

	const renderDocReport = () => {
		return docData.map((doc, index) => {
			return (
				<React.Fragment key={index}>
					<TableCell align="right" className={classes.assDocSet}>
						<span style={{ color: 'green', paddingRight: '20px' }}>{doc.capture}</span>
						<span style={{ color: 'red' }}>{doc.none_capture}</span>
					</TableCell>
					<TableCell align="right" className={classes.assDocSet}>
						{doc.qc_sampled || 0}
					</TableCell>
					<TableCell align="right" className={classes.assDocSet}>
						{doc.qc_done || 0}
					</TableCell>
					<TableCell align="right" className={classes.assDocSet}>
						{doc.qc_mistake || 0}
					</TableCell>
					<TableCell align="right" className={classes.assDocSet}>
						{doc.qc_approved || 0}
					</TableCell>
					<TableCell align="right" className={classes.assDocSet}>
						{doc.export_collected || 0}
					</TableCell>
					<TableCell
						className={classes.assDoc}
						align="right"
						onClick={() => {
							setOpenReport(true);
							setType('doc');
						}}
					>
						{doc.export_done || 0}
					</TableCell>
					{docSetData.map((docSet, indexDocSet) => (
						<React.Fragment key={indexDocSet}>
							<TableCell align="right" className={classes.assDocSet}>
								{docSet.export_collected || 0}
							</TableCell>
							<TableCell
								className={classes.assDoc}
								align="right"
								onClick={() => {
									setOpenReport(true);
									setType('doc_set');
								}}
							>
								{docSet.export_done || 0}
							</TableCell>
						</React.Fragment>
					))}
					{batchData.map((batch, indexBatch) => (
						<React.Fragment key={indexBatch}>
							<TableCell align="right" className={classes.assDocSet}>
								{batch.export_collected || 0}
							</TableCell>
							<TableCell className={classes.assDocSet} align="right">
								{batch.export_done || 0}
							</TableCell>
						</React.Fragment>
					))}
				</React.Fragment>
			);
		});
	};

	return (
		<React.Fragment>
			{renderDocReport()}
			<DetailReportDialog
				open={openReport}
				setOpen={setOpenReport}
				docData={docData}
				batchData={batchData}
				docSetData={docSetData}
				type={type}
				batch_id={batch_id}
				{...props}
			/>
		</React.Fragment>
	);
};

BatchReport.defaultProps = {
	data_batch: {}
};

export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: {
			getDataBatch
		},
		mapState: (state) => ({
			data_batch: getDataObject(`resources.${types.NAME_REDUCER}.data`, state.core)
		})
	}),
	withStyles(styles, { withTheme: true })
)(BatchReport);
