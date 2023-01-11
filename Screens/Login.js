import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  ToastAndroid,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

const appIcon = require('../assets/Icon.png');

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  handleLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('Tabnavigation');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  render() {
    var { email, password } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />

        <View style={styles.upperContainer}>
          <Text style={styles.appTitle}> Memory Capsule</Text>
          <Text style={styles.appSubTitle}>
            {' '}
            Let's create Memories.........
          </Text>
          <Image source={appIcon} style={styles.appIcon} />
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.textinputContainer}>
            <TextInput
              style={styles.textinput}
              placeholder={'Enter Email'}
              placeholderTextColor={'#FFFFFF'}
              value={email}
              onChangeText={(text) => this.setState({ email: text })}
            />
          </View>
          <View style={[styles.textinputContainer, { marginTop: 25 }]}>
            <TextInput
              style={styles.textinput}
              placeholder={'Enter The Password'}
              placeholderTextColor={'#FFFFFF'}
              value={password}
              onChangeText={(text) => this.setState({ password: text })}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={[styles.button, { marginTop: 25 }]}
            onPress={() => this.handleLogin(email, password)}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8eff9d',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    color: '#00203FFF',
    fontFamily: 'Rajdhani_600SemiBold',
  },
  appSubTitle: {
    fontSize: 17,
    color: '#00203FFF',
    fontFamily: 'Rajdhani_600SemiBold',
  },
  appIcon: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#ADEFD1FF',
    borderColor: '#FFFFFF',
  },
  textinput: {
    width: '70%',
    height: 50,
    padding: 10,
    borderColor: '#00203FFF',
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: '#00203FFF',
    fontFamily: 'Rajdhani_600SemiBold',
    color: '#FFFFFF',
  },
  button: {
    width: '43%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00203FFF',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Rajdhani_600SemiBold',
  },
});
