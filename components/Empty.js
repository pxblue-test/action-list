import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as Colors from '@pxblue/colors';

export default ({ icon, title, description, actions }) => (
  <View style={styles.container}>
    {icon}
    {title ? <Text style={styles.title}>{title}</Text> : null}
    {description ? <Text style={styles.description}>{description}</Text> : null}
    {actions ? actions : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.gray[500],
    paddingBottom: 10,
    textAlign: 'center',
  },
  description: {
    color: Colors.blue[500],
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    paddingBottom: 10,
  },
});