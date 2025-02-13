import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";

const RestaurantCreationPage = () => {
  const [name, setName] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [location, setLocation] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [ambianceDescription, setAmbianceDescription] = useState("");
  const [featuredMenuItems, setFeaturedMenuItems] = useState("");
  const [photos, setPhotos] = useState([]);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const handleDeletePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async () => {
    const restaurantData = {
      name,
      cuisineType,
      location,
      contactDetails,
      operatingHours,
      ambianceDescription,
      featuredMenuItems,
      photos: photos || [],
      operatingSchedule: {
        days: selectedDays,
        openTime,
        closeTime,
      },
    };

    console.log("Restaurant Data:", restaurantData);

    try {
      const response = await fetch(
        "http://192.168.30.79:5000/api/restaurants/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(restaurantData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Restaurant created successfully!");
        console.log(data);
      } else {
        alert("Error creating restaurant");
        console.error(data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  const handleDayChange = (day) => {
    setSelectedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const timeOptions = [
    { label: "12:00 AM", value: "00:00" },
    { label: "1:00 AM", value: "01:00" },
    { label: "2:00 AM", value: "02:00" },
    { label: "3:00 AM", value: "03:00" },
    { label: "4:00 AM", value: "04:00" },
    { label: "5:00 AM", value: "05:00" },
    { label: "6:00 AM", value: "06:00" },
    { label: "7:00 AM", value: "07:00" },
    { label: "8:00 AM", value: "08:00" },
    { label: "9:00 AM", value: "09:00" },
    { label: "10:00 AM", value: "10:00" },
    { label: "11:00 AM", value: "11:00" },
    { label: "12:00 PM", value: "12:00" },
    { label: "1:00 PM", value: "13:00" },
    { label: "2:00 PM", value: "14:00" },
    { label: "3:00 PM", value: "15:00" },
    { label: "4:00 PM", value: "16:00" },
    { label: "5:00 PM", value: "17:00" },
    { label: "6:00 PM", value: "18:00" },
    { label: "7:00 PM", value: "19:00" },
    { label: "8:00 PM", value: "20:00" },
    { label: "9:00 PM", value: "21:00" },
    { label: "10:00 PM", value: "22:00" },
    { label: "11:00 PM", value: "23:00" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create a New Restaurant</Text>

      {/* Basic Information */}
      <Text style={styles.sectionHeader}>Basic Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Details"
        value={contactDetails}
        onChangeText={setContactDetails}
      />

      {/* Cuisine Details */}
      <Text style={styles.sectionHeader}>Cuisine Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Cuisine Type"
        value={cuisineType}
        onChangeText={setCuisineType}
      />
      <TextInput
        style={styles.input}
        placeholder="Featured Menu Items"
        value={featuredMenuItems}
        onChangeText={setFeaturedMenuItems}
        multiline
      />

      {/* Ambiance Description */}
      <Text style={styles.sectionHeader}>Ambiance Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Describe the ambiance"
        value={ambianceDescription}
        onChangeText={setAmbianceDescription}
        multiline
      />

      {/* Operational Details */}
      <Text style={styles.sectionHeader}>Operational Details</Text>

      {/* Open Time Dropdown */}
      <Text style={styles.inputLabel}>Open Time</Text>
      <RNPickerSelect
        onValueChange={setOpenTime}
        items={timeOptions}
        value={openTime}
        style={pickerSelectStyles}
        placeholder={{ label: "Select Open Time", value: null }}
      />

      {/* Close Time Dropdown */}
      <Text style={styles.inputLabel}>Close Time</Text>
      <RNPickerSelect
        onValueChange={setCloseTime}
        items={timeOptions}
        value={closeTime}
        style={pickerSelectStyles}
        placeholder={{ label: "Select Close Time", value: null }}
      />

      {/* Days of the Week */}
      <Text style={styles.sectionHeader}>Select Days of the Week</Text>

      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) => (
        <View key={day} style={styles.dayCheckboxContainer}>
          <Text style={styles.dayPick}>
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </Text>
          <Switch
            value={selectedDays[day]}
            onValueChange={() => handleDayChange(day)}
          />
        </View>
      ))}

      {/* Visual Elements */}
      <View style={styles.sectionVisual}>
  <Text style={styles.sectionHeader}>Visual Elements</Text>

  {/* Add Photo Button */}
  <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
    <Text style={styles.addPhotoButtonText}>Add Photo</Text>
  </TouchableOpacity>

  {/* Photos Display */}
  <View style={styles.photosContainer}>
    {photos.map((photo, index) => (
      <View key={index} style={styles.photoWrapper}>
        <Image source={{ uri: photo }} style={styles.photo} />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeletePhoto(index)}
        >
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    ))}
  </View>
        <TouchableOpacity title="Create Restaurant" onPress={handleSubmit} style={styles.create} >
        <Text style={styles.addPhotoButtonText}>Create Restaurant</Text>
        </TouchableOpacity>
      </View>

      
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAF3F0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  sectionVisual:{
    marginBottom: 10,
    padding: 10,	

  },
  addPhotoButton: {
    backgroundColor: "#8A1538",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#8A1538",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addPhotoButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  photo: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  photoWrapper: {
    position: "relative",
    margin: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  
  dayCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  dayPick: {
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
  },

  create: {
    backgroundColor: "#8A1538",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#8A1538",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  }

});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 1,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default RestaurantCreationPage;
