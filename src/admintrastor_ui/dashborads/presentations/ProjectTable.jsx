import "react-virtualized/styles.css";
import * as React from "react";
import { I18n } from "react-redux-i18n";
import { AutoSizer, Column, Table, SortDirection } from "react-virtualized";
import { orderBy } from "lodash";
// import { TableX } from '../../../components/TableX'

export default class ProjectTable extends React.Component {
  constructor(props) {
    super(props);
    const sortBy = "name";
    const sortDirection = SortDirection.ASC;
    const sortedList = this._sortList({ sortBy, sortDirection });
    this.state = {
      sortBy,
      sortDirection,
      sortedList,
      items: []
    };
  }
  componentWillReceiveProps = nextProps => {
    const { items, projectName } = nextProps;
    let items_filtered = projectName
      ? items.filter(
          item => !!item.name.toLowerCase().includes(projectName.toLowerCase())
        )
      : items;
    const sortedList = this._sortList({
      sortBy: "name",
      sortDirection: SortDirection.ASC,
      items: items_filtered
    });
    this.setState({ sortedList, items: items_filtered });
  };
  _sortList = ({ sortBy, sortDirection = "asc", items }) => {
    let _items = items || (this.state && this.state.items) || [];
    let result = orderBy(_items, sortBy, sortDirection.toLowerCase());
    return result;
  };
  _getDatum = (list, index) => {
    return list[index];
  };
  _sort = ({ sortBy, sortDirection }) => {
    const sortedList = this._sortList({ sortBy, sortDirection });
    this.setState({ sortBy, sortDirection, sortedList });
  };
  render() {
    const { item_id, projectName = "", onChange, muiTheme } = this.props;
    const { sortedList, sortBy, sortDirection } = this.state;
    const rowGetter = ({ index }) => this._getDatum(sortedList, index);
    // const columns = [

    //     {
    //         name: "name",
    //         title: ,
    //         style: { width: "35%" },
    //         sort: true,
    //         render: data => {
    //             return <span title={data.name}>{data.name}</span>;
    //         }
    //     },
    //     {
    //         name: "customer",
    //         title: I18n.t("dashboard.project_table.column.customer"),
    //         sort: true,
    //         style: { width: "25%" },

    //     },
    //     {
    //         name: "group_name",
    //         title: I18n.t("dashboard.project_table.column.group_name"),
    //         sort: true,
    //         style: { width: "20%" },

    //     },
    //     {
    //         name: "active",
    //         title: I18n.t("dashboard.project_table.column.active"),
    //         sort: true,
    //         style: { width: "10%" },

    //     }
    // ]
    if (item_id) {
      return (
        <AutoSizer>
          {({ height, width }) => (
            <Table
              style={{ outline: "none" }}
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={30}
              rowCount={sortedList.length}
              onRowClick={({ event, index, rowData }) => {
                onChange(rowData.id);
              }}
              rowGetter={rowGetter}
              sort={this._sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              style={{
                border: "1px solid #dadada"
              }}
              styleBottomLeftGrid={{
                backgroundColor: "#ffffff"
              }}
              styleTopLeftGrid={{
                backgroundColor: "#f3f3f3",
                borderBottom: "4px solid #bcbcbc",
                borderRight: "4px solid #bcbcbc"
              }}
              styleTopRightGrid={{
                backgroundColor: "#f3f3f3"
              }}
            >
              <Column
                label={I18n.t("dashboard.project_table.column.project_name")}
                dataKey="name"
                width={350}
              />
            </Table>
          )}
        </AutoSizer>
      );
    }
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={width}
            height={height}
            headerHeight={20}
            rowHeight={30}
            rowCount={sortedList.length}
            onRowClick={({ event, index, rowData }) => {
              onChange(rowData.id);
            }}
            style={{ outline: "none" }}
            rowGetter={rowGetter}
            sort={this._sort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            style={{
              border: "1px solid #dadada"
            }}
            styleBottomLeftGrid={{
              backgroundColor: "#ffffff"
            }}
            styleTopLeftGrid={{
              backgroundColor: "#f3f3f3",
              borderBottom: "4px solid #bcbcbc",
              borderRight: "4px solid #bcbcbc"
            }}
            styleTopRightGrid={{
              backgroundColor: "#f3f3f3"
            }}
          >
            <Column
              label={I18n.t("dashboard.project_table.column.project_name")}
              dataKey="name"
              width={350}
            />
            <Column
              width={200}
              label={I18n.t("dashboard.project_table.column.customer")}
              dataKey="customer"
            />
            <Column
              width={200}
              label={I18n.t("dashboard.project_table.column.group_name")}
              dataKey="group_name"
            />
            <Column
              width={200}
              label={I18n.t("dashboard.project_table.column.project_manager")}
              dataKey="project_managers"
            />
            <Column
              width={200}
              // label={I18n.t("dashboard.project_table.column.designers")}
              dataKey="designers"
            />
            <Column
              width={200}
              label={I18n.t("dashboard.project_table.column.qc_admins")}
              dataKey="qc_admins"
            />
            <Column
              width={100}
              label={I18n.t("dashboard.project_table.column.priority")}
              dataKey="priority"
            />
            <Column
              width={75}
              label={I18n.t("dashboard.project_table.column.status")}
              dataKey="active"
              cellRenderer={({
                cellData,
                columnData,
                columnIndex,
                dataKey,
                isScrolling,
                rowData,
                rowIndex
              }) => {
                let active = false;
                if (typeof rowData[dataKey] === "boolean") {
                  active = rowData[dataKey];
                } else {
                  active = rowData[dataKey] === "true";
                }
                return active ? (
                  <p style={{ color: "green" }}>Active</p>
                ) : (
                  <p style={{ color: "red" }}>Inactive</p>
                );
              }}
            />
          </Table>
        )}
      </AutoSizer>
    );
  }
}
