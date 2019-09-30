import React from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import * as Colors from '@pxblue/colors'
import { Header, Icon, Button, ListItem } from 'react-native-elements';
import Modal from 'react-native-modal';

import ActionListItem from './ActionListItem';
import Empty from './Empty';

class ActionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.prepareData(),
            isModalVisible: false,
            selectedItemIndex: null,
        }
    }

    hideModal = () => this.setState({ isModalVisible: false, selectedItemIndex: null });

    showModal = (selectedItemIndex) => this.setState({ isModalVisible: true, selectedItemIndex });

    prepareData = () => {
        const data = [];
        for (var i = 0; i < 10; i++) {
            data.push(this.createRandomItem(i));
        }
        return data
    }

    createRandomItem = () => {
        const randomInt = parseInt((Math.random() * 100) + '', 10);
        return { id: randomInt, name: `Item ${randomInt}`, details: `Item ${randomInt} occured` };
    }

    addItem = () => {
        this.setState((prevState) => ({
            data: [...prevState.data, this.createRandomItem()],
        }));
    }

    onDelete = () => {
        const data = [...this.state.data];
        data.splice(this.state.selectedItemIndex, 1);
        this.setState({ data });
        this.hideModal();
    }

    deleteAll = () => this.setState({ data: [] });

    renderHeaderRightComponents = () => (
        <View style={styles.headerRightComponent}>
            <Button
                icon={
                    <Icon name="delete" color={Colors.white[500]} />
                }
                type="clear"
                onPress={this.deleteAll}
            />
            <Button
                icon={
                    <Icon name="add" color={Colors.white[500]} />
                }
                type="clear"
                onPress={this.addItem}
            />
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={Colors.blue[500]}
                    centerComponent={{ text: 'Action List', style: { color: Colors.white[500], fontSize: 16, } }}
                    rightComponent={this.renderHeaderRightComponents}
                />
                {
                    this.state.data.length
                        ? (
                            <FlatList
                                data={this.state.data}
                                keyExtractor={(item, index) => `${index}`}
                                renderItem={({ item, index }) => (
                                    <ActionListItem
                                        item={item}
                                        index={index}
                                        showModal={this.showModal}
                                    />
                                )}
                            />
                        )
                        : (
                            <Empty
                                title={'No Items found'}
                                actions={
                                    <Button
                                        icon={<Icon name="add" color={Colors.white[500]} />}
                                        onPress={this.addItem} title={'Add An Item'}
                                    />
                                }
                            />
                        )
                }
                <SafeAreaView>
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
                </SafeAreaView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white[500],
    },
    headerRightComponent: {
        flex: 1,
        flexDirection: 'row',
    },
    noItems: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    }
});
export default ActionList;