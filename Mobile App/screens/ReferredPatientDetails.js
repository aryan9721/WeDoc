import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, ListItem, Rating } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native";

const doctors = [
  {
    name: "Dr. John Doe",
    image: require("../assets/carousel1.png"),
    phone: "555-1234",
    rating: 4.5,
  },
  {
    name: "Dr. Jane Smith",
    image: require("../assets/carousel2.png"),
    phone: "555-5678",
    rating: 4.9,
  },

  // Add more doctors here...
];

const ReferredPatientDetails = ({ item }) => {
  return (
    <View>
      <ListItem style={styles.listItem}>
        <Avatar source={item.image} rounded />
        <ListItem.Content style={styles.listItemContent}>
          <ListItem.Title style={styles.doctorName}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={styles.doctorPhone}>
            {item.phone}
          </ListItem.Subtitle>
          <Rating
            imageSize={20}
            readonly
            startingValue={item.rating}
            style={styles.doctorRating}
          />
        </ListItem.Content>
        <FontAwesome name="chevron-right" size={20} style={styles.chevron} />
      </ListItem>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={doctors}
        renderItem={ReferredPatientDetails}
        keyExtractor={(item) => item.name}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 10,
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  listItemContent: {
    flex: 1,
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  doctorPhone: {
    fontSize: 16,
    color: "#999",
  },
  doctorRating: {
    marginTop: 5,
  },
  chevron: {
    color: "#999",
  },
});
