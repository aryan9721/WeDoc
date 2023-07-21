import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
const DATA = [
  {
    id: "1",
    name: "John Doe",
    description: "Headache, stomach ache",
    time: "10:00 AM",
  },
  {
    id: "2",
    name: "Jane Smith",
    description: "Chest pain, fever",
    time: "11:00 AM",
  },
  {
    id: "3",
    name: "Jane Smith",
    description: "Chest pain, fever",
    time: "11:00 AM",
  },
  {
    id: "4",
    name: "Jane Smith",
    description: "Chest pain, fever",
    time: "11:00 AM",
  },
  // add more data as needed
];
function Item({ name, description, time }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}
export default function Patient({ route }) {
  console.log(route.params.reference);
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <Item name={item.name} description={item.description} time={item.time} />
    </TouchableOpacity>
  );
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
                // yeach change krna hai
                // onPress={() => navigation.navigate("reference-main")}
                onPress={() => navigation.navigate("referred-by-me")}
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
            <View style={styles.container}>
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
                      fontWeight: "500",
                    }}
                  >
                    {route.params.reference.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 16,
                      textTransform: "uppercase",
                      color: "#515151",
                      marginVertical: 5,
                    }}
                  >
                    {/* {profile.designation} */}
                    +91 {route.params.reference.contact}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 14,
                      color: "#686868",
                      fontWeight: "bold",
                    }}
                  >
                    {/* {profile.location} */}
                    {route.params.reference.referredTo
                      ? route.params.reference.referredTo.name
                      : "Abhishek"}
                  </Text>
                </View>
              </View>
            </View>
            <ScrollView
              style={{
                marginTop: 30,
              }}
            >
              <View style={styles.box}>
                <Text style={styles.title}>
                  {route.params.reference.reason}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 13,
                    display: "flex",
                    alignItems: "center",
                    letterSpacing: -0.3,
                    color: "#686868",
                  }}
                >
                  1 hour ago
                </Text>
              </View>
            </ScrollView>
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
  container1: {
    marginHorizontal: 15,
  },
  item: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 15,
    elevation: 5,
  },
  itemContent: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    lineHeight: 19,
    color: "#67B8F7",
  },
  description: {
    color: "#586671",
    marginTop: 5,
  },
  time: {
    color: "#586671",
    fontSize: 12,
    alignSelf: "center",
  },
  box: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  title: {
    height: 20,
    fontSize: 16,
    lineHeight: 19,
    color: "#67B8F7",
    fontWeight: "bold",
    marginBottom: 3,
  },

  referButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    backgroundColor: "#67B8F7",
    boxShadow: "0px 6px 14px rgba(108, 184, 241, 0.16)",
    borderRadius: 11.78,
    marginHorizontal: 20,
  },
});
