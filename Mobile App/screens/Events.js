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
  FlatList,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import useApiKeyStore from "./store";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const BACKEND_URL = "http://170.187.254.215:4000";

const fetchEvents = async (apiKey, setEvents) => {
  var myHeaders = new Headers();

  myHeaders.append("x-api-key", apiKey);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  let res = await fetch(`${BACKEND_URL}/api/event`, requestOptions);
  let response = await res.json();
  console.log("res", response);
  setEvents(response);
};

const EventItem = ({ event, onPress }) => {
  const formattedDate = new Date(event.startDateTime).toLocaleDateString();

  return (
    <TouchableOpacity onPress={onPress} style={styles.eventItem}>
      <View style={styles.eventItemImageWrapper}>
        <Image
          source={{ uri: `${BACKEND_URL}/${event.coverImg}` }}
          resizeMode="contain" // Set resizeMode to "contain"
          style={styles.eventItemImage}
        />
        <View style={styles.eventItemDate}>
          <Text style={styles.eventItemDateText}>{formattedDate}</Text>
        </View>
      </View>
      <View style={styles.eventItemContent}>
        <Text style={styles.eventItemTitle}>{event.name}</Text>
        <Text style={styles.eventItemLocation}>{event.location}</Text>
        <View style={styles.eventItemStatus}>
          <Text style={styles.eventItemStatusText}>&#10003;</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Events() {
  const apiKey = useApiKeyStore((state) => state.apiKey);
  const navigation = useNavigation();
  const [events, setEvents] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [sortingOrder, setSortingOrder] = useState("asc"); // Add state for sorting order

  // Sort events based on the startDateTime property
  const sortEvents = () => {
    const sortedEvents = [...events].sort((a, b) => {
      const dateA = new Date(a.startDateTime);
      const dateB = new Date(b.startDateTime);
      if (sortingOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setEvents(sortedEvents);
    setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchEvents(apiKey, setEvents)
      .then(() => {
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.error("Error refreshing events:", error);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchEvents(apiKey, setEvents);
  }, []);

  const renderItem = ({ item }) => (
    <EventItem
      event={item}
      onPress={() => navigation.navigate("event-description", { event: item })}
    />
  );

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.headerText}>
              <Icon name="chevron-left" size={24} color="#67B8F7" />
              All Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("event-calender")}
          >
            <Image
              source={require("../assets/calendar.png")}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={sortEvents}>
            <Image
              source={require("../assets/Sorting.png")}
              style={styles.sortingIcon}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : Math.random().toString()
          }
          contentContainerStyle={styles.flatListContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background:
      "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
  },
  safeArea: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    position: "relative",
    left: 0,
    right: "58.7%",
    top: 8,
    bottom: "6.67%",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 28,
    color: "#06080A",
  },
  calendarIcon: {
    width: 29,
    height: 30,
    left: 53,
    top: 5,
    backgroundColor: "#F0F1F4",
    borderRadius: 4,
  },
  sortingIcon: {
    width: 25,
    height: 20,
    left: -5,
    top: 12,
    backgroundColor: "#F0F1F4",
    borderRadius: 4,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  eventItem: {
    overflow: "hidden",
    borderRadius: 11.78,
    borderWidth: 3,
    borderColor: "#67B8F7",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  eventItemImageWrapper: {
    position: "relative",
    borderRadius: 11.78,
    backgroundColor: "rgba(255, 255, 255, 0.68)",
  },
  eventItemImage: {
    width: "100%",
    height: 150, // Adjust the height to your desired value
    borderRadius: 11.78,
  },
  eventItemDate: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: "#67B8F7",
    borderRadius: 5,
  },
  eventItemDateText: {
    color: "white",
  },
  eventItemContent: {
    padding: 10,
  },
  eventItemTitle: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 21,
    color: "#06080A",
  },
  eventItemLocation: {
    fontSize: 14,
    lineHeight: 16,
    color: "#06080A",
  },
  eventItemStatus: {
    position: "absolute",
    bottom: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#67B8F7",
    borderRadius: 5,
  },
  eventItemStatusText: {
    color: "white",
  },
});
