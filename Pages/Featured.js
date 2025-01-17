import React from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";

const FeaturedImages = [
  {
    image: "",
    title: "Featured Image 1",
    description: "This is the first featured image",
  },
  {
    image: "",
    title: "Featured Image 2",
    description: "This is the second featured image",
  },
  {
    image: "",
    title: "Featured Image 3",
    description: "This is the third featured image",
  },
  {
    image: "",
    title: "Featured Image 4",
    description: "This is the fourth featured image",
  },
];

const Featured = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured</Text>
      <View style={styles.SearchContainer}></View>
      <FlatList
        data={FeaturedImages}
        horizontal
        renderItem={({ item }) => {
          return (
            <View style={styles.FeaturedContainer}>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  FeaturedContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  SearchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 4,
    backgroundColor: "#fff",
    height: 50,
    width: 350,
    borderRadius: 10,
  },
});

export default Featured;
