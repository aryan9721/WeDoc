import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const image = [
  "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTl8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60",
  "https://images.unsplash.com/photo-1611689102192-1f6e0e52df0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60",
  "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxkb2N0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60",
  "https://images.unsplash.com/photo-1624133172024-87559cb5eeb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE0fHxkb2N0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60",
];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CarouselEvent = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const [imgActive, setImgActive] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("events")}
      >
        <Icon name="chevron-left" size={24} color="#67B8F7" />
      </TouchableOpacity>
      <View style={styles.wrap}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {image.map((e, index) => (
            <ImageBackground
              key={e}
              resizeMode="stretch"
              style={styles.wrap}
              source={{ uri: e }}
            >
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={toggleFavorite}>
                  <Icon
                    name="favorite"
                    size={25}
                    color={isFavorite ? "red" : "#fff"}
                  />
                </TouchableOpacity>
                {/* <Text style={styles.iconText}>
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Text> */}
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {image.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                imgActive === index && styles.activeDot,
              ]}
              onPress={() => setImgActive(index)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    padding: 20,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 15,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10,
    borderRadius: 10,
  },
  iconText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  pagination: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#67B8F7",
  },
});

export default CarouselEvent;
