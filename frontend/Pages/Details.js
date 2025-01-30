import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useRoute } from "@react-navigation/native";

// const { width } = Dimensions.get("window");

const Details = ({ navigation }) => {
  const route = useRoute();
  const { image, name, Descripton, Places } = route.params.restaurant;
  return (
    <ScrollView style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}> 
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{Descripton}</Text>
      <Text style={styles.places}>{Places}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("reserve")}>
        <Text style={styles.buttonText}>Reserve</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#FAF3F0',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
    info: {
        backgroundColor: '#fff',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        marginTop: -50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
    marginLeft: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 2,
    marginLeft: 16,
  },
  places: {
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  button: {
    backgroundColor: '#8A1538',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default Details;