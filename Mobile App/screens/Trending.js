import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";

const Trending = () => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    fetch("http://170.187.254.215:4000/api/video")
      .then((response) => response.json())
      .then((data) => {
        console.log("calling", data);
        setVideoData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderTextItem = ({ item }) => {
    if (!item) {
      return null;
    }

    return (
      <View style={Styles.carouselItem}>
        <Text style={Styles.company}>{item.company}</Text>
        <Text style={Styles.title}>{item.title}</Text>
        <Text style={Styles.description}>{item.description}</Text>
      </View>
    );
  };

  if (!videoData) {
    return null; // Add a loading state or placeholder if needed
  }

  return (
    <SafeAreaView>
      <View>
        {videoData && (
          <Card style={Styles.container}>
            <Card.Cover
              source={{
                uri: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
              }}
            />
          </Card>
        )}

        {videoData && videoData.length > 0 && (
          <View style={Styles.container}>
            <Text style={Styles.company}>
              {videoData[videoData.length - 1]?.company}
            </Text>
            <Text style={Styles.title}>
              {videoData[videoData.length - 1]?.title}
            </Text>
            <Text style={Styles.description}>
              {videoData[videoData.length - 1]?.description}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Trending;

const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    marginHorizontal: 37,
    marginVertical: "auto",
  },
  textContainer: {
    marginVertical: "5%",
    paddingHorizontal: "5%",
  },
  carouselItem: {
    alignItems: "center",
  },
  company: {
    fontSize: 20,
    color: "#90CAF9",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    marginTop: "5%",
  },
  description: {
    fontSize: 14,
    marginTop: "5%",
    color: "gray",
    paddingBottom: 70,
  },
});
