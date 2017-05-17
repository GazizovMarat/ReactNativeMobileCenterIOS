/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

var AppleHealthKit = require('react-native-apple-healthkit')



export default class MobileCenter extends Component {
  constructor(props) {
    super(props)
    this.healthKitUpdate = this.healthKitUpdate.bind(this);
    this.state = { loading: false }
  }
  count = 0;
  HKPERMS  = () => AppleHealthKit.Constants.Permissions;
  HKOPTIONS = {
  permissions: {
    read: [
      this.HKPERMS.StepCount,
      this.HKPERMS.DistanceWalkingRunning,
      this.HKPERMS.FlightsClimbed,
      this.HKPERMS.Height,
      this.HKPERMS.DateOfBirth,
      this.HKPERMS.BiologicalSex,
      this.HKPERMS.SleepAnalysis,
    ],
    write: [
      this.HKPERMS.StepCount
    ],
  }
};
  healthKitUpdate() {
 

  AppleHealthKit.isAvailable((err, available)=>{

  })
    AppleHealthKit.isAvailable((err, available) => {
      if (available) {
        AppleHealthKit.initHealthKit(this.HKOPTIONS, (err, res) => {
          if (this._handleHKError(err, 'initHealthKit')) {
            return;
          }

          AppleHealthKit.initStepCountObserver({}, () => { });

          var subscription = NativeAppEventEmitter.addListener(
            'change:steps',
            (evt) => {
              console.log('change:steps EVENT!! : ', evt);
              //this._fetchStepsToday();
            }
          );

          this.sub = subscription;

          //this._fetchStepsToday();
          //this._fetchStepsHistory();

          //this._fetchSleepAnalysis();
        });
      }
    });
    this.count += 1;
    this.setState((prevState, props) => {
      loading: !this.state.loading;
    });

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
          {this.count}
        </Text>
        <Button

          title='healthKit'
          onPress={this.healthKitUpdate}
        >
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MobileCenter', () => MobileCenter);
