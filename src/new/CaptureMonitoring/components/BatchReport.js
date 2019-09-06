import React, { useState } from 'react';
import { get } from 'lodash';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import TableCell from '@material-ui/core/TableCell';
import reducer from '../redux/reducers';
import { getDataBatch } from '../redux/actionCreators';
import * as types from '../redux/actions';
const styles = (theme) => {
	return {
		assCursor: {
			width: '3%',
			'&:hover': {
				cursor: 'pointer',
				background: '#3c4858',
				color: 'white'
			}
		}
	};
};

const BatchReport = (props) => {
	const { classes, cap, data_batch, projectId } = props;
	const batch_id = get(cap, 'batch_id', '');
	useState(() => {
		props.getDataBatch(projectId, batch_id);
	});

	const datasBatch = data_batch[`${batch_id}`] || {};
	const docData = get(datasBatch, 'document_report', []);

	const renderBatchReport = () => {
		return docData.map((doc) => {
			return (
				<React.Fragment>
					<TableCell align="right" className={classes.assCursorChild}>
						<span style={{ color: 'green', paddingRight: '20px' }}>{doc.capture}</span>
						<span style={{ color: 'red' }}>{doc.none_capture}</span>
					</TableCell>
					<TableCell align="right" className={classes.assCursorChild}>
						{doc.qc_none }
					</TableCell>
					<TableCell align="right" className={classes.assCursorChild}>
						{/* finish_QC */}
						{doc.qc_done }
					</TableCell>
					<TableCell align="right" className={classes.assCursorChild}>
						{/* available_Qc_Approval */}
						{doc.qc_approved }
					</TableCell>
					<TableCell align="right" className={classes.assCursorChild}>
						{/* finished_QC_Approval */}
						{doc.qc_mistake }
					</TableCell>
					<TableCell align="right" className={classes.assCursorChild}>
						{doc.export_collected}
					</TableCell>
					<TableCell className={classes.assCursorChild} align="right">
						{doc.export_done}
					</TableCell>
				</React.Fragment>
			);
		});
	};

	return renderBatchReport();
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
