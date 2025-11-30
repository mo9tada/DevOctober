// src/navigation.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShoppingCart from './screens/ShoppingCart';
import { useCart } from './contexts/CartContext';

const Stack = createNativeStackNavigator();

// Create a separate component for the header right button
const CartButton = ({ navigation, cartCount }) => (
  <Pressable 
    onPress={() => navigation.navigate('Cart')} 
    style={{ flexDirection: 'row', marginRight: 10 }}
  >
    <FontAwesome5 name="shopping-cart" size={18} color="gray" />
    {cartCount > 0 && (
      <Text style={{ marginLeft: 5, fontWeight: '500' }}>{cartCount}</Text>
    )}
  </Pressable>
);

// Main navigation component
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Products" 
          component={ProductsScreen} 
          options={({ navigation }) => ({
            headerRight: () => <ProductsHeaderRight navigation={navigation} />
          })}
        />
        <Stack.Screen 
          name="Product Detail" 
          component={ProductDetailsScreen} 
          options={{ presentation: 'fullScreenModal' }}
        />
        <Stack.Screen name="Cart" component={ShoppingCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Create a wrapper component that uses the cart context
const ProductsHeaderRight = ({ navigation }) => {
  const { cartCount } = useCart();
  return <CartButton navigation={navigation} cartCount={cartCount} />;
};

export default Navigation;