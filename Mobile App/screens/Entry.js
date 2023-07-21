import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";

export default function Entry() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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
          <Text style={styles.title}>WE DOC</Text>
          <Text style={styles.title1}>Want to Become A Member</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.buttonText}>LogIn Now</Text>
          </TouchableOpacity>
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => navigation.navigate("terms-and-condition")}
            >
              <Text style={styles.text}>Terms & Condition | </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("privacy-policy")}
            >
              <Text style={styles.text}> Privacy Policy</Text>
            </TouchableOpacity>
          </View>
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
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 30,
  },
  text: {
    fontSize: 15,
    marginTop: 20,
    color: "gray",
  },
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
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
