import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const TopStories = ({ title, description, image }) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);

  const handleReadMore = () => {
    setExpanded(!expanded);
  };
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: "https://placeimg.com/640/480/animals" }}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {expanded ? (
          <ScrollView style={styles.scrollView}>
            <Text style={styles.description}>{description}</Text>
          </ScrollView>
        ) : (
          <Text numberOfLines={2} style={styles.description}>
            {description}
          </Text>
        )}
        <TouchableOpacity onPress={handleReadMore}>
          <Text style={styles.readmore}>
            {expanded ? "Read Less" : "Read More"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TopStoriesPage = () => {
  let BACKEND_URL = process.env.BACKEND_URL ?? "http://170.187.254.215:4000";
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/stories`)
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={{
        flex: 1,
        background:
          "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
      }}
    >
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          {stories.map((story, index) => (
            <TopStories
              key={index}
              title={story.title}
              description={story.description}
              image={story.image}
            />
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background:
      "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
    backgroundBlendMode: "soft-light",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.02)",
    borderRadius: 11.78,
    shadowColor: "rgba(108, 184, 241, 0.16)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 14,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    marginVertical: 0,
    marginHorizontal: 10,
    width: 336,
    height: 129,
    elevation: 3,
    backgroundColor: "#FFFFFF",
    backgroundBlendMode: "soft-light",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.02)",
    borderRadius: 11.78,
    shadowColor: "rgba(108, 184, 241, 0.16)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 14,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#999",
  },
  readmore: {
    fontSize: 12,
    lineHeight: 14,
    color: "#67B8F7",
    marginTop: 10,
  },
});

export default TopStoriesPage;
