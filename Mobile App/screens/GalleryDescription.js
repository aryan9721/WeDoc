import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import useApiKeyStore from "./store";

const GalleryDescription = () => {
  const apiKey = useApiKeyStore((state) => state.apiKey);
  let x_api_key = apiKey;
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL) BACKEND_URL = "http://170.187.254.215:4000";
  const [images, setImages] = useState([]);
  const [eventData, setEventData] = useState([]);

  const fetchGallery = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("x-api-key", x_api_key);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const res = await fetch(`${BACKEND_URL}/api/gallery`, requestOptions);
      const response = await res.json();

      for (let i = 0; i < response.length; i++) {
        const eid = response[i].event;
        const _res = await fetch(
          `${BACKEND_URL}/api/event?eventId=${eid}`,
          requestOptions
        );
        const r = await _res.json();
        response[i]["event"] = r[0]
          ? r[0]
          : { location: "meerut up", name: "event name" };
      }

      const allImages = response.reduce((acc, curr) => {
        if (Array.isArray(curr.images)) {
          return [...acc, ...curr.images];
        }
        return acc;
      }, []);

      setImages(allImages);
      setEventData(response); // Store event data
    } catch (error) {
      console.error("Error fetching gallery:", error);
      // Handle error and show appropriate message to the user
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  return (
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
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("gallery")}>
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
          <View
            style={{
              position: "relative",
              width: 173,
              height: 24,
              top: 24,
              left: 17,
            }}
          >
            <Text
              style={{
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: 20,
                lineHeight: 24,
                color: "#06080A",
              }}
            >
              Event / CME Name
            </Text>
            <View
              style={{
                position: "relative",
                width: 120,
                height: 17,
                left: 2,
                top: 11,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 16,
                  color: "#515151",
                }}
              >
                Location & Time
              </Text>
            </View>
          </View>
          <View style={styles.container1}>
            {eventData.length ? (
              eventData.map((event, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate("EventDetail", { event })}
                  style={styles.eventContainer}
                >
                  <Text style={styles.eventName}>{event.event.name}</Text>
                  <Text style={styles.eventLocation}>
                    {event.event.location}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No events found</Text>
            )}
          </View>
          <View style={styles.container1}>
            {images.length ? (
              images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleImagePress(image)}
                  style={styles.imageContainer}
                >
                  <ImageBackground
                    source={{ uri: `${BACKEND_URL}/${image.url}` }}
                    style={styles.image}
                  >
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Image
                        source={require("../assets/open.png")}
                        style={{
                          left: 88,
                          top: 3.5,
                          width: 16.88,
                          height: 27,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No images found</Text>
            )}
            {selectedImage && (
              <View style={styles.modal}>
                <Image
                  source={{ uri: `${BACKEND_URL}/${selectedImage.url}` }}
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
    marginBottom: 10,
  },
  container1: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    left: 12,
    marginTop: 61,
    overflow: "hidden",
    resizeMode: "cover",
  },
  imageContainer: {
    width: "32%",
    padding: 5,
    resizeMode: "cover",
  },
  image: {
    width: 111,
    height: 77,
    borderWidth: 0.5,
    borderColor: "#67B8F7",
    borderRadius: 11.28,
    resizeMode: "cover",
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
});

export default GalleryDescription;
