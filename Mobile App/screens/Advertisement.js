import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Advertisement() {
  const [adData, setAdData] = useState([]);

  useEffect(() => {
    fetchAdData();
  }, []);

  const fetchAdData = async () => {
    try {
      const response = await fetch(
        "http://170.187.254.215:4000/api/advertisment"
      );
      const data = await response.json();
      setAdData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const staticData = [
    {
      image: "https://www.healinghandsclinic.co.in/images/logo.png",
      description: "Advertisement here",
      link: "https://www.healinghandsclinic.co.in",
    },
    {
      image: "https://www.innothoughts.com/images/inno-logo.png",
      description: "Click for more",
      link: "https://www.innothoughts.com/",
    },
    {
      image: "https://www.healinghandsclinic.co.in/images/logo.png",
      description: "Wanna Join group",
      link: "https://www.healinghandsclinic.co.in",
    },
  ];

  const handleImagePress = (link) => {
    Linking.openURL(link).catch((error) =>
      console.error("Error opening URL:", error)
    );
  };

  const renderAdItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleImagePress(item.link)}
        style={styles.carouselItemContainer}
      >
        <View style={styles.carouselContentContainer}>
          <Image source={{ uri: item.image }} style={styles.carouselImage} />
          <View
            style={{
              width: 60,
            }}
          >
            {""}
          </View>
          <Text style={styles.carouselText}>{item.description}</Text>
          <View style={styles.adIconContainer}>
            <Icon name="bullhorn" size={15} color="#ffffff" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Carousel
          data={staticData}
          renderItem={renderAdItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width - 20}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: "#F5FCFF",
    padding: 2,
  },
  carouselItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  carouselImage: {
    width: 120,
    height: 30,
    marginRight: 10,
  },
  carouselText: {
    flex: 1,
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  adIconContainer: {
    backgroundColor: "#67B8F7",
    borderRadius: 15,
    padding: 5,
  },
});
