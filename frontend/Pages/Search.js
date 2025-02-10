import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
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
      const response = await axios.get("http://192.168.8.194:5000/api/restaurants");
      setRestaurants(response.data);
      setFilteredRestaurants(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle search input change
  const handleSearch = (text) => {
    setQuery(text);
    if (text) {
      const filtered = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(text.toLowerCase()) ||
          restaurant.location.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    } else {
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
      {/* Search & Clear Buttons */}
      <View style={styles.SearchClearContainer}>
        <TouchableOpacity onPress={() => handleSearch(query)}>
          <Text style={styles.SearchButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClear}>
          <Text style={styles.ClearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="search" size={16} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Search by name or location..."
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      {/* Restaurant List */}
      <FlatList
        data={filteredRestaurants}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelector(item)} style={styles.resContainer}>
            
             
            <Image
                source={{ uri: item.photos?.[0] || "https://via.placeholder.com/100" }}
                style={styles.image}
              />

              <View style={styles.textContainer}>
              
                <Text style={styles.resName}>{item.name}</Text>

                
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={16} color="gray" />
                  <Text style={styles.resPlace}>{item.location}</Text>
                </View>

                
                <Text style={styles.resDesc}>Contact: {item.contactDetails}</Text>

                
                {item.operatingHours && <Text style={styles.resDesc}>Hours: {item.operatingHours}</Text>}

  

              </View>
            
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id || item.name}
      />
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
  SearchClearContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  resContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    borderRadius: 10,
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
