import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import Carousel from "react-native-snap-carousel";

const FeaturedVideos = (dummy) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://170.187.254.215:4000/api/trending")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error(error));
  }, [dummy]);

  const renderVideo = ({ item }) => {
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: item.link }}
          style={styles.video}
          javaScriptEnabled={true}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={true}
        />
        <Text style={styles.title}>{item.description}</Text>
      </View>
    );
  };

  return (
    <Carousel
      data={videos}
      renderItem={renderVideo}
      sliderWidth={400}
      itemWidth={300}
      loop={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 180,
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: 10,
  },
  webView: {
    flex: 1,
  },
  title: {
    fontSize: 10,
    color: "#06080A",
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default FeaturedVideos;
