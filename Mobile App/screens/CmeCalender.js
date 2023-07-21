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
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
const format = (date = new Date()) => dateFns.format(date, "YYYY-MM-DD");

export default function CmeCalender() {
  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL)
    BACKEND_URL =
      "http://170.187.254.215:4000";
  const [events, setevents] = React.useState([]);
  const [dates, setdates] = React.useState({});

  useEffect(() => {
    console.log(events[0]);
  }, [events]);
  let x_api_key =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2UzYzg5ZGYxOTM1NTAwMTg4YTcxNjQiLCJpc1JlZnJlc2hUb2tlbiI6ZmFsc2UsImlhdCI6MTY3NzYwNDE2NywiZXhwIjoxNjc3ODYzMzY3fQ.Ccrb0ii0oeR67TZWgFblz6jtLWaovecrCQqzCHTGlIjj0VMprW60DUwGhrShKPsklXw5McyPOmZh87R17ROS88tDCvfcxbnK592TvIqdDStNIvufwvdsD--JFUqLZqSi8G_IJxSmeCKhccdi29heRboG_tZY9YZ8wuch0dO-8DXttdIDajIAbB9fUb9FnZKh0IWWss2kjhm1t6naINSWyhueobj53QYGA3j6rZnQtLHdMHe34TPnuycql7GvhoEIEhV61NMmnXE75-FL0WSXOtlVuLvXO8LgMwzcV5GXAaBzZEPxwrTIcy2KSIJmYze-0PI6hN1W1huKVnGtSPUplg";
  const fetch_events = async () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", x_api_key);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let res = await fetch(
      "http://170.187.254.215:4000/api/cme",
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
            <TouchableOpacity onPress={() => navigation.navigate("cme")}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 10,
                }}
              >
                <Icon name="chevron-left" size={24} color="#67B8F7" /> Cme
                Calendar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("cme")}>
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
