import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as FileSaver from 'file-saver';
import { get } from 'lodash';
import * as XLSX from 'xlsx';
import { IconButton } from '@material-ui/core';
import moment from 'moment';

import ExportIcon from '@material-ui/icons/GetApp';
const styles: any = (theme: any) => {
	return {};
};

const ExportXLSX = (props) => {
	const { batchNameData, data } = props;
	const arrInfoTask = () => {
		return batchNameData.map((item) => {
			const bpmn_definition_id = get(item, 'bpmn_definition_id');
			const bpmn_instance_id = get(item, 'bpmn_instance_id');
			const dataTask = get(data, `${bpmn_definition_id}_${bpmn_instance_id}`, []);
			const tam = dataTask.reduce((obj, itemTam) => {
				if (itemTam.process_definition_id === bpmn_definition_id && itemTam.process_instance_id === bpmn_instance_id) {
					itemTam[`${itemTam['name']}`] = itemTam.count;
					return { ...obj, ...itemTam };
				}
			}, item);
			let itemInfoTask = Object.assign({}, tam);
			delete itemInfoTask.count;
			delete itemInfoTask.created_date;
			delete itemInfoTask.da_item_id;
			delete itemInfoTask.process_definition_id;
			delete itemInfoTask.doc_set_imported_amount;
			delete itemInfoTask.id;
			delete itemInfoTask.last_modified;
			delete itemInfoTask.name;
			delete itemInfoTask.process_instance_id;
			delete itemInfoTask.project_id;
			if (!itemInfoTask.doc_imported_amount) {
				itemInfoTask['doc_imported_amount'] = 0;
			}
			return itemInfoTask;
		});
	};

	const arrInfoBatch = (tamArrTask) => {
		return tamArrTask.map((item) => {
			const batch_id = get(item, 'batch_id');
			const dataBatchReport = get(data, `${batch_id}`);
			let objTam = Object.assign({}, dataBatchReport);
			const docData = get(objTam, 'document_report', []);
			const docSetData = get(objTam, 'doc_set_report', []);
			const batchData = get(objTam, 'batch_report', []);
			const tamDoc = docData.reduce((obj, itemDoc) => {
				itemDoc['Available Export Doc'] = itemDoc.export_collected;
				itemDoc['Finish Export Doc'] = itemDoc.export_done;
				return { ...obj, ...itemDoc };
			}, item);
			delete tamDoc.export_done;
			delete tamDoc.export_collected;
			delete tamDoc.final_done;
			delete tamDoc.final_collected;
			delete tamDoc.qc_no_sampled;
			delete tamDoc.transform_collected;
			delete tamDoc.transform_done;
			const tamDocSet = docSetData.reduce((obj, itemDocSet) => {
				itemDocSet['Available Export Doc set'] = itemDocSet.export_collected;
				itemDocSet['Finish Export Doc set'] = itemDocSet.export_done;

				return { ...obj, ...itemDocSet };
			}, item);
			delete tamDocSet.export_collect;
			const tamBatch = batchData.reduce((obj, itemBatch) => {
				itemBatch['Available Export Batch'] = itemBatch.export_collected;
				itemBatch['Finish Export Batch'] = itemBatch.export_done;

				return { ...obj, ...itemBatch };
			}, item);
			delete tamBatch.export_collect;
			let obj = Object.assign({}, tamDoc, tamDocSet, tamBatch);
			return obj;
		});
	};
	let tamArrTask = arrInfoTask();
	let tamArrBatch = arrInfoBatch(tamArrTask);
	
	let dataNew = tamArrBatch.map((item) => {
		delete item.bpmn_instance_id;
		delete item.bpmn_definition_id;
		delete item.batch_id;
		delete item.export_collected;
		delete item.export_done;
		return item
	});
	
	//export
	const id = new moment().format('YYYYMMDD');
	const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtension = '.xlsx';
	const fileName = id + '_Capture_Monitoring ';

	const exportToCSV = (dataNew, fileName) => {
		const ws = XLSX.utils.json_to_sheet(dataNew);
		const wb = { Sheets: { data: ws }, SheetNames: [ 'data' ] };
		const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		const data = new Blob([ excelBuffer ], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};

	return (
		<IconButton
			onClick={(e) => {
				exportToCSV(dataNew, fileName);
			}}
		>
			<ExportIcon />
		</IconButton>
	);
};
export default withStyles(styles, { withTheme: true })(ExportXLSX);
