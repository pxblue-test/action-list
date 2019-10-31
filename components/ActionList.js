import React from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { Icon, Button, ListItem } from 'react-native-elements';
import Modal from 'react-native-modal';

import * as Colors from '@pxblue/colors'
import { EmptyState, Header, InfoListItem, wrapIcon } from '@pxblue/react-native-components';

const DeleteIcon = wrapIcon({ IconClass: Icon, name: 'delete' });
const AddIcon = wrapIcon({ IconClass: Icon, name: 'add' });
const MenuIcon = wrapIcon({ IconClass: Icon, name: 'menu' });


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
        return { id: randomInt, name: `Item ${randomInt}`, details: `Item ${randomInt} occurred` };
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

    deleteAll = () => {
        this.setState({data: []});
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title={'Action List'}
                    navigation={{ icon: MenuIcon, onPress: () => { } }}
                    actionItems={[
                        { icon: DeleteIcon, onPress: this.deleteAll },
                        { icon: AddIcon, onPress: this.addItem },
                    ]}
                />
                {
                    this.state.data.length
                        ? (
                            <FlatList
                                data={this.state.data}
                                keyExtractor={(item, index) => `${index}`}
                                renderItem={({ item, index }) => (
                                    <InfoListItem
                                        title={item.name}
                                        hidePadding={true}
                                        subtitle={item.details}
                                        backgroundColor={Colors.white[50]}
                                        rightComponent={<Icon name="more-vert" onPress={() => this.showModal(index)} color={Colors.black[500]} />}
                                    />
                                )}

                            />
                        )
                        : (
                            <EmptyState
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
                        <View style={{ backgroundColor: Colors.white[50] }}>
                            <ListItem
                                titleStyle={{ color: Colors.black[500] }}
                                title={'Edit Details'}
                                leftIcon={{ name: 'edit' }}
                            />
                            <ListItem
                                titleStyle={{ color: Colors.black[500] }}
                                title={'Remove'}
                                leftIcon={{ name: 'cancel' }}
                                onPress={this.onDelete}
                            />
                            <ListItem
                                titleStyle={{ color: Colors.black[500] }}
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
        backgroundColor: Colors.white[50],
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