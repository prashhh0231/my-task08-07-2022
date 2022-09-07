/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserList from './src/screen/UserList';

const Stack = createNativeStackNavigator();

const App = () => {
  return <UserList />;
};

const styles = StyleSheet.create({});

export default App;
