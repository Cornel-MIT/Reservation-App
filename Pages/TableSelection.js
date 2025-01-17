import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from "react-native";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Tables = shuffleArray([
  { name: "Table for 2", image: require("../assets/Images/Tfo2.png") },
  { name: "Table for 4", image: require("../assets/Images/Tfo4.png") },
  { name: "Table for 6", image: require("../assets/Images/Tfo6.png") },
  { name: "Table for 8", image: require("../assets/Images/Tfo8.png") },
  { name: "Table for 2", image: require("../assets/Images/Tfo2.png") },
  { name: "Table for 4", image: require("../assets/Images/Tfo4.png") },
  { name: "Table for 6", image: require("../assets/Images/Tfo6.png") },
  { name: "Table for 8", image: require("../assets/Images/Tfo8.png") },
]);

export default function TableSelection({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Table</Text>
      {/* Floor Tabs */}
      <ScrollView horizontal style={styles.tabs}>
        {[
          { floor: "Ground Floor", page: "GroundFloor" },
          { floor: "1st Floor", page: "FirstFloor" },
          { floor: "2nd Floor", page: "SecondFloor" },
          { floor: "Rooftop", page: "Rooftop" },
        ].map(({ floor, page }) => (
          <TouchableOpacity
            key={floor}
            style={styles.tab}
            onPress={() => navigation.navigate(page)}
          >
            <Text style={styles.tabText}>{floor}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Display All Tables */}
      <View style={styles.grid}>
        <FlatList
          data={Tables}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.placeItem}>
              <Image source={item.image} style={styles.placeImage} />
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          )}
        />
      </View>

      {/* Reserve Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("InformationDetail")}
      >
        <Text style={styles.buttonText}>Reserve a Table</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  tabs: { flexDirection: "row", marginBottom: 16 },
  tab: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    borderRadius: 8,
  },
  tabText: { fontSize: 16 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  placeItem: { alignItems: "center", margin: 8, width: "45%" },
  placeImage: { width: 100, height: 100, borderRadius: 8 },
  itemText: { marginTop: 8, fontSize: 16 },
  button: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#000",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18 },
});
