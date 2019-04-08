/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import {
  ScrollView, BackHandler, Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Header, ListItem, Icon, ThemeProvider } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import _ from 'lodash';
import Swipeout from 'react-native-swipeout';

import LoginContainer from './LoginContainer';
import QrcodeContainer from './QrcodeContainer';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginFrameShow: false,
      isQrCodeFrameShow: false,
      currentQrCodeData: {},
      allUsers: []
    };
  }

  retrieveUserData = async () => {
    await AsyncStorage.getItem('users',(error, result)=>{
      this.setState({ allUsers: JSON.parse(result) });
    });
  };

  componentDidMount() {
    this.retrieveUserData();
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
    this.setState({ currentQrCodeData: val }, () => {
      this.setState({ isQrCodeFrameShow: !isQrCodeFrameShow });
    });
  }

  _deleteUser = async (user) => {
    await AsyncStorage.getItem('users',(error, result)=>{
      const users = JSON.parse(result);
      _.map(users, (u)=>{
          if(_.isEqual(user, u)){
            _.remove(users, user);
          }
      });
      AsyncStorage.setItem('users', JSON.stringify(users))
      .then(() => this.setState({allUsers: users}))
    });
  }

  closeQrCode() {
    this.setState({ isQrCodeFrameShow: false });
  }

  showLogin() {
    const { isLoginFrameShow } = this.state;
    this.setState({ isLoginFrameShow: !isLoginFrameShow });
  }

  _renderAllUsers(){
    const { allUsers } = this.state;
    return _.map(allUsers, (l,index) => (
      <Swipeout right={[
        {
          backgroundColor: 'red',
          underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
          text: '刪除',
          onPress: () => { this._deleteUser(l) }
        }
      ]} key={index}>
        <ListItem
          onPress={() => this.showQrCode(l)}
          leftIcon={{ name: 'qrcode', size: 40, type: 'font-awesome' }}
          title={l.name}
          rightTitle={l.group}
          subtitle={l.subtitle}
          bottomDivider
          titleStyle={{ fontSize: 24 }}
          rightTitleStyle={{ fontSize: 24 }}
          subtitleStyle={{ fontSize: 20 }}
        />
      </Swipeout>
    ))
  }

  render() {
    const { isLoginFrameShow, isQrCodeFrameShow, currentQrCodeData } = this.state;
    return (
      <ThemeProvider>
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
            this._renderAllUsers()
          }
        </ScrollView>
        <QrcodeContainer 
          isVisible={isQrCodeFrameShow} 
          qrCodeData={currentQrCodeData} 
          handleEvent={this.closeQrCode.bind(this)} />
        <LoginContainer 
          isVisible={isLoginFrameShow} 
          handletRetrieveUserData={this.retrieveUserData.bind(this)}
          handleEvent={this.showLogin.bind(this)} />
      </ThemeProvider>
    );
  }
}

export default MainContainer;
