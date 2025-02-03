import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const Search = () => {
 const [restaurants, setRestaurants] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // Add search logic here(Dont mess this up!! though i know you wont)
    console.log("Searching for:", query);
  };
  const handleClear = () => {
    //clear here man(maybe but just do it!!!!)
  }

  useEffect(() => {
      fetchRestaurants();
    }, []);
  
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://192.168.8.194:5000/api/restaurants');
      setRestaurants(response.data);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <View style={styles.container}>
      <Pressable style={styles.SearchClearContainter} >
        <Text style={styles.SearchButtonText} onPress={() => handleSearch()}>Search</Text>
        <Text style={styles.ClearButtonText} onPress={() => handleClear()}>Clear</Text>
      </Pressable>
      <View style={styles.searchSection}>
        <Ionicons
          style={styles.searchIcon}
          name="search"
          size={16}
          color="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <View style={styles.container}>
      <FlatList 
        data={restaurants} 
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
                <TouchableOpacity style={styles.reserveButton} onPress={() => handleSelector(item)}>
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
    flexDirection:"row",
    gap:210,
    marginTop: 3,
    marginBottom: 10,
  },
  SearchButtonText:{
    fontSize: 20,
    color:"#a10606",
    fontWeight:"bold",
  },
  ClearButtonText:{
    fontSize: 20,
    color:"#a10606",
    fontWeight:"bold"
  },
  rescontainer: {
    flexDirection: 'row', 
    
    backgroundColor: '#fbfbfb',
    // borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
});

export default Search;
