import * as React from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Popover from 'material-ui/Popover';
import { Menu, MenuItem } from 'material-ui/Menu'
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import StorageIcon from 'material-ui/svg-icons/device/storage'
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import InfoIcon from 'material-ui/svg-icons/action/info';
import MoveIcon from 'material-ui/svg-icons/action/exit-to-app';
import NewFolderIcon from 'material-ui/svg-icons/file/create-new-folder';
import RenameIcon from 'material-ui/svg-icons/editor/border-color';

import wrapState from '../../../components/SelectableList/SelectableListNew';
import { isEqual } from 'lodash'
let SelectableList = makeSelectable(List);
SelectableList = wrapState(SelectableList);

type Props = {
    label_keys: string[],
    redirectGroup: Function,
    datas: Array<Object>,
    item_id: string,
    id_selected: string,
    primary1Color: string,
    secondaryTextColor: string,
    style: Object
};
class GroupTree extends React.PureComponent<Props, Object> {
    constructor(props: Props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleRequestClose = (event: Object) => {
        this.setState({
            open: false,
        });
    }
    handleContextMenu = (event: Object) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        })
    }
    renderItem = (child_group:
        Array<Object> = [], name: string) => {
        const {
            id_selected,
            label_keys = ['name'],
            primary1Color,
            item_id,
            secondaryTextColor,
            redirectGroup
        } = this.props;
        let nestedItems = [];
        child_group.forEach((data, index) => {
            if (data.type === 'Project') return;
            nestedItems = [
                ...nestedItems,
                <ListItem
                    style={{ height: 42, padding: 0, margin: 0 }}
                    // onContextMenu={this.handleContextMenu}
                    initiallyOpen={JSON.stringify(data.childs || []).includes(
                        item_id
                    )}
                    innerDivStyle={{
                        color: data.id === item_id ? primary1Color : secondaryTextColor,
                        // overflow: 'hidden',
                        // textOverflow: 'ellipsis',
                        // whiteSpace: 'nowrap',
                        // paddingTop: 14,
                        // paddingBottom: 4,
                        // fontSize: 16
                    }}
                   
                    key={'list-item-' + data.name}
                    leftIcon={
                        (
                            <FolderIcon
                                // style={{
                                //     display: "block", 
                                //     height: 24,
                                //     marginTop:0,
                                //     position:"absolute",
                                //     top:4,
                                //     width:24
                                // }}
                                color={
                                    data.id === item_id ? primary1Color : secondaryTextColor
                                }
                            />
                        )
                    }
                    nestedItems={this.renderItem(data.childs, data.name)}
                    onClick={() => redirectGroup(data.id, data)}
                    value={data.id}
                    primaryText={label_keys.map(_label => {
                        return data[_label];
                    })}
                >
                </ListItem>
            ];
        });
        return nestedItems;
    }

    render() {
        const {
            redirectGroup,
            datas = [],
            id_selected,
            primary1Color,
            secondaryTextColor,
            item_id,
            style = {}
        } = this.props;
        return (
            <React.Fragment>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                    useLayerForClickAway={false}
                >
                    <Menu>
                        <MenuItem leftIcon={<NewFolderIcon />} primaryText="Create Group" />
                        <MenuItem leftIcon={<NewFolderIcon />} primaryText="Create Project" />
                        <MenuItem leftIcon={< RenameIcon />} primaryText="Rename" />
                        <MenuItem leftIcon={<MoveIcon />} primaryText="Move to..." />
                        <MenuItem leftIcon={<DeleteIcon />} primaryText="Delete" />
                    </Menu>
                </Popover>
                <SelectableList defaultValue={item_id} style={{ ...style }}>
                    <ListItem
                        style={{ height: '36' ,marginTop:-6}}
                        initiallyOpen={true}
                        innerDivStyle={{
                            color: item_id === 'all' ? primary1Color : secondaryTextColor
                        }}
                        key={'list-item-root'}
                        leftIcon={
                            <StorageIcon
                                color={
                                    item_id === 'all' ? primary1Color : secondaryTextColor
                                }
                            />
                        }
                        nestedItems={this.renderItem(datas, 'Groups')}
                        onClick={() => redirectGroup('all', datas)}
                        value={'all'}
                    >
                        {'ALL GROUPS'}
                    </ListItem>
                </SelectableList>
            </React.Fragment>
        );
    }
};

export default GroupTree;