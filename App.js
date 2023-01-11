import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Screens/Login';
import Tabnavigation from './Navigations/TabNavigation';


import firebase from 'firebase';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
  Login: Login,
  Tabnavigation: Tabnavigation,
 
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return <AppNavigator />;
}
