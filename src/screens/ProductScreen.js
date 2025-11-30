import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import products from '../data/products';

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
        numColumns={2} // ✅ fixed spelling
        keyExtractor={(item) => item.id.toString()} // ✅ safer key extractor
        showsVerticalScrollIndicator={false} // optional for cleaner UI
        contentContainerStyle={styles.listContent}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ full screen
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 8,
  },
  itemContainer: {
    width: '50%', // two columns
    padding: 8,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
});
