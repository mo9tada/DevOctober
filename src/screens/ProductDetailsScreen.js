import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  FlatList, 
  ScrollView, 
  Pressable, 
  Text, 
  useWindowDimensions,
  ActivityIndicator 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';
import { useSelector } from 'react-redux';

const ProductDetailsScreen = ({ navigation }) => {
  const route = useRoute();
  
  // Set header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable 
          onPress={() => navigation.goBack()}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            marginLeft: 10
          })}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const { width } = useWindowDimensions();
  const [selectedSize, setSelectedSize] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  const productId = route.params?.id;
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    if (!products || !Array.isArray(products)) {
      console.error('Products data is not loaded correctly');
      setLoading(false);
      return;
    }

    // Ensure we're comparing strings by converting productId to string
    const foundProduct = products.find(p => p.id === String(productId));
    setProduct(foundProduct);
    setLoading(false);
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({ ...product, size: selectedSize });
    navigation.navigate('Cart');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={product.images || [product.image]}
          renderItem={({ item }) => (
            <Image 
              source={{ uri: item }} 
              style={{ width, aspectRatio: 1 }} 
              resizeMode="cover"
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.price?.toFixed(2)}</Text>
          
          <View style={styles.sizesContainer}>
            <Text style={styles.sizeTitle}>Select Size</Text>
            <View style={styles.sizes}>
              {(product.sizes || []).map((size) => (
                <Pressable 
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.size, 
                    selectedSize === size && styles.selectedSize
                  ]}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText
                  ]}>
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>
            {product.description || 'No description available.'}
          </Text>
        </View>
      </ScrollView>

      <Pressable onPress={handleAddToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
        <Ionicons name="cart" size={20} color="white" style={styles.cartIcon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
    color: '#666',
    marginBottom: 20,
  },
  sizesContainer: {
    marginVertical: 20,
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  sizes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  size: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    margin: 5,
  },
  selectedSize: {
    backgroundColor: 'black',
  },
  sizeText: {
    fontSize: 16,
  },
  selectedSizeText: {
    color: 'white',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 30,
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 10,
  },
  cartIcon: {
    marginLeft: 5,
  },
});

export default ProductDetailsScreen;