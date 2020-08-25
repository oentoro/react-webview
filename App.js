import React, {Component} from 'react';
import {Platform, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
class MyWeb extends Component {
  webview = null;
  render() {
    return (
      <WebView
        source={{
          uri:
            'https://demos.finpay.id/personal/bayar/widget/finpay_success?invoice=WGT0100044803&amount=15000',
        }}
        style={{marginTop: 50}}
        onShouldStartLoadWithRequest={(navState) => {
          var url = navState.url;
          if (url.includes('.jpeg')) {
            if (Platform.OS === 'android') {
              console.log('masuk android');
              RNFetchBlob.config({
                fileCache: true,
                appendExt: 'jpg',
              })
                .fetch('GET', downloadUrl)
                .then((res) => {
                  CameraRoll.save(res.path())
                    .then(alert('Success', 'Photo added to camera roll!'))
                    .catch((err) => console.log('err:', err));
                });
            } else {
              CameraRoll.save(url).then(
                Alert.alert('Struk', 'Sukses menyimpan struk di galeri'),
              );
            }
            return false;
          }
          return true;
        }}
      />
    );
  }
}

export default MyWeb;
