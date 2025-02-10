import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {
  const navigation = useNavigation();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  const handleAuth = async () => {
    if (!email || !password || (!isSignIn && !username)) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      if (isSignIn) {
       
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password }
        );
        if (response.status === 200) {
          navigation.navigate(
            response.data.role === "user" ? "UserDashboard" : "AdminDashboard"
          );
        }
      } else {
  
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            username,
            email,
            password,
            role,
          }
        );
        if (response.status === 201) {
          Alert.alert("Success", "Registration successful!");
          setIsSignIn(true); 
        }
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong!"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Res/restaurant-reservation.jpg")}
        style={styles.image}
      />

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setIsSignIn(true)}>
          <Text style={[styles.tab, isSignIn && styles.activeTab]}>
            SIGN IN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsSignIn(false)}>
          <Text style={[styles.tab, !isSignIn && styles.activeTab]}>
            REGISTER
          </Text>
        </TouchableOpacity>
      </View>

      {!isSignIn && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>
          {isSignIn ? "SIGN IN" : "REGISTER"}
        </Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        </Text>
        <Text style={styles.linkText} onPress={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? "Register here" : "Login here"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: "100%",
    height: '50%',
    resizeMode: "contain",
    marginBottom: 20,
  },
  tabContainer: { flexDirection: "row", marginBottom: 20 },
  tab: { fontSize: 16, padding: 10, color: "gray" },
  activeTab: {
    color: "green",
    borderBottomWidth: 2,
    borderBottomColor: "green",
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16 },
  linkContainer: { flexDirection: "row", marginTop: 15 },
  linkText: { color: "blue", textDecorationLine: "underline" },
});

export default AuthScreen;
