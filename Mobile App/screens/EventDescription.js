import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import CarouselEvent from "../CarouselEvent";
import { useRoute } from "@react-navigation/native";
// import MapView, { Marker } from "react-native-maps";
// import { useNavigation } from "@react-navigation/native";
import useApiKeyStore from "./store";

export default function EventDescription() {
  // const navigation = useNavigation();
  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL)
    BACKEND_URL =
      "http://170.187.254.215:4000"; 
  
  const route = useRoute();
  const event = route.params ? route.params.event : {}
  const apiKey = useApiKeyStore((state) => state.apiKey);

  const handleRegister = () => {
    // console.log(`${BACKEND_URL}/api/doctor/updateMembershipPlan`, id, apiKey);
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", apiKey);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${BACKEND_URL}/api/event/${event._id}`, requestOptions)
      .then((response) => {response.text();
              alert('You have succesfully registered to event');
    })
      .then((result) => {console.log(result)})
      .catch((error) => console.log("error", error));
  };
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
          <SafeAreaView
            style={{
              backgroundColor: "white",
            }}
          >
            <View>
              <CarouselEvent />
            </View>
            <View style={styles.container}>
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    width: 113,
                    height: 17,
                    left: 1,
                    top: 1,
                    fontSize: 14,
                    lineHeight: 16,
                    color: "#686868",
                    marginBottom: 5,
                  }}
                >
                  Organiser's name
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    width: 160,
                    height: 24,
                    left: 1,
                    top: 20,
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: 20,
                    lineHeight: 24,
                    color: "#06080A",
                    marginBottom: 5,
                  }}
                >
                  {event.name}
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    width: 148,
                    height: 16,
                    left: 1,
                    top: 55,
                    fontSize: 14,
                    lineHeight: 16,
                    color: "#686868",
                  }}
                >
                  <Image
                    source={require("../assets/calendar.png")}
                    style={{
                      width: 19,
                      height: 21,
                      left: 53,
                      top: 5,
                      borderRadius: 4,
                    }}
                  />{" "}
                  {new Date(event.startDateTime).toLocaleDateString()}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    width: 69,
                    height: 28,
                    left: 0,
                    top: 0,
                    backgroundColor: "#FFFFFF",
                    shadowColor: "#6CB8F1",
                    shadowOffset: {
                      width: 0,
                      height: 6,
                    },
                    shadowOpacity: 0.16,
                    shadowRadius: 14,
                    borderRadius: 5.78,
                  }}
                >
                  <Text
                    style={{
                      position: "absolute",
                      width: 55,
                      height: 17,
                      left: 10,
                      top: 6,
                      fontSize: 14,
                      lineHeight: 16,
                      color: "#67B8F7",
                    }}
                  >
                    3 Points
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: "gray", marginTop: 45 }}>
                  {event && event.startDateTime && (
                    <Text>
                      {new Date(event.startDateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </Text>
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Sponsored By
              </Text>
            </View>
            <View style={styles.container}>
              <Image
                source={{
                  uri: "https://th.bing.com/th?id=OIP.IVwf85npYYUcwRp4EIhqDgHaJm&w=219&h=284&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
                }}
                style={styles.circle}
              />
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1624133172024-87559cb5eeb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE0fHxkb2N0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60",
                }}
                style={styles.circle}
              />
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1612943733919-f9661f1331f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIwfHxkb2N0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60",
                }}
                style={styles.circle}
              />
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1585559604933-2c1fd76e1bd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTMxfHxkb2N0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60",
                }}
                style={styles.circle}
              />
            </View>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 20,
                  lineHeight: 24,
                  color: "#06080A",
                }}
              >
                Description
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 22,
                  color: "#686868",
                }}
              >
                {event && event.description ? event.description : ""}
              </Text>
            </View>
            {/* <View
            style={{
              paddingHorizontal: 15,
              borderWidth: 1
            }}
          >
            <MapView
              style={{
                height: 200,
                borderRadius: 12,
                width: "100%",
              }}
              initialRegion={{
                latitude: 19.076,
                longitude: 72.8777,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            > */}
            {/* <MapView
          style={{
            height: 200,
            width: "100%",
          }}
          initialRegion={{
            latitude: cme.latitude,
            longitude: cme.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        > */}
            {/* <Marker
            coordinate={{
              latitude: cme.latitude,
              longitude: cme.longitude,
            }}
            title={cme.name}
          /> */}
            {/* <Marker
                coordinate={{ latitude: 19.076, longitude: 72.8777 }}
                title="Mumbai"
                description="Marker Description"
              />
            </MapView>
          </View> */}
            <View style={styles.container}>
              <View>
                <Text
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: 20,
                    lineHeight: 24,
                    color: "#06080A",
                  }}
                >
                  {event && event.registeredUser.length} + People Joined:
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 15,
                  backgroundColor: "#67B8F7",
                  shadowColor: "#6CB8F1",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.16,
                  shadowRadius: 14,
                  borderRadius: 11.78,
                  elevation: 6, // for android
                  margin: 30,
                }}
                onPress={handleRegister}
              >
                <Text
                  style={{
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: 20,
                    lineHeight: 24,
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Register Now &nbsp;&#x2192;
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  circle: {
    width: 70,
    height: 70,
    borderRadius: 90 / 2,
    margin: 10,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
});
