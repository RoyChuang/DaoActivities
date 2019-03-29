

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Icon, Button } from 'react-native-elements';
import QRCode from 'react-native-qrcode';

class QrcodeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { isVisible, handleEvent, qrCodeData } = this.props;
    return (
      <View>
        <Modal
          isVisible={isVisible}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <QRCode
            value={`${qrCodeData.name}${qrCodeData.subtitle}${qrCodeData.group}`}
            bgColor="purple"
            size={200}
            fgColor="white"
          />
          <Text style={{ fontSize: 30, paddingTop: 10 }}>{qrCodeData.name}</Text>
          <Text style={{ fontSize: 20 }}>{qrCodeData.subtitle}</Text>
          <Text style={{ fontSize: 20 }}>{qrCodeData.group}</Text>
          <Button
            onPress={handleEvent}
            icon={<Icon name="close" color="#ffffff" />}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 3, marginTop: 20,
            }}
            title="CLOSE"
          />
        </Modal>
      </View>
    );
  }
}

export default QrcodeContainer;
