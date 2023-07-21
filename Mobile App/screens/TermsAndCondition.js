import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
export default function TermsAndCondition() {
  const navigation = useNavigation();
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://your-api-endpoint.com/data");
  //       const json = await response.json();
  //       setData(json);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.textContainer}>
          <TouchableOpacity
            style={{
              marginBottom: 20,
            }}
            onPress={() => navigation.navigate("entry")}
          >
            <Text style={styles.title}>
              {" "}
              <Icon name="chevron-left" size={24} color="#67B8F7" />
              Terms & Conditions
            </Text>
          </TouchableOpacity>

          {/* {data.map((item, index) => ( */}
          {/* <Text key={index} style={styles.paragraph}> */}
          <Text style={styles.paragraph}>
            {/* {item.text} */}
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Duis eu nisi ac ipsum pharetra vestibulum.
            Suspendisse eget massa felis. Mauris vestibulum posuere quam vitae
            vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eget ultricies odio, ac consequat libero. Sed venenatis, est
            eget pellentesque fringilla, augue eros gravida nisi, sit amet
            efficitur lacus urna id tortor. Nulla id odio nisi. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Duis eu nisi ac ipsum pharetra vestibulum.
            Suspendisse eget massa felis. Mauris vestibulum posuere quam vitae
            vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eget ultricies odio, ac consequat libero. Sed venenatis, est
            eget pellentesque fringilla, augue eros gravida nisi, sit amet
            efficitur lacus urna id tortor. Nulla id odio nisi. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Duis eu nisi ac ipsum pharetra vestibulum.
            Suspendisse eget massa felis. Mauris vestibulum posuere quam vitae
            vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eget ultricies odio, ac consequat libero. Sed venenatis, est
            eget pellentesque fringilla, augue eros gravida nisi, sit amet
            efficitur lacus urna id tortor. Nulla id odio nisi. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Duis eu nisi ac ipsum pharetra vestibulum.
            Suspendisse eget massa felis. Mauris vestibulum posuere quam vitae
            vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eget ultricies odio, ac consequat libero. Sed venenatis, est
            eget pellentesque fringilla, augue eros gravida nisi, sit amet
            efficitur lacus urna id tortor. Nulla id odio nisi. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Duis eu nisi ac ipsum pharetra vestibulum.
            Suspendisse eget massa felis. Mauris vestibulum posuere quam vitae
            vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eget ultricies odio, ac consequat libero. Sed venenatis, est
            eget pellentesque fringilla, augue eros gravida nisi, sit amet
            efficitur lacus urna id tortor. Nulla id odio nisi. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Duis eu nisi ac ipsum pharetra vestibulum.
            Suspendisse eget massa felis. Mauris vestibulum posuere quam vitae
            vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed eget ultricies odio, ac consequat libero. Sed venenatis, est
            eget pellentesque fringilla, augue eros gravida nisi, sit amet
            efficitur lacus urna id tortor. Nulla id odio nisi.{" "}
          </Text>
          {/* ))} */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    padding: 20,
  },
  textContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
});
