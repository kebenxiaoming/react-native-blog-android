'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import Main from './app/view/Main';

class HelloWorld extends React.Component {

   constructor(props) {
    super(props);
  }

  render() {
            let defaultName = 'Main';
            let defaultComponent = Main;
            return (
            <Navigator
              initialRoute={{ name: defaultName, component: defaultComponent }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.FloatFromLeft;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }} />
            );
     }
}
AppRegistry.registerComponent('HelloWorld', () => HelloWorld);