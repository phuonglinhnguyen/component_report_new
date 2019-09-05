const getTaskCount = () => {
	return [
		{
			project_id: '5d099a031927c3001465f932',
			process_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_instance_id: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			id: 'Manual_Batch_Allocation',
			name: 'Manual Batch Allocation',
			count: 0
		},
		{
			project_id: '5d099a031927c3001465f932',
			process_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_instance_id: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			id: 'Type',
			name: 'Type',
			count: 5
		},
		{
			project_id: '5d099a031927c3001465f932',
			process_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_instance_id: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			id: 'Proof',
			name: 'Proof',
			count: 0
		},
		{
			project_id: '5d099a031927c3001465f932',
			process_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_instance_id: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			id: 'View_Key_Data',
			name: 'View Key Data',
			count: 0
		},
		{
			project_id: '5d099a031927c3001465f932',
			process_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_instance_id: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			id: 'Verify_Hold_Proof',
			name: 'Verify Hold Proof',
			count: 0
		},
		{
			project_id: '5d099a031927c3001465f932',
			process_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_instance_id: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			id: 'Verify_Hold_Type',
			name: 'Verify Hold Type',
			count: 0
		},
		{
			project_id: '5d099a031927c3001465f932',
			process_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_instance_id: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			id: 'Waiting_for_Proof',
			name: 'Waiting for Proof',
			count: 0
		},
		{
			project_id: '5d099a031927c3001465f932',
			process_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_instance_id: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			id: 'Task_0dyyyjm',
			name: 'Close and Rework Batch',
			count: 0
		}
	];
};

const getTaskInfo = () => {
	return [
		{
			id: 'Manual_Batch_Allocation',
			name: 'Manual Batch Allocation',
			form_uri: 'batch-allocation/5d099a031927c3001465f932/0/0/Manual_Batch_Allocation',
			process_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_key: 'start_5d099a031927c3001465f932',
			version: 21
		},
		{
			id: 'Type',
			name: 'Type',
			form_uri: 'invoice/5d099a031927c3001465f932/keying/Invoice/Type',
			process_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_key: 'start_5d099a031927c3001465f932',
			version: 21
		},
		{
			id: 'Proof',
			name: 'Proof',
			form_uri: 'invoice/5d099a031927c3001465f932/proof/Invoice/Proof',
			process_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_key: 'start_5d099a031927c3001465f932',
			version: 21
		},
		{
			id: 'View_Key_Data',
			name: 'View Key Data',
			form_uri: 'data/invoice/5d099a031927c3001465f932/View_Key_Data',
			process_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_key: 'start_5d099a031927c3001465f932',
			version: 21
		},
		{
			id: 'Verify_Hold_Proof',
			name: 'Verify Hold Proof',
			form_uri: 'verifying/hold/10/true/5d099a031927c3001465f932/Verify_Hold_Proof',
			process_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_key: 'start_5d099a031927c3001465f932',
			version: 21
		},
		{
			id: 'Verify_Hold_Type',
			name: 'Verify Hold Type',
			form_uri: 'verifying/hold/10/true/5d099a031927c3001465f932/Verify_Hold_Type',
			process_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_key: 'start_5d099a031927c3001465f932',
			version: 21
		},
		{
			id: 'Waiting_for_Proof',
			name: 'Waiting for Proof',
			form_uri: 'assign/tasks/5d099a031927c3001465f932/Waiting_for_Proof',
			process_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_key: 'start_5d099a031927c3001465f932',
			version: 21
		},
		{
			id: 'Task_0dyyyjm',
			name: 'Close and Rework Batch',
			form_uri: 'rework/projects/5d099a031927c3001465f932/Task_0mpwmax/',
			process_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			process_key: 'start_5d099a031927c3001465f932',
			version: 21
		}
	];
};

const getBatch = () => {
	return {
		batch_report: [
			{
				export_collect: 1,
				export_collected: 0,
				export_done: 0
			}
		],
		doc_set_report: [
			{
				export_collect: 5,
				export_collected: 0,
				export_done: 0
			}
		],
		document_report: [
			{
				capture: 0,
				none_capture: 0,
				qc_none: 0,
				qc_no_sampled: 0,
				qc_sampled: 0,
				qc_done: 0,
				qc_mistake: 0,
				qc_approved: 0,
				final_collected: 0,
				final_done: 5,
				transform_collected: 0,
				transform_done: 0,
				export_collected: 0,
				export_done: 0
			}
		]
	};
};

const getImportedHistory = () => {
	return [
		{
			da_item_id: '5d65004ced7da2001eae5dab',
			bpmn_instance_id: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			bpmn_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			imported_date: '2019-08-27T10:05:12.255Z',
			batch_path: '/mnt/x-storage/Projects_SIT/089_HoaiPT/Downloaded/SFTP_27-08-2019//5d65004ced7da2001eae5dab',
			created_date: '2019-08-27T10:05:12.322Z',
			last_modified: '2019-08-27T10:05:12.878Z',
			batch_id: '5d65005861b9d200109ed603',
			batch_name: '505657_20190641_JPG',
			doc_set_imported_amount: 5,
			doc_imported_amount: 5,
			id: '5d650058819e7e62e5c87a3b'
		},
		{
			da_item_id: '5d64fd89ed7da2001eae5d8d',
			bpmn_instance_id: 'da1beaf4-c8b1-11e9-b7cf-5675acad1b82',
			bpmn_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			imported_date: '2019-08-27T10:03:00.413Z',
			batch_path: '/mnt/x-storage/Projects_SIT/089_HoaiPT/Downloaded/SFTP_27-08-2019//5d64fd89ed7da2001eae5d8d',
			created_date: '2019-08-27T10:03:00.621Z',
			last_modified: '2019-08-27T10:03:02.184Z',
			batch_id: '5d64ffd661b9d200109ed5f8',
			batch_name: '505657_20190640_JPG',
			doc_set_imported_amount: 5,
			doc_imported_amount: 5,
			id: '5d64ffd4e482a861cbe66c31'
		},
		{
			da_item_id: '5d5f8d27f76f39001e7a28eb',
			bpmn_instance_id: '2e9bfe71-c5ad-11e9-b7cf-5675acad1b82',
			bpmn_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			imported_date: '2019-08-23T06:52:23.841Z',
			batch_path: '/mnt/x-storage/Projects_SIT/089_HoaiPT/Downloaded/SFTP_23-08-2019//5d5f8d27f76f39001e7a28eb',
			created_date: '2019-08-23T06:52:23.891Z',
			last_modified: '2019-08-23T06:52:24.433Z',
			batch_id: '5d5f8d286214d1436c7d5c04',
			batch_name: '505657_20190639_JPG',
			doc_set_imported_amount: 5,
			doc_imported_amount: 5,
			id: '5d5f8d27c8ccee0f60608393'
		},
		{
			da_item_id: '5d5f8caff76f39001e7a28e8',
			bpmn_instance_id: 'e71c0282-c5ac-11e9-b7cf-5675acad1b82',
			bpmn_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			imported_date: '2019-08-23T06:50:23.884Z',
			batch_path: '/mnt/x-storage/Projects_SIT/089_HoaiPT/Downloaded/SFTP_23-08-2019//5d5f8caff76f39001e7a28e8',
			created_date: '2019-08-23T06:50:23.935Z',
			last_modified: '2019-08-23T06:50:23.935Z',
			id: '5d5f8cafc8ccee0f60608392'
		},
		{
			da_item_id: '5d5f8b83f76f39001e7a28e2',
			bpmn_instance_id: '3445635e-c5ac-11e9-b7cf-5675acad1b82',
			bpmn_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			imported_date: '2019-08-23T06:45:23.843Z',
			batch_path: '/mnt/x-storage/Projects_SIT/089_HoaiPT/Downloaded/SFTP_23-08-2019//5d5f8b83f76f39001e7a28e2',
			created_date: '2019-08-23T06:45:23.905Z',
			last_modified: '2019-08-23T06:45:23.905Z',
			id: '5d5f8b83c8ccee0f60608391'
		},
		{
			da_item_id: '5d5f8a57f76f39001e7a28dc',
			bpmn_instance_id: '81ac687a-c5ab-11e9-b7cf-5675acad1b82',
			bpmn_definition_id: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			imported_date: '2019-08-23T06:40:24.206Z',
			batch_path: '/mnt/x-storage/Projects_SIT/089_HoaiPT/Downloaded/SFTP_23-08-2019//5d5f8a57f76f39001e7a28dc',
			created_date: '2019-08-23T06:40:24.267Z',
			last_modified: '2019-08-23T06:40:24.267Z',
			id: '5d5f8a58c8ccee0f60608390'
		}
	];
};

const getProjectAccess = () => {
	return [
		{
			group_id: '5cb81a80952d2a001457a956',
			group_name: 'Ancestry',
			name: '116_test',
			id: '5d495de5ea6d66005d49e4d7'
		},
		{
			group_id: '5cb81a80952d2a001457a956',
			group_name: 'Ancestry',
			name: '075_190523_099_48341_EN_Number',
			id: '5cecd338dcb2eb001634ecb4'
		},
		{
			group_id: '5cecd185dcb2eb001634ecad',
			group_name: 'Banking',
			name: '096_190619_124_MVL_eClaim',
			id: '5d0b37a6f05d51004b18591d'
		},
		{
			group_id: '5cb81ac5952d2a001457a957',
			group_name: 'Invoice',
			name: '089_190611_002_505657',
			id: '5d099a031927c3001465f932'
		},
		{
			group_id: '5cf4bd9dedcc35001ed50757',
			group_name: '040_test',
			name: '040_DEMO_DGS03',
			id: '5d1465340fb92b0017a5621a'
		}
	];
};

const getTaskInstancesDetail = () => {
	return [
		{
			id: '29877e4f-c8b2-11e9-b7cf-5675acad1b82',
			name: 'Type',
			assignee: null,
			created: '2019-08-27T10:05:13.799+0000',
			due: null,
			followUp: null,
			delegationState: null,
			description: null,
			executionId: '29861eb2-c8b2-11e9-b7cf-5675acad1b82',
			owner: null,
			parentTaskId: null,
			priority: 50,
			processDefinitionId: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			processInstanceId: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			taskDefinitionKey: 'Type',
			caseExecutionId: null,
			caseInstanceId: null,
			caseDefinitionId: null,
			suspended: false,
			formKey: null,
			tenantId: '5d099a031927c3001465f932'
		},
		{
			id: '299205b5-c8b2-11e9-b7cf-5675acad1b82',
			name: 'Type',
			assignee: null,
			created: '2019-08-27T10:05:13.868+0000',
			due: null,
			followUp: null,
			delegationState: null,
			description: null,
			executionId: '2990a618-c8b2-11e9-b7cf-5675acad1b82',
			owner: null,
			parentTaskId: null,
			priority: 50,
			processDefinitionId: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			processInstanceId: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			taskDefinitionKey: 'Type',
			caseExecutionId: null,
			caseInstanceId: null,
			caseDefinitionId: null,
			suspended: false,
			formKey: null,
			tenantId: '5d099a031927c3001465f932'
		},
		{
			id: '299befdb-c8b2-11e9-b7cf-5675acad1b82',
			name: 'Type',
			assignee: null,
			created: '2019-08-27T10:05:13.933+0000',
			due: null,
			followUp: null,
			delegationState: null,
			description: null,
			executionId: '299a913e-c8b2-11e9-b7cf-5675acad1b82',
			owner: null,
			parentTaskId: null,
			priority: 50,
			processDefinitionId: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			processInstanceId: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			taskDefinitionKey: 'Type',
			caseExecutionId: null,
			caseInstanceId: null,
			caseDefinitionId: null,
			suspended: false,
			formKey: null,
			tenantId: '5d099a031927c3001465f932'
		},
		{
			id: '29b3bdb1-c8b2-11e9-b7cf-5675acad1b82',
			name: 'Type',
			assignee: null,
			created: '2019-08-27T10:05:14.089+0000',
			due: null,
			followUp: null,
			delegationState: null,
			description: null,
			executionId: '29b25e14-c8b2-11e9-b7cf-5675acad1b82',
			owner: null,
			parentTaskId: null,
			priority: 50,
			processDefinitionId: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			processInstanceId: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			taskDefinitionKey: 'Type',
			caseExecutionId: null,
			caseInstanceId: null,
			caseDefinitionId: null,
			suspended: false,
			formKey: null,
			tenantId: '5d099a031927c3001465f932'
		},
		{
			id: '29c23cb7-c8b2-11e9-b7cf-5675acad1b82',
			name: 'Type',
			assignee: null,
			created: '2019-08-27T10:05:14.184+0000',
			due: null,
			followUp: null,
			delegationState: null,
			description: null,
			executionId: '29c040da-c8b2-11e9-b7cf-5675acad1b82',
			owner: null,
			parentTaskId: null,
			priority: 50,
			processDefinitionId: '04475bb3-9f0c-11e9-b091-9a45e4d4602b',
			processInstanceId: '28a1d948-c8b2-11e9-b7cf-5675acad1b82',
			taskDefinitionKey: 'Type',
			caseExecutionId: null,
			caseInstanceId: null,
			caseDefinitionId: null,
			suspended: false,
			formKey: null,
			tenantId: '5d099a031927c3001465f932'
		}
	];
};
