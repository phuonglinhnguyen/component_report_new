import React from "react";

import AutoComplete from "material-ui/AutoComplete";

class MonitorTableBatchGridItemAssign extends React.PureComponent {
  state = {
    searchText: ""
  };

  handleUpdateInput = searchText => {
    this.setState({
      searchText: searchText
    });
  };

  handleNewRequest = () => {
    const { searchText } = this.state;
    this.setState({
      searchText: ""
    });
    this.props.action_assignTo(searchText);
  };

  render() {
    const { users, accent1Color } = this.props;
    return (
      <AutoComplete
        searchText={this.state.searchText}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleNewRequest}
        maxSearchResults={15}
        hintText="Assign to"
        hintStyle={{
          color: accent1Color
        }}
        floatingLabelFocusStyle={{
          color: accent1Color
        }}
        underlineStyle={{
          borderColor: accent1Color
        }}
        underlineFocusStyle={{
          borderColor: accent1Color
        }}
        style={{
          color: accent1Color,
          marginLeft: 10
        }}
        inputStyle={{
          marginTop: 0
        }}
        dataSource={users}
        dataSourceConfig={{
          text: "textKey",
          value: "valueKey"
        }}
      />
    );
  }
}

export default MonitorTableBatchGridItemAssign;
