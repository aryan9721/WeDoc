import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Calendar } from "react-native-calendars";
import dateFns from "date-fns";
import useApiKeyStore from './store';

import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
const format = (date = new Date()) => dateFns.format(date, "YYYY-MM-DD");

export default function Calender() {
  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL)
    BACKEND_URL =
      "http://170.187.254.215:4000";
  const [events, setevents] = React.useState([]);
  const [dates, setdates] = React.useState({});

  useEffect(() => {
    console.log(events[0]);
  }, [events]);
  const apiKey = useApiKeyStore((state) => state.apiKey);
  let x_api_key = apiKey;
  const fetch_events = async () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", x_api_key);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let res = await fetch(
      "http://170.187.254.215:4000/api/event",
      requestOptions
    );
    let response = await res.json();
    console.log(response);
    setevents(response);
  };
  useEffect(() => {
    fetch_events();
  }, []);
  useEffect(() => {
    console.log(dates);
  }, [dates]);
  useEffect(() => {
    let dates = {};
    for (let i = 0; i < events.length; i++) {
      let date = events[i].startDateTime
        ? events[i].startDateTime
        : "2023-03-11T18:30:00.000Z";
      date = date.split("T")[0];
      dates[date] = { selected: true, marked: true, selectedColor: "blue" };
    }
    setdates(dates);
  }, [events]);
  const navigation = useNavigation();
  const baseDate = new Date(2023, 2, 19);
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "rgba(103, 184, 247, 0.0576)",
          backgroundImage:
            "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
          backdropFilter: "blur(5.5px)",
        }}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("events")}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 10,
                }}
              >
                <Icon name="chevron-left" size={24} color="#67B8F7" /> Events
                Calendar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("events")}>
              <View
                style={{
                  width: 29,
                  height: 30,
                  backgroundColor: "#F0F1F4",
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    marginLeft: 7,
                    color: "#67B8F7",
                  }}
                >
                  ...
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Calendar markedDates={dates} />
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    shadowColor: "#6CB8F1",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    borderRadius: 11.78,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 18,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
});
