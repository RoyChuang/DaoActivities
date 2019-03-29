/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import {
  ScrollView, View, BackHandler, Alert,
} from 'react-native';
import { Header, ListItem, Icon } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

import LoginContainer from './LoginContainer';
import QrcodeContainer from './QrcodeContainer';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginFrameShow: false,
      isQrCodeFrameShow: false,
      currentQrCodeData: {},
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Alert.alert(
      '是否離開App',
      '',
      [
        { text: '否', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: '是', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false },
    );
    return true;
  }

  showQrCode(val) {
    const { isQrCodeFrameShow } = this.state;
    console.log('val=====', val);
    this.setState({ currentQrCodeData: val }, () => {
      this.setState({ isQrCodeFrameShow: !isQrCodeFrameShow });
    });
  }

  closeQrCode() {
    this.setState({ isQrCodeFrameShow: false });
  }

  showLogin() {
    const { isLoginFrameShow } = this.state;
    this.setState({ isLoginFrameShow: !isLoginFrameShow });
  }

  render() {
    const { isLoginFrameShow, isQrCodeFrameShow, currentQrCodeData } = this.state;
    const list = [
      {
        name: 'Test name1',
        subtitle: '0911722845',
        group: 'group 1',
      },
      {
        name: 'Test name2',
        subtitle: '0933223876',
        group: 'group 2',
      },

    ];
    return (
      <View>
        <Header
          leftComponent={(
            // eslint-disable-next-line no-underscore-dangle
            <TouchableScale activeScale={0.75} onPress={() => this.showLogin()}>
              <Icon
                size={40}
                name="person-add"
                color="#fff"
              />
            </TouchableScale>
            )}
          centerComponent={{ text: 'TEST1133', style: { color: '#fff', fontSize: 30 } }}
        />
        <ScrollView>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                onPress={() => this.showQrCode(l)}
                Component={TouchableScale}
                leftIcon={{ name: 'qrcode', size: 40, type: 'font-awesome' }}
                title={l.name}
                rightTitle={l.group}
                subtitle={l.subtitle}
                activeScale={0.95}
                bottomDivider
                titleStyle={{ fontSize: 24 }}
                rightTitleStyle={{ fontSize: 24 }}
                subtitleStyle={{ fontSize: 20 }}
              />
            ))
          }
        </ScrollView>
        <QrcodeContainer isVisible={isQrCodeFrameShow} qrCodeData={currentQrCodeData} handleEvent={this.closeQrCode.bind(this)} />
        <LoginContainer isVisible={isLoginFrameShow} handleEvent={this.showLogin.bind(this)} />
      </View>
    );
  }
}

export default MainContainer;
