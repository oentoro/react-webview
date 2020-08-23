import React, { useState, Component } from 'react';
import { Text, Button, View, Image, SafeAreaView, TextInput, ScrollView, FlatList, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob'

const Cat = (props) => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <SafeAreaView>
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? "hungry" : "full"}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? "Pour me some milk, please!" : "Thank you!"}
      />
    </View>
    </SafeAreaView>
  );
}

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
}


const CatApp = () => {
  return (
    <View>
      <Image
        source={{uri: "https://reactnative.dev/docs/assets/p_cat1.png"}}
        style={{width: 200, height: 200}}
      />
      <Text>Hello, I am your cat!</Text>
    </View>
  );
}

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  return (
    <SafeAreaView>
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
    </View>
    </SafeAreaView>
  );
}

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

const Scroller = () => {
  return(
  <SafeAreaView>
    <ScrollView>
      <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{ fontSize: 96 }}>If you like</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{ fontSize: 96 }}>Scrolling down</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{ fontSize: 96 }}>What's the best</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{ fontSize: 96 }}>Framework around?</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{ fontSize: 80 }}>React Native</Text>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

class MyWeb extends Component {
  webview = null;
  render() {
    return (
        <WebView
          source={{ uri: 'https://demos.finpay.id/personal/bayar/widget/finpay_success?invoice=WGT0100044803&amount=15000' }}
          onShouldStartLoadWithRequest={this.handleOnLoadUrl}
          // onShouldStartLoadWithRequest={request => {
          //   // Only allow navigating within this website
          //   console.log(request);
          //   // return request.url.startsWith('https://');
          // }}
          style={{ marginTop: 50 }}
        />
    );
  }

  handleOnLoadUrl = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
  
    var url = newNavState.url;

    if(url.includes('data:image/png;base64')){
      // this.webview.stopLoading();
      // console.log(url.replace('https://data:image/png;base64,',''));

      var Base64Code = url.replace('https://data:image/png;base64,','');
      const dirs = RNFetchBlob.fs.dirs;
      console.log(dirs);

      var path = dirs.DocumentDir + "/image.jpeg";

      RNFetchBlob.fs
        .writeFile(path, Base64Code, 'base64')
        .then((res) => {alert('Download file success!')});
      return false;
    }

    return true;
  
    // // handle certain doctypes
    // if (url.includes('.pdf')) {
    //   this.webview.stopLoading();
    //   // open a modal with the PDF viewer
    // }
  
    // // one way to handle a successful form submit is via query strings
    // if (url.includes('?message=success')) {
    //   this.webview.stopLoading();
    //   // maybe close this view?
    // }
  
    // // one way to handle errors is via query string
    // if (url.includes('?errors=true')) {
    //   this.webview.stopLoading();
    // }
  
    // // redirect somewhere else
    // if (url.includes('google.com')) {
    //   const newURL = 'https://reactnative.dev/';
    //   const redirectTo = 'window.location = "' + newURL + '"';
    //   this.webview.injectJavaScript(redirectTo);
    // }
  };
}



export default MyWeb;