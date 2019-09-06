import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { IconButton } from '@material-ui/core';
import moment from 'moment';
import ExportIcon from '@material-ui/icons/GetApp';
const styles: any = (theme: any) => {
	return {
	
	};
};
const ExportXLSX = (props) => {
	const { classes, batchNameData } = props;
	const id = new moment().format('YYYYMMDD');

	//export
	const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtension = '.xlsx';
	const fileName = id + '_Capture_Monitoring ';

	const exportToCSV = (batchNameData, fileName) => {
		const ws = XLSX.utils.json_to_sheet(batchNameData);
		const wb = { Sheets: { data: ws }, SheetNames: [ 'data' ] };
		const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		const data = new Blob([ excelBuffer ], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};

	return (
		<IconButton
			onClick={(e) => {
				exportToCSV(batchNameData, fileName);
			}}
		>
			<ExportIcon />
		</IconButton>
	);
};
export default withStyles(styles, { withTheme: true })(ExportXLSX);
