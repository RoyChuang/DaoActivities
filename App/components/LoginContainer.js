import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { View } from 'react-native';
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
    const { handleEvent } = this.props;
    await AsyncStorage.getItem('users',(error, result)=>{
      if(result){
        let user = {
          'name': name,
          'subtitle': subtitle,
          'group': group
        }
        let allUsers = JSON.parse(result);
        allUsers.push(user);
        console.log('JSON.parse(result)===',allUsers);
        this._storeUserData(allUsers);
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
      handleEvent();
    });
  }

  componentDidMount() {
    
  }

  render() {
    const { isVisible, handleEvent } = this.props;
    return (
      <View>
        <Modal isVisible={isVisible}>
          <View style={{ flex: 1 }}>
            <Card
              title="ADD PERSON"
            >
              <Input
                placeholder="姓名"
                leftIcon={{ name: 'person' }}
                onChangeText={(text) => this.setState({'name':text})}
              />
              <Input
                placeholder="單位"
                leftIcon={{ name: 'email' }}
                onChangeText={(text) => this.setState({'group':text})}
              />
              <Input
                placeholder="電話"
                leftIcon={{ name: 'phone' }}
                onChangeText={(text) => this.setState({'subtitle':text})}
              />

              <Button
                onPress={()=>this._handleAddUser()}
                icon={<Icon name="add" color="#ffffff" />}
                backgroundColor="#03A9F4"
                buttonStyle={{
                  borderRadius: 3, marginTop: 20,
                }}
                title="新增"
              />

              <Button
                onPress={handleEvent}
                icon={<Icon name="close" color="#ffffff" />}
                backgroundColor="#03A9F4"
                buttonStyle={{
                  borderRadius: 3, marginTop: 20,
                }}
                title="關閉"
              />

            </Card>
          </View>
        </Modal>
      </View>
    );
  }
}

export default LoginContainer;
