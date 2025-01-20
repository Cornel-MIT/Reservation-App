import React from "react";
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const resturants = [
  {
    image: require("../assets/Res/robert-bye-4UGlx_OXqgs-unsplash.jpg"),
    name: "Unsplash Reasturant",
    Descripton: "Description 1",
    Places: "Places 1",
  },
  {
    image: require("../assets/Res/Screenshot_20250119_192154_Instagram.jpg"),
    name: "Galata Bakery and Restaurant",
    Descripton: "Description 2",
    Places: "Places 2",
  },
  {
    image: require("../assets/Res/Screenshot_20250119_192412_Facebook.jpg"),
    name: "House of Ribs",
    Descripton: "Description 3",
    Places: "Places 3",
  },
  {
    image: require("../assets/Res/gatsbybynight.jpg"),
    name: "Gatsby",
    Descripton: "The Gatsby Station offers gourmet food and coffee from South Africa's first 1965 Land Rover Forward Control Food Truck.",
    Places: "Places 4",
  },
  {
    image: require("../assets/Res/Screenshot_20250119_223404_Facebook.jpg"),
    name: "Mad Nomad",
    Descripton: "Description 5",
    Places: "Places 5",
  },
];

const Restaurants = ({ navigation }) => {
  const handleSelector = (restaurant) => {
    navigation.navigate("details", { restaurant });
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Restaurants</Text> */}
      <FlatList 
        data={resturants} 
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelector(item)} style={styles.cardContainer}>
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.resName}>{item.name}</Text>
                <Text style={styles.resDesc}>{item.Descripton}</Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={16} color="gray" />
                  <Text style={styles.resPlace}>{item.Places}</Text>
                </View>
                <TouchableOpacity style={styles.reserveButton} onPress={() => handleSelector(item)}>
                  <Text style={styles.reserveButtonText}>Reserve Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )} 
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAF3F0',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardContainer: {
    marginBottom: 20,
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
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 16,
  },
  resName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resDesc: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
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

export default Restaurants;