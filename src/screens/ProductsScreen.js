import { StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProduct } from '../store/productsSlice';

const ProductsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  return (
    <FlatList data={products} renderItem={({item})=>
    (<Pressable 
      onPress={() => {
        dispatch(setSelectedProduct(item.id));
        navigation.navigate('Product Detail')}} style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </Pressable>)
  }
      numColumns={2}
      key={2}
      keyExtractor={(item) => item.id}
    />
  )
}
  

const styles = StyleSheet.create({
  itemContainer: {
    width: '50%',
    padding: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default ProductsScreen;
