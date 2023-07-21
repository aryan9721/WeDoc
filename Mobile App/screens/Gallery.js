import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import useApiKeyStore from "./store";

const Gallery = ({ title, subtitle, imageUri, onPress }) => {
  const apiKey = useApiKeyStore((state) => state.apiKey);
  let x_api_key = apiKey;

  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  let BACKEND_URL = "http://170.187.254.215:4000";
  const [images, setImages] = useState([]);
  const fetch_gallery = async () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", x_api_key);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let res = await fetch(`${BACKEND_URL}/api/gallery`, requestOptions);
    let response = await res.json();
    console.log("response from gallery ", response);
    for (let i = 0; i < response.length; i++) {
      myHeaders = new Headers();
      myHeaders.append("x-api-key", x_api_key);
      requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      let eid = response[i].event;
      console.log(eid);
      let _res = await fetch(
        `${BACKEND_URL}/api/event?eventId=${eid}`,
        requestOptions
      );
      let r = await _res.json();
      response[i]["event"] = r[0]
        ? r[0]
        : { location: "meerut up", name: "event name" };
    }
    setImages(response);
  };
  useEffect(() => {
    fetch_gallery();
  }, []);
  const image = {
    uri: "https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60",
  };

  const handleImagePress = (image) => {
    console.log("....");
    console.log(image);
    setSelectedImage(image);
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/Background.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 11.78,
        }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text
                style={{
                  position: "relative",
                  left: 0,
                  right: "58.7%",
                  top: 8,
                  bottom: "6.67%",
                  fontWeight: "500",
                  fontSize: 24,
                  lineHeight: 28,
                  color: "#06080A",
                }}
              >
                <Icon name="chevron-left" size={24} color="#67B8F7" /> Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("gallery-calender")}
            >
              <Image
                source={require("../assets/calendar.png")}
                style={{
                  width: 29,
                  height: 30,
                  left: 53,
                  top: 5,
                  backgroundColor: "#F0F1F4",
                  borderRadius: 4,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Image
                source={require("../assets/Sorting.png")}
                style={{
                  width: 25,
                  height: 20,
                  left: -5,
                  top: 12,
                  backgroundColor: "#F0F1F4",
                  borderRadius: 4,
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("gallery-description")}
            style={styles.welcome}
          >
            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                <ImageBackground
                  source={{
                    uri: images[images.length - 1]
                      ? `${BACKEND_URL}/${images[images.length - 1].coverImg}`
                      : null,
                  }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 11.78,
                  }}
                >
                  {/* top-right */}
                  <Text style={styles.text}>10 Jul</Text>
                  {/* bottom-left */}
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 18,
                      lineHeight: 21,
                      color: "#06080A",
                      ...styles.text1,
                    }}
                  >
                    Roshan Porwal
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 16,
                      color: "#06080A",
                      ...styles.text2,
                    }}
                  >
                    Pune
                  </Text>
                  {/* bottom-right */}
                  {/* <Text
                    style={{
                      fontSize: 30,
                      color: "black",
                      backgroundColor: "white",
                      ...styles.text3,
                    }}
                  >
                    &#10003;
                  </Text> */}
                </ImageBackground>
              </Card>
            </View>
            <View>
              <Text style={styles.welcome}> </Text>
            </View>
            <View>
              <Text style={styles.welcome}> </Text>
            </View>
            <View>
              <Text style={styles.welcome}> </Text>
            </View>
            <View>
              <Text style={styles.welcome}> </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.container1}>
            {images &&
              images.map((image, id) => (
                <TouchableOpacity
                  key={id}
                  // onPress={() => handleImagePress(image)}
                  onPress={() => navigation.navigate("gallery-description")}
                  style={styles.imageContainer}
                >
                  <ImageBackground
                    source={{ uri: `${BACKEND_URL}/${image.coverImg}` }}
                    style={styles.image}
                  >
                    {/* top-right */}
                    <Text style={styles.textTop}>22 Dec</Text>
                    {/* bottom-left */}
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 14,
                        lineHeight: 12,
                        color: "#06080A",
                        ...styles.text1,
                      }}
                    >
                      {image.event.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        lineHeight: 12,
                        color: "#06080A",
                        ...styles.text2,
                      }}
                    >
                      {image.event.location}
                    </Text>
                    {/* bottom-right */}
                    {/* <Text
                      style={{
                        fontSize: 14,
                        color: "black",
                        backgroundColor: "white",
                        ...styles.text3,
                      }}
                    >
                      &#10003;
                    </Text> */}
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            {/* open modal after pressing */}
            {selectedImage && (
              <View style={styles.modal}>
                <Image
                  source={{ uri: selectedImage.coverImg }}
                  style={styles.selectedImage}
                />
                <TouchableOpacity onPress={() => setSelectedImage(null)}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  welcome: {
    flex: 1,
    paddingVertical: 15,
    height: "100%",
    position: "relative",
  },
  text: {
    position: "absolute",
    left: "86.72%",
    right: "3.11%",
    top: "4.98%",
    bottom: "77.11%",
    backgroundColor: "#FFFFFF",
    borderRadius: 7.78,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    textAlign: "center",
  },
  text1: {
    position: "absolute",
    bottom: 35,
    left: 10,
  },
  text2: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  text3: {
    color: "white",
    backgroundColor: "#67B8F7",
    boxSizing: "border-box",
    position: "absolute",
    left: "92.94%",
    right: "0.85%",
    top: "87.06%",
    bottom: "1.99%",
    borderWidth: 3,
    borderColor: "#67B8F7",
  },
  container1: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    borderRadius: 11.78,
  },
  cardContainer: {
    margin: 10,
    overflow: "hidden", // Set overflow style here
  },
  card: {
    borderRadius: 11.78,
    borderWidth: 3,
    borderColor: "#67B8F7",
  },
  imageContainer: {
    width: "47%",
    padding: 5,
    borderRadius: 11.78,
    borderWidth: 1,
    borderColor: "#67B8F7",
    margin: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 11.78,
  },
  modal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedImage: {
    width: "90%",
    height: "90%",
  },
  closeButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  textTop: {
    position: "absolute",
    left: "77.72%",
    right: "3.11%",
    top: "5.98%",
    bottom: "77.11%",
    backgroundColor: "#FFFFFF",
    borderRadius: 7.78,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    width: 30,
    height: 30,
    fontSize: 10,
    shadowOpacity: 0.14,
    shadowRadius: 14,
    textAlign: "center",
    padding: 1,
  },
});
export default Gallery;
