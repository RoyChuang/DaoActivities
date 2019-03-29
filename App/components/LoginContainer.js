import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { View } from 'react-native';
import {
  Card, Icon, Input, Button,
} from 'react-native-elements';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { };
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
                placeholder="USER NAME"
                leftIcon={{ name: 'person' }}
              />
              <Input
                placeholder="EMAIL"
                leftIcon={{ name: 'email' }}
              />
              <Input
                placeholder="ADDRESS"
                leftIcon={{ name: 'home' }}
              />
              <Input
                placeholder="PHONE"
                leftIcon={{ name: 'phone' }}
              />

              <Button
                onPress={handleEvent}
                icon={<Icon name="close" color="#ffffff" />}
                backgroundColor="#03A9F4"
                buttonStyle={{
                  borderRadius: 3, marginTop: 20,
                }}
                title="CLOSE"
              />

            </Card>
          </View>
        </Modal>
      </View>
    );
  }
}

export default LoginContainer;
