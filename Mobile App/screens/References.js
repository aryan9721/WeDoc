import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useApiKeyStore from "./store";

import Icon from "react-native-vector-icons/MaterialIcons";
export default function References({ route }) {
  console.log("route params", route.params.reference);
  // const [profile, setProfile] = React.useState({}) ;
  const [cprofile, setcProfile] = React.useState({});
  const navigation = useNavigation();
  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL) BACKEND_URL = "http://170.187.254.215:4000";
  const apiKey = useApiKeyStore((state) => state.apiKey);
  let x_api_key = apiKey;
  const fetch_profiles = async () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", x_api_key);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let res = await fetch(`${BACKEND_URL}/api/user/profile`, requestOptions);
    let response = await res.json();
    console.log("cprofile", response);
    setcProfile(response);
    // console.log(route.params.reference);
    // setProfile(route.params.reference);
  };
  const refer_patient = () => {
    console.log("refering patient");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      referenceDateTime: new Date(),
      name: patient.name,
      referredTo: route.params.reference.userId,
      referredFrom: cprofile._id,
      reason: patient.reason,
      contact: patient.contact,
    });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BACKEND_URL}/api/references`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // Clear the patient state
        setPatient({});
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch_profiles();
    console.log("--------start---------");
    console.log(route.params.reference);
    console.log("--------stop-------");
    setProfile(
      route.params.reference
        ? route.params.reference
        : {
            __v: 0,
            _id: "63e3c89df1935500188a7164",
            certificatesAchieved: 2,
            designation: "mmbs",
            email: "kumarnitesh2000.nk@gmail.com",
            location: "Pune",
            name: "Abhishek",
            patientRecovered: 2,
            successfulOT: 2,
            yoe: 2,
          }
    );
  }, [route.params.reference]);
  const [profile, setProfile] = React.useState({});
  const [patient, setPatient] = React.useState({});
  const handleChange = (name, value) => {
    setPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   console.log(profile);
  // }, [profile]);
  // useEffect(() => {
  //   console.log(patient);
  // }, [patient]);
  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={require("../assets/Background.png")}
          style={{
            flex: 1,
            backgroundColor:
              "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
          }}
        >
          <View style={styles.container}>
            <View style={styles.editButton}>
              <TouchableOpacity
                onPress={() => navigation.navigate("reference-main")}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                    }}
                  >
                    <Icon name="chevron-left" size={24} color="#67B8F7" />{" "}
                    References
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("qr-page")}
                  style={{
                    height: 30,
                    width: 29,
                    backgroundColor: "#F0F1F4",
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/scanner.png")}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      backgroundColor: "rgba(255, 255, 255, 0)",
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.referredButton}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 3,
                  marginTop: 10,
                  marginBottom: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    shadowColor: "#6CB8F1",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.16,
                    shadowRadius: 14,
                    borderRadius: 5.78,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                  onPress={() => navigation.navigate("referred-to-me")}
                >
                  <Text
                    style={{
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: 16,
                      lineHeight: 19,
                      color: "#67B8F7",
                    }}
                  >
                    Referred To Me
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    shadowColor: "#6CB8F1",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.16,
                    shadowRadius: 14,
                    borderRadius: 5.78,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                  onPress={() => navigation.navigate("referred-by-me")}
                >
                  <Text
                    style={{
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: 16,
                      lineHeight: 19,
                      color: "#67B8F7",
                    }}
                  >
                    Referred By Me
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginTop: 5,
                  marginBottom: 20,
                }}
              >
                <View style={{ position: "relative" }}>
                  <Image
                    source={{
                      uri: "https://th.bing.com/th?id=OIP.IVwf85npYYUcwRp4EIhqDgHaJm&w=219&h=284&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
                    }}
                    style={styles.circle}
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: -4,
                      right: 16,
                      backgroundColor: "rgba(255, 255, 255, 0)",
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Image
                      style={{
                        width: 15,
                        height: 15,
                        borderRadius: 5,
                        backgroundColor: "rgba(255, 255, 255, 0)",
                      }}
                      source={require("../assets/Star.png")}
                    />
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      bottom: -25,
                      left: 1,
                      flexDirection: "row",
                    }}
                  >
                    {[...Array(5)].map((e, i) => (
                      <Image
                        key={i}
                        style={{
                          width: 15,
                          height: 15,
                          marginHorizontal: 1,
                        }}
                        source={require("../assets/goldenStar.png")}
                      />
                    ))}
                  </View>
                </View>
                <View
                  style={{
                    marginHorizontal: 20,
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      lineHeight: 21,
                      color: "#06080A",
                    }}
                  >
                    {profile.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 16,
                      textTransform: "uppercase",
                      color: "#515151",
                    }}
                  >
                    {profile.designation}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 14,
                      color: "#686868",
                    }}
                  >
                    {profile.city ? profile.city : "Pune"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 14,
                      color: "#67B8F7",
                    }}
                  >
                    Certified By *****
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 12, ...styles.container1 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginTop: 15,
                }}
              >
                <View style={styles.box}>
                  <View style={styles.inner}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 28,
                        lineHeight: 34,
                        textAlign: "center",
                        color: "#67B8F7",
                      }}
                    >
                      {profile.patientRecovered}+
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        textAlign: "center",
                        color: "#686868",
                      }}
                    >
                      Patient Recovered
                    </Text>
                  </View>
                </View>
                <View style={styles.box}>
                  <View style={styles.inner}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 28,
                        lineHeight: 34,
                        textAlign: "center",
                        color: "#67B8F7",
                      }}
                    >
                      {profile.successfulOT}+
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        textAlign: "center",
                        color: "#686868",
                      }}
                    >
                      Successful OT
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.container1}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <View style={styles.box}>
                  <View style={styles.inner}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 28,
                        lineHeight: 34,
                        textAlign: "center",
                        color: "#67B8F7",
                      }}
                    >
                      {profile.yoe}+
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        textAlign: "center",
                        color: "#686868",
                      }}
                    >
                      Years Experience
                    </Text>
                  </View>
                </View>
                <View style={styles.box}>
                  <View style={styles.inner}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 28,
                        lineHeight: 34,
                        textAlign: "center",
                        color: "#67B8F7",
                      }}
                    >
                      {profile.certificatesAchieved}+
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        textAlign: "center",
                        color: "#686868",
                      }}
                    >
                      Certificates
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.container1}>
              <Text
                style={{
                  width: 242,
                  height: 24,
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: 20,
                  lineHeight: 24,
                  color: "#06080A",
                  marginTop: 10,
                }}
              >
                Please Add Patient details{" "}
              </Text>
            </View>
            {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.innerContainer}
          > */}
            <View>
              <TextInput
                style={styles.input}
                name="name"
                value={patient.name}
                onChange={(event) =>
                  handleChange("name", event.nativeEvent.text)
                }
                placeholder="Patient name"
              />

              <TextInput
                style={styles.input}
                name="contact"
                keyboardType="number-pad"
                value={patient.contact}
                onChange={(event) =>
                  handleChange("contact", event.nativeEvent.text)
                }
                placeholder="Patient number"
              />

              <TextInput
                style={styles.input}
                name="reason"
                value={patient.reason}
                onChange={(event) =>
                  handleChange("reason", event.nativeEvent.text)
                }
                placeholder="Reason"
              />
              <View style={styles.referButton}>
                <TouchableOpacity
                  onPress={() => {
                    refer_patient();
                    navigation.navigate("referred-by-me", {
                      key: new Date().getTime(),
                    });
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 20,
                      lineHeight: 24,
                      color: "#FFFFFF",
                      paddingHorizontal: 50,
                      paddingVertical: 20,
                    }}
                  >
                    Refer &nbsp; &#x2192;
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* </KeyboardAvoidingView> */}
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  container1: {
    flex: 1,
    paddingVertical: 6,
  },
  editButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  circle: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  box: {
    width: 173,
    height: 104.93,
    justifyContent: "space-between",
    marginHorizontal: 3,
    paddingHorizontal: 5,
  },
  inner: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#6CB8F1",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    borderRadius: 11.78,
  },
  input: {
    width: 354,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 11.78,
    fontSize: 16,
    lineHeight: 19,
    color: "#67B8F7",
    marginVertical: 12,
    padding: 10,
  },
  referredButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  referButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#67B8F7",
    boxShadow: "0px 6px 14px rgba(108, 184, 241, 0.16)",
    borderRadius: 11.78,
    marginHorizontal: 20,
  },
});
