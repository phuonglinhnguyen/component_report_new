export const getDataCaptuteMonitor = () => {
	return [
		{
			import_date: '20190520',
			file_path: 'P:/119_161116_002_505208/Images/0050_20190604',
			batch_name: ' 205208J000734.zip',
			imported_amount: 36,
			created_date: '2019-06-03 04:36:00.064Z',
			classify: {
				total: 3,
				// taskDefKey:"Classfiy_060",
				items: [
					{
						task_id: '01d8a757-b2ae-11e9-b018-4e9fa7f58ce7',
						taskName: 'classify',
						file_path: [ '/Images/0050_20190604' ],
						username: 'linhnp',
						status: 'Online'
					},
					{
						task_id: '49eb09dc-b2ac-11e9-b018-4e9fa7f58ce7',
						taskName: 'classify',
						file_path: [ '/Images/0050_20190604' ],
						username: '',
						status: 'Offline'
					},
					{
						task_id: '5a66db7a-b2ac-11e9-b018-4e9fa7f58ce7',
						taskName: 'classify',
						file_path: [ '/Images/0050_20190604' ],
						username: 'quanvt',
						status: 'Offline'
					}
				]
			},
			omr: {
				total: 1,
				// taskDefKey:"Omr_060",
				items: [
					{
						task_id: '49eb09dc-b2ac-11e9-b018-4e9fa7f58ce7',
						taskName: 'omr',
						file_path: 'P:/119_161116_002_505208/Images/0050_20190604',
						username: 'linhnp',
						status: 'Online'
					}
				]
			},

			invoice_header: {
				total: 2,
				// taskDefKey:"Omr_060",
				items: [
					{
						task_id: '50eb09dc-b2ac-11e9-b018-4e9fa7f58ce7',
						taskName: 'Invoice Header',
						file_path: 'P:/119_161116_002_505208/Images/0050_20190604',
						username: 'linhnp',
						status: 'Online'
					},
					{
						task_id: '49eb09dc-b2ac-11e9-b018-4e9fa7f58ce7',
						taskName: 'Invoice Header',
						file_path: 'P:/119_161116_002_505208/Images/0050_20190604',
						username: 'linhnp',
						status: 'Online'
					}
				]
			},

			invoice_item: {
				total: 2,
				// taskDefKey:"Omr_060",
				items: [
					{
						task_id: '50eb09dc-b2ac-11e9-b018-4e9fa7f58ce7',
						taskName: 'Invoice Item',
						file_path: 'P:/119_161116_002_505208/Images/0050_20190604',
						username: 'linhnp',
						status: 'Online'
					},
					{
						task_id: '49eb09dc-b2ac-11e9-b018-4e9fa7f58ce7',
						taskName: 'Invoice Item',
						file_path: 'P:/119_161116_002_505208/Images/0050_20190604',
						username: 'linhnp',
						status: 'Online'
					}
				]
			},

			verify: 0,
			finished_capture: 0,
			available_QC: 16,
			finished_QC: 0,
			available_QC_Approval: 16,
			finished_QC_Approval: 0,
			available_export: 16,
			finished_export: [
				{
					file_path: 'P:/119_161116_002_505208/Images/0050_20190604',
					batch_name: ' 505208J000734.zip',
					import_date: '20190427',
					export_date: '20190529',
					total_exported: 20,
					total_exported_perhour: 10
				},
				{
					file_path: 'P:/119_161116_002_505208/Images/0050_20190604',
					batch_name: ' 505208J000734.zip',
					import_date: '20190427',
					export_date: '20190529',
					total_exported: 20,
					total_exported_perhour: 10
				}
			],
			export_date: '20190529'
		},

	];
};
