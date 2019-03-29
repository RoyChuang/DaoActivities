// LaunchComponent
import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';


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
        alignItems: 'stretch',
        backgroundColor: '#ffd862',
      }}
      >
        <LottieView source={require('./lottie/preloader.json')} autoPlay loop />
      </View>
    );
  }
}

export default LaunchComponent;
