import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from "react-native";

const images = [
  { image: require("../assets/Tables/for2-removebg-preview.png"), tablenum: "Table 1" },
  { image: require("../assets/Tables/for4-removebg-preview.png"), tablenum: "Table 2" },
  { image: require("../assets/Tables/for6-removebg-preview.png"), tablenum: "Table 3" },
  { image: require("../assets/Tables/for8-removebg-preview.png"), tablenum: "Table 4" },
];

const selectedImages = [
  { sImage: require("../assets/Tables/For2meroon-removebg-preview.png"), sTablenum: "Table 1" },
  { sImage: require("../assets/Tables/For4meroon-removebg-preview.png"), sTablenum: "Table 2" },
  { sImage: require("../assets/Tables/For6meroon-removebg-preview.png"), sTablenum: "Table 3" },
  { sImage: require("../assets/Tables/For8meroon-removebg-preview.png"), sTablenum: "Table 4" },
];

const TableSelection = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedText, setSelectedText] = useState(null);


  const floors = ["Ground Floor", "1st Floor", "2nd Floor", "Rooftop"];
  const [activeFloor, setActiveFloor] = useState(floors[0]);

  const tables = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    image: images[i % images.length].image,
    selectedImage: selectedImages[i % selectedImages.length].sImage,
    tablenum: `Table ${i + 1}`,
  }));

  const handleTablePress = (id) => {
    setSelectedTable(id);
  };

  const renderTable = ({ item }) => (
    <TouchableOpacity onPress={() => handleTablePress(item.id)} style={styles.tableContainer}>
      <Image
        source={selectedTable === item.id ? item.selectedImage : item.image}
        style={[
          styles.tableImage,
          selectedTable === item.id && styles.selectedTableImage,
        ]}
      />
      <Text style={styles.tableText ? styles.tableTextSelected : styles.tableText}>{item.tablenum}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Table</Text>
      <Text style={styles.tableCount}>Total Tables: {tables.length}</Text>
      <View style={styles.floorSelector}>
        {floors.map((floor) => (
          <TouchableOpacity
            key={floor}
            style={[
              styles.floorButton,
              activeFloor === floor && styles.activeFloorButton,
            ]}
            onPress={() => setActiveFloor(floor)}
          >
            <Text
              style={[
                styles.floorText,
                activeFloor === floor && styles.activeFloorText,
              ]}
            >
              {floor}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={tables}
        renderItem={renderTable}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        key={`flatlist-${2}`} // Add a unique key
      />
      <TouchableOpacity style={styles.reserveButton}>
        <Text style={styles.reserveButtonText}>Reserve a Table</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get("window");
const tableSize = width / 2 - 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3F0",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  tableCount: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  floorSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  floorButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#E0E0E0",
  },
  activeFloorButton: {
    backgroundColor: "#8A1538",
  },
  floorText: {
    fontSize: 14,
    color: "#000",
  },
  activeFloorText: {
    color: "#FFF",
  },
  tableContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    margin: -5,
  },
  tableImage: {
    width: tableSize,
    height: tableSize,
    margin: 4,
    resizeMode: "contain",
  },
  tableText: {
    position: "absolute",
    bottom: 0,
    fontSize: 16,
    fontWeight: "bold",
    color: "#030F00",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  
  selectedTableImage: {
    borderColor: "#8A1538",
    borderWidth: 3,
  },
  reserveButton: {
    marginTop: 16,
    backgroundColor: "#8A1538",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  reserveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TableSelection;