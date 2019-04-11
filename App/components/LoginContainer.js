import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { View, Dimensions, Text } from 'react-native';
import {
  Card, Icon, Input, Button,
} from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      subtitle: '',
      group: '',
    };
  }

  _storeUserData = async (val) => {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(val));
    } catch (error) {
      // Error saving data
    }
  };

  _handleAddUser = async () => {
    const {name, subtitle, group} = this.state;
    const { handleEvent, handletRetrieveUserData } = this.props;
    await AsyncStorage.getItem('users',(error, result)=>{
      if(result){
        let user = {
          'name': name,
          'subtitle': subtitle,
          'group': group
        }
        let allUsers = JSON.parse(result);
        allUsers.push(user);
        this._storeUserData(allUsers);
        this.setState({'name':''})
        this.setState({'group':''})
        this.setState({'subtitle':''})
      }else{
        let user = {
          'name': name,
          'subtitle': subtitle,
          'group': group
        }
        console.log('useruseruseruser=',user);
        let users = [];
        users.push(user);
        this._storeUserData(users);
      }
      handletRetrieveUserData();
      handleEvent();
      this.setState({'name':''})
      this.setState({'group':''})
      this.setState({'subtitle':''})
    });
  }

  checkInput = () => {
    const { name, group, subtitle } = this.state;
    if(name && group && subtitle){
      return false;
    }else{
      return true;
    }
  };

  render() {
    const { isVisible, handleEvent } = this.props;
    const width = Dimensions.get('window').width;
    return (
      <View>
        <Modal isVisible={isVisible}>
          <View style={{ flex: 1 }}>
            <Card
              title="新增人員"
              titleStyle={{ color: '#03A9F4' }}
              image={require('../res/images/logo.png')}
            >
              <Text style={{marginBottom: 10}}>
                皆為必填欄位,以產生Qrcode.
              </Text>
              <Input
                placeholder="姓名"
                leftIcon={{ name: 'person', color: '#03A9F4' }}
                onChangeText={(text) => this.setState({'name':text})}
              />
              <Input
                placeholder="單位"
                leftIcon={{ name: 'email', color: '#03A9F4'}}
                onChangeText={(text) => this.setState({'group':text})}
              />
              <Input
                placeholder="電話"
                leftIcon={{ name: 'phone', color: '#03A9F4' }}
                onChangeText={(text) => this.setState({'subtitle':text})}
              />

              <View style={{
                flexDirection: 'row', 
                justifyContent: 'space-between',
                marginTop: 20
              }}>
                <View style={{width : width*.3 }}>
                  <Button
                    onPress={()=>this._handleAddUser()}
                    icon={<Icon name="add" color={this.checkInput()?"#999":"#03A9F4"}/>}
                    buttonStyle={{
                      borderRadius: 3,
                    }}
                    raised
                    type="outline"
                    title="新增"
                    disabled={this.checkInput()}
                  />
                  </View>
                <View style={{width : width*.3 }}>
                  <Button
                    onPress={handleEvent}
                    icon={<Icon name="close" color="#03A9F4" />}
                    type="outline"
                    buttonStyle={{
                      borderRadius: 3,
                    }}
                    title="關閉"
                  />
                </View>
              </View>

            </Card>
          </View>
        </Modal>
      </View>
    );
  }
}

export default LoginContainer;
