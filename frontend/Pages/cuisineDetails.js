import React, { useState } from "react";
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

const CuisineDetails = ({ navigation }) => {
  const route = useRoute();
  const { image, food, description, Places, Resimage, restaurant } =
    route.params.restaurant;
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleReservation = () => {
    if (!name || !date || !time) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    Alert.alert(
      "Success",
      `Reservation made for ${name} on ${date} at ${time}`
    );
    setName("");
    setDate("");
    setTime("");
    setModalVisible(false);
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
                <Text style={styles.resName}>
                  {restaurant}
                </Text>
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
                value={name}
                onChangeText={setName}
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
              <TouchableOpacity
                style={styles.button}
                onPress={handleReservation}
              >
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
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fbfbfb',
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
    fontWeight: 'bold',
  },
  
  places: {
    fontSize: 16,
    color: 'gray',
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
});

export default CuisineDetails;
