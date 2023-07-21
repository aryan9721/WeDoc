import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
export default function Career() {
  let BACKEND_URL = process.env.BACKEND_URL || "http://170.187.254.215:4000";

  const navigation = useNavigation();
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const handleItemPress = (career) => {
    setSelectedCareer(career);
  };
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/career`)
      .then((response) => {
        console.log(response.data); // Check the value of response.data
        setCareers(response.data);
      })
      .catch((error) => {
        console.log(error); // Check the error message
      });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={require("../assets/Background.png")}
          style={{
            flex: 1,
            background:
              "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
          }}
        >
          <SafeAreaView style={styles.container}>
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 10,
                // backgroundColor: "white",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text
                  style={{
                    position: "relative",
                    left: 0,
                    right: "58.7%",
                    top: 0,
                    bottom: "6.67%",
                    fontWeight: "500",
                    fontSize: 24,
                    lineHeight: 28,
                    color: "#06080A",
                  }}
                >
                  <Icon name="chevron-left" size={24} color="#67B8F7" /> Career
                </Text>
              </TouchableOpacity>
            </View>

            {selectedCareer ? (
              <View>
                <View>
                  <View
                    style={{
                      margin: 20,
                    }}
                  >
                    <Text
                      style={{
                        position: "relative",
                        fontWeight: "500",
                        fontSize: 20,
                        lineHeight: 24,
                        color: "#06080A",
                      }}
                    >
                      Assistant Doctor
                    </Text>
                    <Text
                      style={{
                        position: "relative",
                        fontSize: 16,
                        lineHeight: 19,
                        color: "#000000",
                        marginTop: 10,
                        fontSize: 15,
                        fontWeight: "500",
                      }}
                    >
                      {selectedCareer.company}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        color: "#000000",
                      }}
                    >
                      <Image
                        style={{
                          width: 15,
                          height: 15,
                          marginHorizontal: 1,
                          resizeMode: "contain", // or 'cover'
                        }}
                        source={require("../assets/schedule.png")}
                      />{" "}
                      {selectedCareer.jobType}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 16,
                        lineHeight: 19,
                        color: "#000000",
                      }}
                    >
                      <Image
                        style={{
                          width: 15,
                          height: 15,
                          marginHorizontal: 1,
                          resizeMode: "contain", // or 'cover'
                        }}
                        source={require("../assets/location.png")}
                      />{" "}
                      {selectedCareer.location}
                    </Text>
                    {/* <Text
                    style={{
                      marginTop: 10,
                      fontSize: 16,
                      lineHeight: 19,
                      color: "#000000",
                    }}
                  >
                    <Image
                      style={{
                        width: 15,
                        height: 15,
                        marginHorizontal: 1,
                      }}
                      source={require("../assets/goldenStar.png")}
                    />{" "}
                    {selectedCareer.workplaceType}
                  </Text> */}
                  </View>
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginTop: 40,
                    }}
                  >
                    <Text
                      style={{
                        position: "relative",
                        fontWeight: "500",
                        fontSize: 20,
                        lineHeight: 21,
                        color: "#000000",
                      }}
                    >
                      Job Description
                    </Text>
                    <Text
                      style={{
                        marginTop: 7,
                        fontSize: 16,
                        lineHeight: 25,
                        textAlign: "justify",
                        letterSpacing: -0.3,
                        color: "#000000",
                        fontWeight: "300",
                        padding: 10,
                      }}
                    >
                      {selectedCareer.description}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedCareer(null)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Back to List of careers</Text>
                </TouchableOpacity>
              </View>
            ) : (
              careers.map((career, index) => (
                <TouchableOpacity
                  key={index} // Use the index as the key
                  onPress={() => handleItemPress(career)}
                  style={{
                    backgroundColor:
                      selectedCareer && selectedCareer.id === career.id
                        ? "#67B8F7"
                        : "#FFFFFF",
                    padding: 15,
                    borderRadius: 12,
                    marginHorizontal: 10,
                    marginVertical: 5,
                    elevation: 6,
                    shadowColor: "rgba(108, 184, 241, 0.16)",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 1,
                    shadowRadius: 14,
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedCareer && selectedCareer.id === career.id
                          ? "#FFFFFF"
                          : "#000000",
                    }}
                  >
                    {career.jobTitle}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
  },
  button: {
    marginTop: 40,
    backgroundColor: "#0099ff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
