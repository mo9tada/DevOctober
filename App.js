import ProductScreen from './src/screens/ProductScreen';
import React from 'react';
import {View} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import ShoppingCart from './src/screens/ShoppingCart';

export default function App() {
 return (
 <View style={{flex:1}}>
 <ShoppingCart />
 <StatusBar style="auto"/>
 </View>
 );
};