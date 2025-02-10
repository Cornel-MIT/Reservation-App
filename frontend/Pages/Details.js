import React, { useState, useEffect } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { initStripe, useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";

const Details = ({ navigation }) => {
  const route = useRoute();
  const {
    photos,
    name,
    ambianceDescription,
    location,
    contactDetails,
    operatingHours,
    coordinates = { latitude: 0, longitude: 0 },
  } = route.params.restaurant;

  const [modalVisible, setModalVisible] = useState(false);
  const [rName, setRName] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  const [time, setTime] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    initStripe({
      publishableKey: "pk_test_51Q4n1jHICvbDXIB4ZCsX7pjbK2nJ31cAOM4nzHSXTROtjDPxUHpg4GPH5TFKKlT5hqCv4IzOQ37osfSCxbmP1IgM00VSwKbCqs",
    });
  }, []);

  const handleReservation = async () => {
    if (!rName || !dateSelected || !time) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.30.79:5000/api/create-payment-intent",
        { amount: 1000, currency: "zar" }
      );
      
      const { clientSecret } = response.data;
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Your Restaurant Name",
      });
      
      if (error) {
        Alert.alert("Error", error.message);
        return;
      }
      
      const { paymentError } = await presentPaymentSheet();
      if (paymentError) {
        Alert.alert("Error", paymentError.message);
      } else {
        Alert.alert("Success", "Payment successful! Reservation confirmed.");
        setRName("");
        setDateSelected("");
        setTime("");
        setModalVisible(false);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while processing your payment.");
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: photos[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{ambianceDescription}</Text>
        <Text style={styles.places}>{location}</Text>
        <Text style={styles.places}>{contactDetails}</Text>
        <Text style={styles.places}>{operatingHours}</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={coordinates} title={name} description={location} />
        </MapView>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Reserve</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Make a Reservation</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={rName}
              onChangeText={setRName}
            />
            <TouchableOpacity
              style={styles.Calendarbutton}
              onPress={() => setShowCalendar(!showCalendar)}
            >
              <Text style={styles.CalendarbuttonText}>{dateSelected || "Select Date"}</Text>
            </TouchableOpacity>
            {showCalendar && (
              <Calendar
                style={styles.calendarView}
                onDayPress={(day) => {
                  setDateSelected(day.dateString);
                  setShowCalendar(false);
                }}
                markedDates={{
                  [dateSelected]: { selected: true, selectedColor: "#8A1538" },
                }}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Time (HH:MM)"
              value={time}
              onChangeText={setTime}
            />
            <TouchableOpacity style={styles.button} onPress={handleReservation}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF3F0" },
  image: { width: "100%", height: 300 },
  info: {
    backgroundColor: "#fff",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    marginTop: -50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
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
    marginBottom: 3,
    marginLeft: 16,
  },
  button: {
    backgroundColor: "#8A1538",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 16,
  },
  Calendarbutton:{
    // backgroundColor: "#8A1538",
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  CalendarbuttonText:{
    fontWeight: "bold"
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  centeredView: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalView: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "gray", borderRadius: 5, padding: 8, width: "100%", marginBottom: 10 },
  closeButton: { marginTop: 10, alignItems: "center" },
  closeButtonText: { color: "#8A1538", fontSize: 16 },
  calendarView: { marginTop: 10, borderRadius: 10, padding: 10 },
  mapContainer: { height: 200, margin: 16 },
  map: { flex: 1 },
});

export default Details;
