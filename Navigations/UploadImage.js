import React from 'react'
import{Text,TouchableOpacity,View,Image} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

export default class UploadImage extends React.Component {
  constructor(){
    super()
    this.state={
      image:null
    }
  }
pickImageAsync=async()=>{
  console.log("the functon has called")
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
console.log("result")
    if (!result.cancelled) {
      console.log(result);
      this.setState({image:result.uri})
    } else {
      alert('You did not select any image.');
    }
  };
  componentDidMount(){
    this.pickImageAsync()
  }
render(){
  return( <Text> Done </Text>)
}
}
