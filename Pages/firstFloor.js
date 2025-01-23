import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Image } from 'react-native';

const images = [
  require('../assets/Tables/for2-removebg-preview.png'),
  require('../assets/Tables/for4-removebg-preview.png'),
  require('../assets/Tables/for6-removebg-preview.png'),
  require('../assets/Tables/for8-removebg-preview.png'),
];

const selectedImages = [
  require('../assets/Tables/For2meroon-removebg-preview.png'),
  require('../assets/Tables/For4meroon-removebg-preview.png'),
  require('../assets/Tables/For6meroon-removebg-preview.png'),
  require('../assets/Tables/For8meroon-removebg-preview.png'),
];

const firstFloor = () => {
  const [selectedTable, setSelectedTable] = useState(null);

  const floors = ['Ground Floor', '1st Floor', '2nd Floor', 'Rooftop'];
  const [activeFloor, setActiveFloor] = useState(floors[0]);

  const tables = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    image: images[i % images.length], // Cycle through images
    selectedImage: selectedImages[i % selectedImages.length], // Cycle through selected images
  }));

  const handleTablePress = (id) => {
    setSelectedTable(id);
  };

  const renderTable = ({ item }) => (
    <TouchableOpacity onPress={() => handleTablePress(item.id)}>
      <Image
        source={selectedTable === item.id ? item.selectedImage : item.image}
        style={[
          styles.tableImage,
          selectedTable === item.id && styles.selectedTableImage,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Table</Text>
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

const { width } = Dimensions.get('window');
const tableSize = width / 2 - 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3F0',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  floorSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  floorButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
  },
  activeFloorButton: {
    backgroundColor: '#8A1538',
  },
  floorText: {
    fontSize: 14,
    color: '#000',
  },
  activeFloorText: {
    color: '#FFF',
  },
  tableImage: {
    width: tableSize,
    height: tableSize,
    margin: 4,
    resizeMode: 'contain',
  },
  selectedTableImage: {
    borderColor: '#8A1538',
    borderWidth: 3,
  },
  reserveButton: {
    marginTop: 16,
    backgroundColor: '#8A1538',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  reserveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default firstFloor;