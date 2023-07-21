import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useApiKeyStore from "./store";

import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
const people = [
  {
    id: 1,
    name: "John Smith",
    mobile: "+91 123456789",
    time: "12:00 PM",
    Date: "Nov 12, 2022",
    DoctorName: "Dr. Abhishek Johri",
    image: require("../assets/carousel1.png"),
  },
  {
    id: 2,
    name: "Jane Doe",
    mobile: "+91 123456789",
    time: "12:00 PM",
    Date: "Nov 12, 2022",
    DoctorName: "Dr. Abhishek Johri",
    image: require("../assets/carousel2.png"),
  },
  {
    id: 3,
    name: "Bob Johnson",
    mobile: "+91 123456789",
    time: "12:00 PM",
    Date: "Nov 12, 2022",
    DoctorName: "Dr. Abhishek Johri",
    image: require("../assets/carousel3.png"),
  },
  {
    id: 4,
    name: "Jane Doe",
    mobile: "+91 123456789",
    time: "12:00 PM",
    Date: "Nov 12, 2022",
    DoctorName: "Dr. Abhishek Johri",
    image: require("../assets/carousel2.png"),
  },
  {
    id: 5,
    name: "Bob Johnson",
    mobile: "+91 123456789",
    time: "12:00 PM",
    Date: "Nov 12, 2022",
    DoctorName: "Dr. Abhishek Johri",
    image: require("../assets/carousel3.png"),
  },
];

export default function ReferredToMe() {
  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL) BACKEND_URL = "http://170.187.254.215:4000";
  const [peoples, setpeoples] = React.useState([]);
  useEffect(() => {
    console.log(peoples[0]);
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
    let res = await fetch(`${BACKEND_URL}/api/references/from`, requestOptions);
    let response = await res.json();
    for (let i = 0; i < response.length; i++) {
      let k = await fetch(
        `${BACKEND_URL}/api/user?userId=` + response[i].referredTo,
        requestOptions
      );
      console.log(response[i].referredTo);
      const doctorData = await k.json();
      response[i].referredTo = doctorData[0];
    }
    setpeoples(response);
  };
  useEffect(() => {
    fetch_peoples();
  }, []);
  const [query, setQuery] = useState("");
  const navigation = useNavigation();
  const handleSearch = (text) => {
    setQuery(text);
  };

  const handleClear = () => {
    setQuery("");
  };

  const filteredPeople = peoples.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );
  const handleItemClick = (item) => {
    navigation.navigate("patient", { reference: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemClick(item)}
    >
      <View style={styles.personContainer}>
        {/* <Image source={item.image} style={styles.image} /> */}
        <Image
          source={require("../assets/carousel1.png")}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.mobile}>+91 {item.contact}</Text>
          <Text style={styles.DoctorName}>
            {item.referredTo ? item.referredTo["name"] : "Abhishek"}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          {/* <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.date}>{item.Date}</Text> */}
          <Text style={styles.time}>12:00 PM</Text>
          <Text style={styles.date}>Nov 12, 2022</Text>
          <Image
            source={require("../assets/Notes.png")}
            style={{
              position: "relative",
              width: 16.44,
              height: 21.76,
              backgroundColor: "rgba(255, 255, 255, 0)",
              marginTop: 2,
            }}
          />
        </View>
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
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={handleSearch}
            value={query}
          />
          <TouchableOpacity onPress={handleClear}>
            <MaterialIcons name="cancel" size={20} color="#aaa" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="mic" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredPeople}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBarContainer: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#6CB8F1",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    borderRadius: 11.78,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
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
  personContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 26,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
  },
  name: {
    fontSize: 18,
    lineHeight: 21,
    color: "#06080A",
    fontWeight: "500",
  },
  mobile: {
    fontSize: 14,
    lineHeight: 16,
    textTransform: "uppercase",
    color: "#515151",
    marginVertical: 2,
  },
  DoctorName: {
    fontSize: 12,
    lineHeight: 14,
    color: "#06080A",
    marginVertical: 2,
    fontWeight: "500",
  },
  time: {
    fontSize: 12,
    lineHeight: 12,
    color: "#969696",
    height: 12,
    marginVertical: 3,
  },
  date: {
    fontSize: 12,
    lineHeight: 12,
    color: "#969696",
  },
});
