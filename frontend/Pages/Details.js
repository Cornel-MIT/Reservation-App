import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps"; 
import { initStripe, useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";


const Details = ({ navigation }) => {
  const route = useRoute();
  const {
    photos,
    name,
    ambianceDescription,
    location,
    contactDetails,
    operatingHours,
    coordinates = { latitude: 0, longitude: 0 }, // Default coordinates
  } = route.params.restaurant;

  const [modalVisible, setModalVisible] = useState(false);
  const [rName, setRName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    initStripe({
      publishableKey: "",
    });
  }, []);

  const handleReservation = async () => {
    if (!rName || !date || !time) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.30.79:5000/api/create-payment-intent",
        {
          amount: 1000, // R10.00 in Rands
          currency: "zar",
        }
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
        setDate("");
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

      {/* Mini Map Card */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider="google" // Specify the provider
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }}
            title={name}
            description={location}
          />
        </MapView>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Reserve</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Make a Reservation</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={rName}
              onChangeText={setRName}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Time (HH:MM)"
              value={time}
              onChangeText={setTime}
            />
            <TouchableOpacity style={styles.button} onPress={handleReservation}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#FAF3F0",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 16,
  },
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
    marginBottom: 16,
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    bottom: -185,
    padding: 20,
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: "#8A1538",
    fontSize: 16,
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 16,
    marginTop: 20,
  },
  map: {
    flex: 1,
  },
});

export default Details;