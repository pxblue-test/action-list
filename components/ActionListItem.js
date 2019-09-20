import React from 'react';
import { View, Text } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { ListItem, Icon } from 'react-native-elements';
import * as Colors from "@pxblue/colors";
import Modal from 'react-native-modal';

class ActionListItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        }
    }

    hideModal = () => this.setState({ isModalVisible: false });

    showModal = () => this.setState({ isModalVisible: true });

    onDelete = () => {
        this.props.onDelete(this.props.index);
        this.hideModal();
    }


    render() {
        const { item } = this.props;
        return (
            <>
                <ListItem
                    title={item.name}
                    subtitle={item.details}
                    subtitleStyle={{ color: Colors.gray[500] }}
                    rightElement={() => (<Icon name="more-vert" onPress={this.showModal} color={Colors.gray[500]} />)}
                />
                <Modal
                    isVisible={this.state.isModalVisible}
                    backdropOpacity={0.5}
                    supportedOrientations={['portrait', 'landscape']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                >
                    <View style={{ backgroundColor: Colors.white[500] }}>
                        <ListItem
                            title={'Edit Details'}
                            leftIcon={{ name: 'edit' }}
                        />
                        <ListItem
                            title={'Remove'}
                            leftIcon={{ name: 'cancel' }}
                            onPress={this.onDelete}
                        />
                        <ListItem
                            title={'Cancel'}
                            leftIcon={{ name: 'clear' }}
                            onPress={this.hideModal}
                        />

                    </View>
                </Modal>
            </>
        )
    }
};

export default ActionListItem;