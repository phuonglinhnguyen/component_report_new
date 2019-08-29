# example for report batches
# note: Nên xem file workflow status để  biết được luồng đi và trạng thái của dữ liệu.

```js
GET: 'https://sit-apollo.digi-texx.vn/api/report/apps/:app_name/projects/:project_id//batches/:batch_id'

response nếu không có QC:
	{
		"batch_report": [
			{
				"export_collect": 0,
				"export_collected": 0,
				"export_done": 0
			}
		],
		"doc_set_report": [
			{
				"export_collect": 0,
				"export_collected": 0,
				"export_done": 0
			}
		],
		"document_report": [
			{
				"capture": 0,
				"none_capture": 0,
				"final_collected": 0,
				"final_done": 0,
				"transform_collected": 0,
				"transform_done": 1145,
				"export_collected": 0,
				"export_done": 0
			}
		]
	}

response nếu có QC:
	{
		"batch_report": [
			{
				"export_collect": 0,
				"export_collected": 0,
				"export_done": 0
			}
		],
		"doc_set_report": [
			{
				"export_collect": 0,
				"export_collected": 0,
				"export_done": 0
			}
		],
		"document_report": [
			{
				"capture" : 0,
				"none_capture" : 0,
				"qc_none" : 0,
				"qc_no_sampled" : 0,
				"qc_sampled" : 0,
				"qc_done" : 0,
				"qc_mistake" : 0,
				"qc_approved" : 0,
				"final_collected" : 0,
				"final_done" : 0,
				"transform_collected" : 0,
				"transform_done" : 0,
				"export_collected" : 0,
				"export_done" : 0
			}
		]
	}
```