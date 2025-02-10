import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { initStripe, useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import { Calendar } from "react-native-calendars";

const CuisineDetails = ({ navigation }) => {
  const route = useRoute();
  const { image, food, description, Places, Resimage, restaurant } =
    route.params.restaurant;
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    initStripe({
      publishableKey:
        "pk_test_51Q4n1jHICvbDXIB4ZCsX7pjbK2nJ31cAOM4nzHSXTROtjDPxUHpg4GPH5TFKKlT5hqCv4IzOQ37osfSCxbmP1IgM00VSwKbCqs",
    });
  }, []);

  const handleReservation = async () => {
    if (!name || !date || !time) {
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
        setName("");
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image source={image} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{food}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.rescontainer}>
              <Image source={Resimage} style={styles.resimage} />
              <View style={styles.textContainer}>
                <Text style={styles.resName}>{restaurant}</Text>
                <Text style={styles.places}>{Places}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Reserve</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Modal for Reservation */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Make a Reservation</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TouchableOpacity
                style={styles.Calendarbutton}
                onPress={() => setShowCalendar(!showCalendar)}
              >
                <Text style={styles.CalendarbuttonText}>
                  {dateSelected || "Select Date"}
                </Text>
              </TouchableOpacity>
              {showCalendar && (
                <Calendar
                  style={styles.calendarView}
                  onDayPress={(day) => {
                    setDateSelected(day.dateString);
                    setShowCalendar(false);
                  }}
                  markedDates={{
                    [dateSelected]: {
                      selected: true,
                      selectedColor: "#8A1538",
                    },
                  }}
                />
              )}
              <TextInput
                style={styles.input}
                placeholder="Time (HH:MM)"
                value={time}
                onChangeText={setTime}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleReservation}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3F0",
  },
  image: {
    width: "100%",
    height: 300,
  },
  rescontainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },

  textContainer: {
    marginLeft: 10,
    flexShrink: 1,
  },

  resimage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  resName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  places: {
    fontSize: 16,
    color: "gray",
  },
  info: {
    backgroundColor: "#fff",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    marginTop: -50,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "gray",
  },

  button: {
    backgroundColor: "#8A1538",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredView: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalView: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "gray", borderRadius: 5, padding: 8, width: "100%", marginBottom: 10 },
  closeButton: { marginTop: 10, alignItems: "center" },
  closeButtonText: { color: "#8A1538", fontSize: 16 },
  calendarView: { marginTop: 10, borderRadius: 10, padding: 10 },
  mapContainer: { height: 200, margin: 16 },
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
});

export default CuisineDetails;
