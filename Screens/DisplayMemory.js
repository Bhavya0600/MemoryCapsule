import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView
} from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native-gesture-handler';

const appIcon = require('../assets/Icon.png');

export default class DisplayMemory extends React.Component {
  constructor() {
    super();
    this.state = {
      memories: {},
      image: '',
      dateOfMemory: '',
      location: '',
      description: '',
    };
  }

  componentDidMount() {
    this.fetchMemories();
  }

  fetchMemories = async () => {
    firebase
      .database()
      .ref('/posts/')
      .on(
        'value',
        (snapshot) => {
          let memories = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              memories.push({ key: key, value: snapshot.val()[key] });
            });
          }
          this.setState({ memories: memories });
          // console.log(this.state.memories);
          // // this.setState({ image: this.state.memories[0].value.image });
          // // console.log(this.state.memories[0].value.image);
          // this.setState({
          //   dateOfMemory: this.state.memories[0].value.dateOfMemory,
          // });
          // console.log(this.state.dateOfMemory);
          // this.setState({
          //   location: this.state.memories[0].value.location,
          // });
          // console.log(this.state.location);
          // this.setState({
          //   description: this.state.memories[0].value.description,
          // });
          // console.log(this.state.description);
        },
        function (errorObject) {
          console.log('The read failed: ' + errorObject.code);
        }
      );
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item: memory }) => {
    return (
      <View>
        <Text style={styles.text}>Memory Date Is :</Text>
        <Text style={styles.displayText}> {memory.value.dateOfMemory}</Text>

        <Text style={styles.text}>Memory Location Is : </Text>
        <Text style={styles.displayText}>{memory.value.location}</Text>

        <Text style={styles.text}>Memory Description Is :</Text>
        <Text style={styles.displayText}>{memory.value.description}</Text>
        <Image source={memory.value.image} style={styles.imageStyle} />
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />

        <View style={styles.upperContainer}>
          <Image source={appIcon} style={styles.appIcon} />
          <Text style={styles.appTitle}> Memory Page </Text>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            data={this.state.memories}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
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
  appTitle: {
    fontSize: 26,
    color: '#00203FFF',
    fontFamily: 'Rajdhani_600SemiBold',
    fontWeight: 'bold',
  },

  appIcon: {
    width: '40%',
    height:"100%",
    },
  lowerContainer: {
    marginTop:10,
    flex: 2,
  },
  text: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Rajdhani_600SemiBold',
  },
  displayText: {
    fontSize: 24,
    color: 'red',
    fontFamily: 'Rajdhani_600SemiBold',
  },
  imageStyle: {
    height: 100,
    width: 100,
    marginLeft: 30,
  },
});
