import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Rating } from 'react-native-ratings'; 
import { useNavigation } from '@react-navigation/native';

const CuisineScreen = () => {
    const navigation = useNavigation(); // Use navigation hook

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

    return (
        <View style={styles.container}>
            <FlatList 
                data={cuisines} 
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.resName}>{item.food}</Text>

                            <Rating
                                imageSize={20}
                                readonly
                                startingValue={item.rating}
                                style={styles.rating}
                            />

                            <View style={styles.locationContainer}>
                                <Ionicons name="location" size={16} color="gray" />
                                <Text style={styles.resPlace}>{item.Places}</Text>
                            </View>

                            <TouchableOpacity 
                                style={styles.reserveButton}
                                onPress={() => navigation.navigate('CuisineDetails', { restaurant: item })}
                            >
                                <Text style={styles.reserveButtonText}>Reserve Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    marginBottom: 20,
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
  rating: {
    marginBottom: 8,
    alignItems: "flex-start",
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

export default CuisineScreen;
