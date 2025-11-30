// src/screens/ShoppingCart.js
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../contexts/CartContext';
import CartListItem from '../components/CartListItem';

const ShoppingCart = () => {
  const { cart, removeFromCart } = useCart();

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <CartListItem 
            item={item} 
            onRemove={() => removeFromCart(item.id)} 
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListFooterComponent={() => (
          <View style={styles.totalsContainer}>
            <View style={styles.row}>
              <Text style={styles.text}>Subtotal</Text>
              <Text style={styles.text}>${getTotal()}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Delivery</Text>
              <Text style={styles.text}>$10.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.textBold}>Total</Text>
              <Text style={styles.textBold}>${(parseFloat(getTotal()) + 10).toFixed(2)}</Text>
            </View>
          </View>
        )}
      />
      <Pressable style={styles.button} onPress={() => console.warn('Checkout')}>
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ShoppingCart;