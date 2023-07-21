import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.4;

export default function Cards() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("events")}
          >
            <Image
              source={require("../assets/evetnt.png")}
              resizeMode="contain"
              style={styles.cardIcon}
            />
            <Text style={styles.cardText}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("gallery")}
          >
            <Image
              source={require("../assets/Gallery.png")}
              resizeMode="contain"
              style={styles.cardIcon}
            />
            <Text style={styles.cardText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("career")}
          >
            <Image
              source={require("../assets/careeer1.png")}
              resizeMode="contain"
              style={styles.cardIcon}
            />
            <Text style={styles.cardText}>Career</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("cme")}
          >
            <Image
              source={require("../assets/cme1.png")}
              resizeMode="contain"
              style={styles.cardIcon}
            />
            <Text style={styles.cardText}>CME</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: 153,
    height: 103,
    borderRadius: 11.78,
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundBlendMode: "soft-light",
    shadowColor: "rgba(108, 184, 241, 0.16)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 14,
  },
  cardIcon: {
    width: CARD_WIDTH * 0.3,
    height: CARD_WIDTH * 0.3,
    marginBottom: CARD_WIDTH * 0.05,
  },
  cardText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    textAlign: "center",
  },
});
