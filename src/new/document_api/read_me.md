---
layout: default
title: "monitoring"
---
Mục đích của hướng dẫn này là giúp bạn hiển thỉ được dữ liệu cho table monitor sử dụng phương pháp Lazyloading.

Get danh sách `project` mà người dùng có quyền `project_management` từ api:
+ [project_info](./project_info.md)

Sử  dụng `project_id` lấy được từ api `project_info` để  get thông tin của các `batch` trong `project` đó thông qua api: 
+ [data_import_history](./data_imported_history.md)
+ [user_task_info](./user_task_info.md) dùng để `load step header` của project trên `table monitor`.

Sử  dụng `bpmn_instance_id` và `bpmn_definition_id` từ response `data_import_history` để  get thông tin cho từng `step` thông qua api: 
+ [task_count](./task_count.md) trả về `count của từng step` mà đã get được ở api `user_task_info`.

Sử  dụng `batch_id` từ response `data_import_history` để  get thông tin `report của batch` thông qua api: 
+ [bactch_report](./bactch_report.md)

Lúc này ta đã có được dữ liệu cho `table monitor`.
Tiếp theo xử lý sự kiện khi click vào một step trên table.

Sử  dụng `process_definition_id`, `process_instance_id` và `id` của step đó mà ta đã get được ở api `task_count` để get danh sách task hiện có của step đó thông qua api: 
+ [task_instances_detail](./task_instances_detail.md)

Sử  dụng `executionId` và `process_instance_id` để  get thông tin của 1 task thông qua api: 
+ [variables_task](./variables_task.md)

Lưu ý: `filter` dữ liệu trả về  của api với `name='input_data'` để lấy thông tin của task đó

