// LaunchComponent
import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';


class LaunchComponent extends Component {
  // eslint-disable-next-line react/sort-comp
  _initialize = () => {
    this.props.navigation.navigate('MainScreen');
  };

  componentDidMount() {
    // eslint-disable-next-line no-underscore-dangle
    setTimeout(() => this._initialize(), 1000);
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Image source={require('../res/images/logo.png')} />
        <Text style={{fontSize: 20}}>0.0.3</Text>
      </View>
    );
  }
}

export default LaunchComponent;
