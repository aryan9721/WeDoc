import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Carousel, Pagination } from "react-native-snap-carousel";
import useApiKeyStore from "./screens/store";
import { setDate } from "date-fns";
const BACKEND_URL = "http://170.187.254.215:4000";

const { width } = Dimensions.get("window");
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
  var d = [];
  response.forEach((element) => {
    d.push({
      title: element.name,
      subtitle: element.location,
      date:
        new Date(element.startDateTime).getDate() +
        " " +
        new Date(element.startDateTime).toLocaleString("default", {
          month: "long",
        }),
      image: require("./assets/carousel3.png"),
    });
  });
  // setData(d);
  setEvents(d);
};

export default function CarouselCards() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const apiKey = useApiKeyStore((state) => state.apiKey);
  const [events, setEvents] = React.useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false); // Add state for refreshing

  const fetchCarouselData = async () => {
    setIsRefreshing(true);
    await fetchEvents(apiKey, setData);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        source={item.image}
        resizeMode="cover"
        style={{
          borderRadius: 11.78,
          overflow: "hidden",
          borderWidth: 2,
          borderColor: "#67B8F7",
          marginHorizontal: 10,
          height: 200,
        }}
      >
        <View style={styles.textContainer}>
          <View style={styles.date}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              {item.date}
            </Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✓</Text>
          </View>
        </View>
      </ImageBackground>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={fetchCarouselData}
        />
      }
    >
      <View style={styles.container}>
        <Carousel
          layout={"default"}
          autoplay={true}
          data={data}
          sliderWidth={width}
          itemWidth={width - 20}
          loop={true}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />

        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeIndex}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.activeDot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
  },
  card: {
    borderRadius: 11.78,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#67B8F7",
    marginHorizontal: 10,
    height: 200,
  },

  textContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 5,
    height: 200,
    width: "100%",
  },
  date: {
    position: "absolute",
    left: "86.72%",
    right: "3.11%",
    top: "4.98%",
    bottom: "77.11%",
    backgroundColor: "#FFFFFF",
    borderRadius: 9.78,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.14,
    shadowRadius: 14,
  },

  title: {
    position: "absolute",
    bottom: 35,
    left: 10,
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 21,
    color: "#06080A",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 16,
    color: "#06080A",
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#67B8F7",
    padding: 5,
    borderRadius: 5,
  },
  icon: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  paginationContainer: {
    paddingTop: 8,
    paddingBottom: 0,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#67B8F7",
  },
  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D8D8D8",
  },
});
