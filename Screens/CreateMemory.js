import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import Calendar from 'react-calendar';
import moment from 'moment';

const appIcon = require('../assets/Icon.png');

export default class CreateMemory extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      dateOfMemory: '',
      location: '',
      description: '',
    };
  }
  pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      console.log(this.state.image);
    } else {
      alert('You did not select any image.');
    }
  };

  fetchDate(value) {
    var fetchDate = value;
    var date = moment(fetchDate).format('DD/MM/YYYY');
    console.log(date);
    this.setState({ dateOfMemory: date });
  }

  saveData = async () => {
    if (
      this.state.image &&
      this.state.dateOfMemory &&
      this.state.location &&
      this.state.description
    ) {
      let memoryData = {
        image: this.state.image,
        dateOfMemory: this.state.dateOfMemory,
        location: this.state.location,
        description: this.state.description,
      };
      await firebase
        .database()
        .ref('/posts/' + Math.random().toString(36).slice(2))
        .set(memoryData);
      this.setState({ image: '' });
      this.setState({ dateOfMemory: '' });
      this.setState({ location: '' });
      this.setState({ description: '' });

      Alert.alert('Data is Saved');
    } else {
      Alert.alert('Fill All The Fields');
    }
  };

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <View style={styles.upperContainer}>
            <Image source={appIcon} style={styles.appIcon} />
            <Text style={styles.appTitle}> Create Your Memory</Text>
          </View>

          <View style={styles.lowerContainer}>
            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={this.pickImageAsync}>
              <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: this.state.image }}
              style={{ width: 20, height: 20, marginTop: 25 }}
            />{' '}
            <View></View>
            <View style={[styles.textinputContainer, { marginTop: 25 }]}>
              <Calendar
                style={{ width: 100, height: 100 }}
                onChange={(text) => {
                  console.log(text);
                  this.fetchDate(text);
                }}
                // this.setState({ dateOfMemory: text })}}
              />
            </View>
            <View style={[styles.textinputContainer, { marginTop: 25 }]}>
              <Text style={styles.textinput}>{this.state.dateOfMemory}</Text>
            </View>
            <View style={[styles.textinputContainer, { marginTop: 25 }]}>
              <TextInput
                style={styles.textinput}
                placeholder={'Location '}
                placeholderTextColor={'#FFFFFF'}
                onChangeText={(text) => this.setState({ location: text })}
                value={this.state.location}
              />
            </View>
            <View style={[styles.textinputContainer, { marginTop: 25 }]}>
              <TextInput
                style={styles.textinput}
                placeholder={'Description'}
                placeholderTextColor={'#FFFFFF'}
                onChangeText={(text) => this.setState({ description: text })}
                value={this.state.description}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, { marginTop: 25 }]}
              onPress={() => this.saveData()}>
              <Text style={styles.buttonText}>Save Memory</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
    flex: 0.3,
    flexDirection: 'row',
  },
  lowerContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  appTitle: {
    fontSize: 22,
    color: '#00203FFF',
    fontFamily: 'Rajdhani_600SemiBold',
    fontWeight: 'bold',
  },
  appIcon: {
    width: '40%',
    height: '100%',
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#ADEFD1FF',
    borderColor: '#FFFFFF',
  },
  textinput: {
    width: '80%',
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
