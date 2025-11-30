// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Navigation from './src/navigation';
import { CartProvider } from './src/contexts/CartContext';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <CartProvider>
          <Navigation />
          <StatusBar style="auto" />
        </CartProvider>
      </SafeAreaProvider>
    </Provider>
  );
}