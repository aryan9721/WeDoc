import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  RefreshControl,
} from "react-native";
import Cards from "./Cards";
import CarouselCards from "../CarouselCards";
import FeaturedVideos from "../components/FeaturedVideos";
import TopStories from "../components/TopStories";
import Trending from "./Trending";
import Advertisement from "./Advertisement";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false); // Add state for refreshing

  const fetchHomeData = async () => {
    // Add your logic to fetch home data
    // Example: Fetching data from an API
    // ...

    // Simulate delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Set refreshing status to false
    setIsRefreshing(false);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchHomeData();
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/Background.png")}
        style={{
          flex: 1,
          backgroundColor:
            "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.5}
          >
            <Text style={styles.logo}>WeDoc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("notification")}
            style={{ marginRight: 5 }}
          >
            <Image
              source={require("../assets/Notification.png")}
              resizeMode="contain"
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          <View>
            <CarouselCards />
          </View>
          <View>
            <Cards />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Featured Videos</Text>
            <FeaturedVideos />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Top Stories</Text>
            <TopStories />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Trending</Text>
            <Trending />
          </View>
        </ScrollView>
        <View style={styles.advertisementContainer}>
          <Advertisement />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  logo: {
    color: "#67B8F7",
    fontSize: 32,
    fontWeight: "bold",
  },
  notificationIcon: {
    width: 48,
    height: 48,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  advertisementContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 5,
    paddingBottom: 0,
  },
});
