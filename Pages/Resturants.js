import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Restaurants = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('https://localhost:5000/api/restaurants');
      setRestaurants(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelector = (restaurant) => {
    navigation.navigate("details", { restaurant });
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={restaurants} 
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelector(item)} style={styles.cardContainer}>
            <View style={styles.card}>
              <Image source={{ uri: item.pictures[0] }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.resName}>{item.name}</Text>
                <Text style={styles.resDesc}>{item.description}</Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={16} color="gray" />
                  <Text style={styles.resPlace}>{item.place}</Text>
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
