import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionList from './components/ActionList';
import { ThemeProvider } from '@pxblue/react-native-components';
import * as PXBThemes from '@pxblue/themes/react-native';
import * as Font from 'expo-font';

export default class App extends React.Component {
  /*
   * This componentDidMount method is used to asynchronously load the open sans font into
   * this expo application. This is needed to use the PX Blue themes. Make sure that the
   * fonts have been copied into the assets/fonts folder for loading.
  */
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-extrabold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.fontLoaded ? (
            <ThemeProvider theme={PXBThemes.expoBlue}>
              <ActionList />
            </ThemeProvider>
          ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
