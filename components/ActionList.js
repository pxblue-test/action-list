import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import * as Colors from '@pxblue/colors'
import { Header, Icon, Button, Text } from 'react-native-elements';
import ActionListItem from './ActionListItem';

class ActionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.prepareData(),
        }
    }

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

    onDelete = (index) => {
        const data = [...this.state.data];
        data.splice(index, 1);
        this.setState({ data });
    }

    deleteAll = () => this.setState({ data: [] });
    renderHeaderRightComponents = () => (
        <View style={styles.headerRightComponent}>
            <Button
                icon={
                    <Icon name="delete" color="#fff" />
                }
                type="clear"
                onPress={this.deleteAll}
            />
            <Button
                icon={
                    <Icon name="add" color="#fff" />
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
                    centerComponent={{ text: 'Action List', style: { color: '#fff', fontSize: 16, } }}
                    rightComponent={this.renderHeaderRightComponents}
                />
                {
                    this.state.data.length
                        ? (
                            <FlatList
                                data={this.state.data}
                                keyExtractor={(item, index) => `${index}`}
                                renderItem={({ item }) => (
                                    <ActionListItem
                                        item={item}
                                        onDelete={this.onDelete}
                                    />
                                )}
                            />
                        )
                        : (
                            <View style={styles.noItems}>
                                <Text h4>No Items found</Text>
                                <Button onPress={this.addItem} title={'Add An Item'} style={{ paddingTop: 10 }} />
                            </View>
                        )
                }

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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