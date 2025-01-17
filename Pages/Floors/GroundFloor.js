// GroundFloor.js
import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const GroundFloorTables = [
  { name: "Table for 2", image: require("../../assets/Images/Tfo2.png") },
 
];

export default function GroundFloor() {
  return (
    <View style={styles.container}>
      <FlatList
        data={GroundFloorTables}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.placeItem}>
            <Image source={item.image} style={styles.placeImage} />
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  placeItem: { alignItems: "center", margin: 8, width: "45%" },
  placeImage: { width: 100, height: 100, borderRadius: 8 },
  itemText: { marginTop: 8, fontSize: 16 },
});
