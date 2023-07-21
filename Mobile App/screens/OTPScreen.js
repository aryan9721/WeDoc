import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import useApiKeyStore from "./store";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPScreen({ route }) {
  const navigation = useNavigation();

  const [otp, setOtp] = useState("");
  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL) BACKEND_URL = "http://170.187.254.215:4000";
  const { data } = route.params;
  const handleOtpSubmit = async () => {
    const notificationToken = await AsyncStorage.getItem('expoToken');
    const verify = {
      otp,
      hash: data.hash,
      email: data.email,
      notificationToken: notificationToken,
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(verify);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BACKEND_URL}/api/user/verifyOTP`, requestOptions)
      .then((response) => {
        if (response.ok) {
          // HTTP status code between 200 and 299
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        console.log(data);
        useApiKeyStore.setState({ apiKey: data["x-api-key"] });
        navigation.navigate("profile");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ScrollView
      style={{
        backgroundColor:
          "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
      }}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.title}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="numeric"
            onChangeText={setOtp}
            value={otp}
          />
          <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 30,
    color: "#67B8F7",
  },
  input: {
    width: "80%",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#67B8F7",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
