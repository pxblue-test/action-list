import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as Colors from '@pxblue/colors';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


import { ListItem, Icon } from 'react-native-elements';

class ActionListItem extends React.PureComponent {
    menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    onDelete = () => {
        this.props.onDelete(this.props.index);
        this.hideMenu();
    }


    render() {
        const { item } = this.props;
        return (
            <ListItem
                title={item.name}
                subtitle={item.details}
                subtitleStyle={{ color: 'gray' }}
                rightElement={() => (
                    <View>
                        <Menu
                            ref={this.setMenuRef}
                            button={<Icon name="more-vert" onPress={this.showMenu} />}
                        >
                            <MenuItem onPress={this.onDelete}>Remove</MenuItem>
                            <MenuItem onPress={this.hideMenu}>View Details</MenuItem>
                        </Menu>
                    </View>
                )}
            />
        )
    }
};

export default ActionListItem;