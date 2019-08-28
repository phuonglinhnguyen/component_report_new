import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@material-ui/core';
import moment from 'moment';

const styles: any = (theme: any) => {
	return {
		btnExport: {
			float: 'right',
			background: '#3c4858',
			margin: '10px',
			color: '#fff',
			fontWeight: 'bold',
			'&:hover': {
				background: '#303f9f'
			}
		}
	};
};
const ExportXLSX = (props) => {
	const { classes, dateToDateFilteredData } = props;
  const id = new moment().format("YYYYMMDD");
  
	//export
	const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtension = '.xlsx';
	const fileName = id + '_Performance_Report_PRD ';

	const exportToCSV = (dateToDateFilteredData, fileName) => {
		const ws = XLSX.utils.json_to_sheet(dateToDateFilteredData);
		const wb = { Sheets: { data: ws }, SheetNames: [ 'data' ] };
		const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		const data = new Blob([ excelBuffer ], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
  };
  
	return (
		<Button
			className={classes.btnExport}
			onClick={(e) => {
				exportToCSV(dateToDateFilteredData, fileName);
			}}
		>
			Export
		</Button>
	);
};
export default withStyles(styles, { withTheme: true })(ExportXLSX);
