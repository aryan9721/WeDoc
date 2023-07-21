import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import useApiKeyStore from "./store";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const BACKEND_URL = "http://170.187.254.215:4000";

export default function Cme() {
  const navigation = useNavigation();
  const [cme, setCme] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [sortingOrder, setSortingOrder] = useState("asc"); // Add state for sorting order

  // Sort events based on the startDateTime property
  const sortCme = () => {
    const sortedCme = [...events].sort((a, b) => {
      const dateA = new Date(a.startDateTime);
      const dateB = new Date(b.startDateTime);
      if (sortingOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setCme(sortedCme);
    setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    console.log(cme[0]);
  }, [cme]);

  const apiKey = useApiKeyStore((state) => state.apiKey);
  const x_api_key = apiKey;

  const fetch_cme = async () => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", x_api_key);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/cme`, requestOptions);
      const response = await res.json();
      console.log(response);
      setCme(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_cme();
  }, []);

  const image4 = {
    uri: "https://images.unsplash.com/photo-1536064479547-7ee40b74b807?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTZ8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60",
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetch_cme()
      .then(() => {
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.error("Error refreshing cme:", error);
        setIsRefreshing(false);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView
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
      >
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
                  <Icon name="chevron-left" size={24} color="#67B8F7" />
                  All Cmes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("cme-calender")}
              >
                <Image
                  source={require("../assets/calendar.png")}
                  style={{
                    width: 28,
                    height: 30,
                    left: 60,
                    top: 6,
                    backgroundColor: "#F0F1F4",
                    borderRadius: 4,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={sortCme}>
                <Image
                  source={require("../assets/Sorting.png")}
                  style={{
                    width: 20,
                    height: 15,
                    left: -5,
                    top: 12,
                    backgroundColor: "#F0F1F4",
                    borderRadius: 4,
                  }}
                />
              </TouchableOpacity>
            </View>
            {cme.map((cme, id) => (
              <TouchableOpacity
                key={id}
                onPress={() => navigation.navigate("cme-description", { cme })}
                style={styles.welcome}
              >
                <View
                  style={{
                    overflow: "hidden",
                    borderRadius: 11.78,
                    borderWidth: 3,
                    borderColor: "#67B8F7",
                  }}
                >
                  <Card>
                    <ImageBackground
                      source={{ uri: `${BACKEND_URL}/${cme.coverImg}` }}
                      resizeMode="cover"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 11.78,
                      }}
                    >
                      {/* top-right to show only date */}
                      {/* <Text style={styles.text}>
                      {new Date(cme.startDateTime).toLocaleDateString()}
                    </Text> */}

                      <View style={styles.text}>
                        <Text>
                          {new Date(cme.startDateTime).toLocaleString()}
                        </Text>
                      </View>

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
                        {cme.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          lineHeight: 16,
                          color: "#06080A",
                          ...styles.text2,
                        }}
                      >
                        {cme.location}
                      </Text>
                      {/* bottom-right */}
                      <View
                        style={{
                          borderRadius: 5,
                          ...styles.text3,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                          }}
                        >
                          &#10003;
                        </Text>
                      </View>
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
                <View>
                  <Text style={styles.welcome}> </Text>
                </View>
              </TouchableOpacity>
            ))}
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
    width: windowWidth - 10,
  },
  image: {
    position: "relative",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: "#67B8F7",
    borderRadius: 5,
    color: "white",
  },
  text1: {
    position: "absolute",
    bottom: 40,
    left: 10,
  },
  text2: {
    position: "absolute",
    bottom: 20,
    left: 10,
  },
  text3: {
    position: "absolute",
    bottom: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#67B8F7",
    borderRadius: 5,
  },
});
