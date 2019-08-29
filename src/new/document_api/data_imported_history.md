# example for report data_imported_history

```js
GET: 'https://sit-apollo.digi-texx.vn/api/report/apps/:app_name/projects/:project_id/data-imported-history'
GET: 'https://sit-apollo.digi-texx.vn/api/report/apps/:app_name/projects/:project_id/data-imported-history?min_result=10&max_result=20'
    +QueryParams:
        min_result :required
        max_result :required
GET: 'https://sit-apollo.digi-texx.vn/api/report/apps/:app_name/projects/:project_id/data-imported-history?from_date=2019-08-20&to_date=2019-08-29&min_result=1&max_result=20'
    +QueryParams:
        min_result :required
        max_result :required
        from_date (yyyy-mm-dd) :required
        to_date (yyyy-mm-dd) :required
GET: 'https://sit-apollo.digi-texx.vn/api/report/apps/:app_name/projects/:project_id/data-imported-history?from_date=2019-08-26&to_date=2019-08-29&batch_name=112233445566778899Y390&min_result=1&max_result=20'
    +QueryParams:
        min_result :required
        max_result :required
        batch_name :unrequired
        from_date (yyyy-mm-dd) :required
        to_date (yyyy-mm-dd) :required
    response: [
        {
        "_id" : ObjectId("5d63d926d2a8610017910c25"),
        "da_item_id" : "5d63d926d2a8610017910c24",
        "bpmn_instance_id" : "35983d4a-c802-11e9-b7cf-5675acad1b82",
        "bpmn_definition_id" : "61e0978d-b77b-11e9-b018-4e9fa7f58ce7",
        "imported_date" : ISODate("2019-08-26T13:05:42.646Z"),
        "created_date" : ISODate("2019-08-26T13:05:42.646Z"),
        "last_modified" : ISODate("2019-08-26T06:06:08.967Z"),
        "batch_id" : "5d6376d0889fdd0012a164a4",
        "batch_name" : "112233445566778899Y390",
        "doc_set_imported_amount" : 1,
        "doc_imported_amount" : 1
        },
        ......
    ]
```

```js
GET: 'https://sit-apollo.digi-texx.vn/api/report/apps/:app_name/projects/:project_id/data-imported-history/count'
    response: {
        "count": 9
    }
```