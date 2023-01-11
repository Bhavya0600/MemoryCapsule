import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateMemory from "../Screens/CreateMemory";
import DisplayMemory from "../Screens/DisplayMemory"


const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'CreateMemory') {
                        iconName = focused
                            ? 'book'
                            : 'book-outline';
                    } else if (route.name === 'DisplayMemory') {
                        iconName = focused ? 'create' : 'create-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="CreateMemory" component={CreateMemory} options={{headerShown:false}}/>
            <Tab.Screen name="DisplayMemory" component={DisplayMemory} options={{headerShown:false}}/>
        </Tab.Navigator>
        </NavigationContainer>
    );
  }
}

