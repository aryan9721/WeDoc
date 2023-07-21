import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const data = [
  {
    id: "1",
    title: "Abhishek Johri",
    message: "This is notification 1.",
    image:
      "https://images.unsplash.com/photo-1551976701-fe64fa693864?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fG1lbWJlcnNoaXB8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "2",
    title: "Sailee 1 ",
    message: "This is notification 2.",
    image:
      "https://images.unsplash.com/photo-1593234270607-66cc705a0aaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fG1lbWJlcnNoaXB8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "3",
    title: "Amit 1",
    message: "This is notification 3.",
    image:
      "https://images.unsplash.com/photo-1624686713594-21157487be91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fG1lbWJlcnNoaXB8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "4",
    title: "Abhishek Johri",
    message: "This is notification 1.",
    image:
      "https://images.unsplash.com/photo-1497024546156-4c644b3729c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fG1lbWJlcnNoaXB8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "5",
    title: "Sailee 1 ",
    message: "This is notification 2.",
    image:
      "https://images.unsplash.com/photo-1639278028489-f9e2c09c611c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fG1lbWJlcnNoaXB8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "6",
    title: "Amit 1",
    message: "This is notification 3.",
    image: "https://picsum.photos/50",
  },
  {
    id: "7",
    title: "Abhishek Johri",
    message: "This is notification 1.",
    image: "https://picsum.photos/50",
  },
  {
    id: "8",
    title: "Sailee 1 ",
    message: "This is notification 2.",
    image: "https://picsum.photos/50",
  },
  {
    id: "9",
    title: "Amit 1",
    message: "This is notification 3.",
    image: "https://picsum.photos/50",
  },
];

export default function Notification() {
  const [notifications, setNotifications] = useState(data);

  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  const handleDeleteAllNotifications = () => {
    setNotifications([]);
  };

  const renderNotificationItem = ({ item }) => {
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
          <SafeAreaView>
            <View style={styles.notificationContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.notificationImage}
              />
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>
                  <FontAwesomeIcon name="home" size={12} color="gray" /> 3 hrs
                  ago
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    );
  };

  const renderHiddenItem = ({ item }) => {
    return (
      <View style={styles.deleteButtonContainer}>
        <Text
          style={styles.deleteButtonText}
          onPress={() => handleDeleteNotification(item.id)}
        >
          Delete
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        <TouchableOpacity
          onPress={handleDeleteAllNotifications}
          style={styles.clearAllButton}
        >
          <Text
            style={{
              fontSize: 14,
              lineHeight: 16,
              alignSelf: "center", // equivalent to align-items: center
              letterSpacing: -0.3,
              color: "#67B8F7",
            }}
          >
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      <SwipeListView
        data={notifications}
        renderItem={renderNotificationItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        disableRightSwipe
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background:
      "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",

    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  clearAllButton: {
    width: 77,
    height: 25,
    left: 2,
    top: 2,
    padding: 5,
    backgroundColor: "rgba(239, 239, 239, 0.7)",
    borderRadius: 8,
    shadowColor: "#67B8F7",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3, // For Android
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: "gray",
    alignItems: "center",
    flexDirection: "row",
  },
  deleteButtonContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
