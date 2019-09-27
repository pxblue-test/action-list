import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
import * as Colors from "@pxblue/colors";

const ActionListItem = ({ item, index, showModal }) => (
    <ListItem
        title={item.name}
        subtitle={item.details}
        subtitleStyle={{ color: Colors.gray[500] }}
        rightElement={() => (<Icon name="more-vert" onPress={() => showModal(index)} color={Colors.gray[500]} />)}
    />
);

export default ActionListItem;