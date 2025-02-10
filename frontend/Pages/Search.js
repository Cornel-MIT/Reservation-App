import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const [restaurants, setRestaurants] = useState([]); 
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); 
  const [query, setQuery] = useState(""); 
  const navigation = useNavigation();

  // Fetch all restaurants on component mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Fetch restaurants from the API
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://192.168.1.25:5000/api/restaurants");
      setRestaurants(response.data);
      setFilteredRestaurants(response.data); 
    } catch (err) {
      console.error(err);
    }
  };

  // Handle search input change
  const handleSearch = (text) => {
    setQuery(text); // Update the query state
    if (text) {
      // Filter restaurants based on the query
      const filtered = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(text.toLowerCase()) ||
          restaurant.location.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRestaurants(filtered); 
    } else {
      // If the query is empty, show all restaurants
      setFilteredRestaurants(restaurants);
    }
  };

  // Clear the search input and reset the filtered list
  const handleClear = () => {
    setQuery("");
    setFilteredRestaurants(restaurants); 
  };

  // Navigate to the Details page with the selected restaurant
  const handleSelector = (item) => {
    navigation.navigate("Details", { restaurant: item });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.SearchClearContainter}>
        <Text style={styles.SearchButtonText} onPress={handleSearch}>
          Search
        </Text>
        <Text style={styles.ClearButtonText} onPress={handleClear}>
          Clear
        </Text>
      </Pressable>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="search" size={16} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Search by name or location..."
          value={query}
          onChangeText={handleSearch} 
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={filteredRestaurants} 
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelector(item)} style={styles.rescontainer}>
              <View style={styles.card}>
                {/* Restaurant Photo */}
                {item.photos && item.photos.length > 0 && (
                  <Image source={{ uri: item.photos[0] }} style={styles.image} />
                )}

                <View style={styles.textContainer}>
                  {/* Restaurant Name */}
                  <Text style={styles.resName}>{item.name}</Text>

                  {/* Location */}
                  <View style={styles.locationContainer}>
                    <Ionicons name="location" size={16} color="gray" />
                    <Text style={styles.resPlace}>{item.location}</Text>
                  </View>

                  {/* Contact Details */}
                  <Text style={styles.resDesc}>Contact: {item.contactDetails}</Text>

                  {/* Operating Hours */}
                  {item.operatingHours && (
                    <Text style={styles.resDesc}>Hours: {item.operatingHours}</Text>
                  )}

                  {/* Reserve Button */}
                  <TouchableOpacity
                    style={styles.reserveButton}
                    onPress={() => handleSelector(item)}
                  >
                    <Text style={styles.reserveButtonText}>Reserve Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#FAF3F0",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  SearchClearContainter: {
    flexDirection: "row",
    gap: 210,
    marginTop: 3,
    marginBottom: 10,
  },
  SearchButtonText: {
    fontSize: 20,
    color: "#a10606",
    fontWeight: "bold",
  },
  ClearButtonText: {
    fontSize: 20,
    color: "#a10606",
    fontWeight: "bold",
  },
  rescontainer: {
    flexDirection: "row",
    backgroundColor: "#fbfbfb",
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  resName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resPlace: {
    fontSize: 14,
    color: "gray",
  },
  resDesc: {
    fontSize: 14,
    color: "gray",
  },
  reserveButton: {
    backgroundColor: "#8A1538",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  reserveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Search;