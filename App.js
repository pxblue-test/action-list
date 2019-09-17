import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionList from './components/ActionList';

export default function App() {
  return (
    <View style={styles.container}>
      <ActionList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
