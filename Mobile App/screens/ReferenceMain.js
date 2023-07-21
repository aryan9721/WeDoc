import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useApiKeyStore from "./store";
import * as Speech from "expo-speech";
import Icon from "react-native-vector-icons/MaterialIcons";
const sampleData = [
  {
    id: 1,
    name: "Reference 1",
    image: "https://picsum.photos/200/300",
    description: "This is a description for reference 1",
  },
  {
    id: 2,
    name: "Reference 2",
    image: "https://picsum.photos/200/300",
    description: "This is a description for reference 2",
  },
];

const doctors = [
  {
    id: 1,
    name: "Dr.Pankaj",
    mobile: "+91 123456789",
    time: "12:00 PM",
    Date: "Nov 12, 2022",
    DoctorName: "Dr. Abhishek Johri",
    image: require("../assets/carousel1.png"),
  },
  {
    id: 2,
    name: "Dr.Johri",
    mobile: "+91 123456789",
    time: "12:00 PM",
    Date: "Nov 12, 2022",
    DoctorName: "Dr. Abhishek Johri",
    image: require("../assets/carousel1.png"),
  },
  {
    id: 3,
    name: "Dr. Suman",
    mobile: "+91 123456789",
    time: "12:00 PM",
    Date: "Nov 12, 2022",
    DoctorName: "Dr. Abhishek Johri",
    image: require("../assets/carousel1.png"),
  },
  {
    id: 4,
    name: "Dr. Naresh Tyagi",
    mobile: "+91 123456789",
    time: "12:00 PM",
    Date: "Nov 12, 2022",
    DoctorName: "Dr. Abhishek Johri",
    image: require("../assets/carousel1.png"),
  },
  {
    id: 5,
    name: "Dr.Shanu Sharma",
    mobile: "+91 123456789",
    time: "12:00 PM",
    Date: "Nov 12, 2022",
    DoctorName: "Dr. Abhishek Johri",
    image: require("../assets/carousel1.png"),
  },
];
const ReferenceMain = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const getCity = async () => {
    let value = await AsyncStorage.getItem("profile");
    value = JSON.parse(value);
    if (value !== null) {
      setSearchQuery(value.city ? value.city : "");
      console.log("Retrieved data:", value);
    } else {
      console.log("No data found.");
    }
  };
  const handleRefresh = () => {
    setIsRefreshing(true);

    // Fetch new data here

    setIsRefreshing(false);
  };

  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL) BACKEND_URL = "http://170.187.254.215:4000";
  const [peoples, setpeoples] = React.useState([]);
  useEffect(() => {
    console.log(peoples[0]);
    getCity();
  }, [peoples]);
  const apiKey = useApiKeyStore((state) => state.apiKey);
  let x_api_key = apiKey;
  const fetch_peoples = async () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", x_api_key);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let res = await fetch(
      "http://170.187.254.215:4000/api/specialist",
      requestOptions
    );
    let response = await res.json();
    setpeoples(response);
  };
  useEffect(() => {
    fetch_peoples();
  }, []);

  const handleVoiceSearch = async () => {
    try {
      const { transcription } = await Speech.recognizeAsync();
      setSearchQuery(transcription);
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClick = (item) => {
    console.log("item", item);
    navigation.navigate("references", { reference: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer1}
      onPress={() => handleItemClick(item)}
    >
      <View style={styles.itemImageContainer1}>
        <Image
          source={{ uri: sampleData[0].image }}
          style={styles.itemImage1}
        />
        <View style={styles.starContainer1}>
          <View style={styles.star1}>
            <Image
              style={styles.starIcon}
              source={require("../assets/Star.png")}
            />
          </View>
        </View>
      </View>
      <View style={styles.itemTextContainer1}>
        <Text style={styles.itemName1}>
          {item.name} ({item.speciality})
        </Text>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 16,
            textTransform: "uppercase",
            color: "#515151",
          }}
        >
          {item.designation}
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 14, color: "#686868" }}>
          {item.associationName}
          {item.city ? item.city : "Pune"}
        </Text>

        <Text style={{ fontSize: 12, lineHeight: 14, color: "#67B8F7" }}>
          Certified By *****
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
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
          <View>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
              }}
            >
              References
            </Text>
          </View>
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
              marginHorizontal: -3,
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
                paddingHorizontal: 30,
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
                paddingHorizontal: 30,
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
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search name, specialist, location"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleVoiceSearch}>
            <Ionicons
              name="mic-outline"
              size={24}
              color="#686868"
              style={styles.micIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: "53%" }}>
          <View
            style={{
              height: 335,
              marginBottom: 5,
            }}
          >
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                  tintColor="#67B8F7"
                  title="Refreshing..."
                  titleColor="#67B8F7"
                  progressViewOffset={10}
                  colors={["#67B8F7"]}
                  progressBackgroundColor="#FFF"
                  size="large" // Update the size prop here
                />
              }
              data={peoples.filter(
                (item) =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.speciality
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.designation
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )}
              renderItem={renderItem}
              keyExtractor={(item) => item._id.toString()}
              style={styles.list}
            />
          </View>
        </View>

        <View style={{ height: "47%" }}>
          <View>
            <Text
              style={{
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: 20,
                lineHeight: 24,
                color: "#06080A",

                marginBottom: 15,
              }}
            >
              Frequently reffered doctors
            </Text>
          </View>
          <View
            style={{
              height: 180,
            }}
          >
            <ScrollView horizontal={true}>
              {doctors.map((doctor, index) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("profile")}
                  key={index}
                >
                  <ImageBackground
                    key={index}
                    source={doctor.image}
                    style={styles.imageBackground}
                    imageStyle={styles.image}
                  >
                    <View style={styles.star}>
                      <View>
                        <Image
                          style={styles.starIcon}
                          source={require("../assets/Star.png")}
                        />
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          lineHeight: 16,
                          textAlign: "center",
                          color: "#06080A",
                        }}
                      >
                        {doctor.name}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(108, 184, 241, 0.16)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 26,
    shadowRadius: 14,
    elevation: 2,
    shadowOffset: { width: 0, height: 6 },
    borderRadius: 11.78,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  micIcon: {
    marginLeft: 16,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 25,
  },
  itemTextContainer: {
    flex: 1,
  },
  referredButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: 75.2,
    height: 75.2,
    marginRight: 20,
  },
  image: {
    borderRadius: 50,
  },

  star: {
    position: "absolute",
    top: -5,
    right: 7,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0)",
    justifyContent: "center",
    alignItems: "center",
  },
  starIcon: {
    width: 15,
    height: 15,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  itemContainer1: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: "grey",
  },
  itemImageContainer1: {
    position: "relative",
  },
  itemImage1: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  starContainer1: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  star1: {
    width: 45,
    height: 15,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  itemTextContainer1: {
    flex: 1,
  },
  itemName1: {
    fontSize: 18,
    lineHeight: 21,
    color: "#06080A",
  },
});

export default ReferenceMain;
