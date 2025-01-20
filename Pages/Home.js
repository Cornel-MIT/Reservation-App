import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const cuisines = [
  {
    image: require("../assets/Food/galata-food.png"),
    food: "Buritto and Fries",
    restaurant: "Galata Bakery and Restaurant",
    Places: "Boksburg, Johannesburg",
  },
  {
    image: require("../assets/Food/gatsby.jpeg"),
    food: "Mega Sandwich",
    restaurant: "Gasby",
    Places: "Kempon Park, Johannesburg",
  },
];

const Home = () => {
  const navigation = useNavigation();

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Les Reasturant Grands</Text>
      </View>

      {/* Hero Image */}
      <View style={styles.imageHero}>
        <Image style={styles.heroImage} source={require('../assets/Images/siyuan-g_V2rt6iG7A-unsplash.jpg')} />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Les Reasturant Grands</Text>
        </View>
      </View>

      <Text style={styles.title}>OneTable builds community</Text>
      <Text style={styles.description}>
        Through peer-led Shabbat dinners and our signature digital platform, we make community
        accessible, inclusive, and meaningful for all.
      </Text>

      <Text style={styles.title2}>Our best cuisines</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Find a Dinner</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("res")}>
        <Text style={styles.buttonText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      data={cuisines}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.cardContainer}>
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.overlay}>
              <View style={styles.textContainer}>
                <Text style={styles.overlayText}>{item.food}</Text>
                <Text style={styles.resDesc}>{item.restaurant}</Text>
                <View style={styles.locationContainer}>
                  <Text style={styles.resPlace}>{item.Places}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3F0',
  },
  header: {
    backgroundColor: '#8A1538',
    padding: 15,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageHero: {
    position: 'relative',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    opacity: 3,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'left',
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better text visibility
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10,
    marginLeft: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555555',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#8A1538',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  textContainer: {
    top: "150",
    padding: 0,
    alignItems: 'Left',
  },
  resName: {
    fontSize: 20,
    fontWeight: 'bolder',
    marginBottom: 8,
  },
  resDesc: {
    color: '#bdbdbd',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'left',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resPlace: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 4,
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    position: 'relative',
  },
});

export default Home;