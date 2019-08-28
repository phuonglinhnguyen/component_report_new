class Capture {
	constructor() {
		this.import_date = '';
		this.file_path = '';
		this.batch_name = '';
		this.imported_amount = null;
    this.classify = [];
    this.omr = null;
    this.invoice_header = null;
    this.invoice_item = null;
    this.verify = null;
    this.finished_capture = null;
    this.available_QC = null;
    this.finished_QC = null;
    this.available_QC_Approval = null;
    this.finished_QC_Approval = null;
    this.available_export = null;
    this.finished_export = null;
    this.export_date = null;
	}
}

export default Capture;
