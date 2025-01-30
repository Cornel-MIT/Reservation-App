import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';

const Home = ({ navigation }) => {
  const handleSelector = (restaurant) => {
    navigation.navigate("CuisineDetails", { restaurant });
  };

  const cuisines = [
    {
      id: "1",
      image: require("../../assets/Food/galata-food.png"),
      food: "Buritto and Fries",
      restaurant: "Galata Bakery and Restaurant",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      Places: "Boksburg, Johannesburg",
      rating: 4.5,
    },
    {
      id: "2",
      image: require("../../assets/Food/gatsby.jpeg"),
      food: "Mega Sandwich",
      restaurant: "Gasby",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      Places: "Kempon Park, Johannesburg",
      Resimage: require("../../assets/Res/gatsbybynight.jpg"),
      rating: 4.0,
    },
  ];

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Les Restaurant Grands</Text>
        <Ionicons name="location" size={16} color="gray" />
      </View>
      <View style={styles.header2}>
        <Text style={styles.Greet}>Hello there</Text>
      </View>

      <View style={styles.title2Container}>
        <Text style={styles.title2}>Best recommended cuisines</Text>
        <TouchableOpacity onPress={ () =>navigation.navigate('Cuisinescreen')}>
          <Text style={styles.viewbtn}>VIEW MORE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Find a Dinner</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Restaurants")}
      >
        <Text style={styles.buttonText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelector(item)}
      style={styles.cardContainer}
    >
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.resName}>{item.food}</Text>
          <Text style={styles.resDesc}>{item.restaurant}</Text>
         
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="gray" />
            <Text style={styles.resPlace}>{item.Places}</Text>
            
          </View>
          <Rating
            imageSize={20}
            readonly
            startingValue={item.rating}
            style={styles.rating}
          />
          {/* <TouchableOpacity style={styles.reserveButton} onPress={() => handleSelector(item)}>
            <Text style={styles.reserveButtonText}>Reserve Now</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      data={[{ key: 'horizontalList' }]} // Dummy data to render the horizontal list
      renderItem={() => (
        <FlatList
          data={cuisines}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          horizontal={true} // Enable horizontal scrolling for the cards
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        />
      )}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3F0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#8A1538",
    padding: 15,
    alignItems: "center",
  },
  header2: {
    backgroundColor: "#fff",
    padding: 15,
    alignItems: "Left",
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  Greet: {
    fontSize: 18,
    fontWeight: "bold",
  },
  imageHero: {
    position: "relative",
    width: "100%",
    height: 250,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  title2Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  title2: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 10,
  },
  viewbtn: {
    fontSize: 12,
    // fontWeight: "bold",
    color: "#8A1538",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555555",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#8A1538",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  textContainer: {
    padding: 16,
  },
  resName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resDesc: {
    fontSize: 14,
    color: "gray",
    marginBottom: 8,
  },
  rating: {
    marginBottom: 8,
    alignItems: "flex-start",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  resPlace: {
    fontSize: 14,
    color: "gray",
    marginLeft: 4,
  },
  cardContainer: {
    marginBottom: 20,
    marginRight: 10, // Add margin to the right for spacing between cards
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    width: 300, // Set a fixed width for the cards
  },
  image: {
    width: '100%',
    height: 200,
  },
  reserveButton: {
    backgroundColor: '#8A1538',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;