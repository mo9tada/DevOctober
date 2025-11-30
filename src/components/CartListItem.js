// src/components/CartListItem.js
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartListItem = ({ item, onRemove }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.size}>Size: {item.size}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <Pressable onPress={onRemove} style={styles.removeButton}>
        <Ionicons name="trash-outline" size={20} color="gray" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  size: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  removeButton: {
    padding: 10,
  },
});

export default CartListItem;