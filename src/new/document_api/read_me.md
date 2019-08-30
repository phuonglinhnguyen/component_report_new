---
layout: default
title: "Luồng chạy của monitoring"
---

get danh sách project mà người dùng có quyền pm
```js

```

sử  dụng [`project_id`](#project_id) để  get thông tin của batch đó thông qua api: 
+ [data_import_history](./data_imported_history.md)
+ [user_task_info](./user_task_info.md) dùng để load header step của project cho table.

sử  dụng [`bpmn_instance_id`](#bpmn_instance_id) và [`bpmn_definition_id`](#bpmn_definition_id) từ response [`data_import_history`](#data_import_history) để  get thông tin task count thông qua api: 
+ [task_count](./task_count.md) trả về count của từng step mà đã get được ở [`user_task_info`](#user_task_info)

sử  dụng [`batch_id`](#batch_id) từ response [`data_import_history`](#data_import_history) để  get thông tin report của batch thông qua api: 
+ [bactch_report](./bactch_report.md)

lúc này ta đã có được dữ liệu cho table của monitor
Tiếp theo xử lý sự kiện khi click vào một step trên table

sử  dụng [`process_definition_id`](#process_definition_id), [`process_instance_id`](#process_instance_id) và [`id`](#id) của step đó mà ta đã get được ở api [`task_count`](#task_count) để get danh sách task hiện có của step đó thông qua api: 
+ [task_instances_detail](./task_instances_detail.md)

sử  dụng [`executionId`](#executionId) và [`process_instance_id`](#process_instance_id) để  get thông tin của 1 task thông qua api: 
+ [variables_task](./variables_task.md)

filter dữ liệu trả về với name='input_data' để lấy thông tin của task đó

