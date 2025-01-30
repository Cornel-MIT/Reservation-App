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
  { image: require("../assets/Tables/For6-removebg-preview.png"), tablenum: "Table 3" },
  { image: require("../assets/Tables/For8-removebg-preview.png"), tablenum: "Table 4" },
];

const selectedImages = [
  { sImage: require("../assets/Tables/For2meroon-removebg-preview.png"), sTablenum: "Table 1" },
  { sImage: require("../assets/Tables/For4meroon-removebg-preview.png"), sTablenum: "Table 2" },
  { sImage: require("../assets/Tables/For6meroon-removebg-preview.png"), sTablenum: "Table 3" },
  { sImage: require("../assets/Tables/For8meroon-removebg-preview.png"), sTablenum: "Table 4" },
];

const GroundFloor = () => {
  const [selectedTable, setSelectedTable] = useState(null);

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
      <Text style={selectedTable === item.id ? styles.tableTextSelected : styles.tableText}>{item.tablenum}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ground Floor</Text>
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
  tableContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    margin: -1,
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
    paddingHorizontal: 0,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tableTextSelected: {
    position: "absolute",
    bottom: 0,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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

export default GroundFloor;