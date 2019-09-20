import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import reducer from '../redux/reducers';
import { getDataDocsMinMax } from '../redux/actionCreators';
import * as types from '../redux/actions';
import moment from 'moment';
const styles = (theme) => {
	return {};
};

const DocsReport = (props) => {
	const { classes, cap, projectId, batch_id, data_docs, getDataDocsMinMax } = props;

	useEffect(
		() => {
			let didUpdate = false;

			if (!didUpdate) {
				const fetch = async () => {
					await getDataDocsMinMax(projectId, batch_id, 1, 5);
				};
				fetch();
			}
			return () => {
				didUpdate = true;
			};
		},
		[ cap, projectId, batch_id ]
	);
	const arrDocs = data_docs || [];
	const renderDocReport = () => {
		return arrDocs.map((doc, index) => {
			const filePath = get(doc, 'doc_uri', []);
			const path = filePath[0].split('/');
			const fileName = path[path.length - 1];
			let exportedDate = get(doc, 'exported_date', '');
			let importedDate = get(doc, 'created_date', '');
			let showExportedDate = moment(exportedDate).format('YYYYMMDD');
			let showImportedDate = moment(importedDate).format('YYYYMMDD');
			return (
				<TableRow key={doc.id}>
					<TableCell className={classes.rowSmall}>{index + 1}</TableCell>
					<TableCell align="center" className={classes.rowName}>
						{fileName || 'no name'}
					</TableCell>
					<TableCell align="center" className={classes.rowPath}>
						{filePath || 'no path'}
					</TableCell>
					<TableCell align="right" className={classes.rowDoc}>
						{showImportedDate || ''}
					</TableCell>
					<TableCell align="right" className={classes.rowDoc}>
						{showExportedDate || ''}
					</TableCell>
				</TableRow>
			);
		});
	};
	return (
		<React.Fragment>
			{renderDocReport()}
		</React.Fragment>
	);
};

export default compose(
	PageDecorator({
		resources: [ reducer ],
		actions: {
			getDataDocsMinMax
		},
		mapState: (state) => ({
			data_docs: getDataObject(`resources.${types.NAME_REDUCER}.data.data_docs`, state.core)
		})
	}),
	withStyles(styles, { withTheme: true })
)(DocsReport);
