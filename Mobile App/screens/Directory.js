import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import axios from "axios";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import { SectionList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // import Font Awesome icons

const Directory = () => {
  const navigation = useNavigation();
  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL) BACKEND_URL = "http://170.187.254.215:4000";
  const [doctorList, setDoctorList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [associations, setAssociations] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false); // add state for dropdown visibility
  const [selectedAssociation, setSelectedAssociation] = useState("");
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const [alphabetSections, setAlphabetSections] = useState([]);
  const getAssociation = (arr, emailId) => {
    if (!arr) return "Default Name";
    console.log(emailId);
    let asso = arr.find((_association) => _association._id === emailId);
    return asso && asso.name ? asso.name : "Default Name";
  };
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/doctor`)
      .then((response) => {
        setDoctorList(response.data);
        const alphabetSections = [];
        for (let i = 65; i <= 90; i++) {
          const letter = String.fromCharCode(i);
          const doctorsStartingWithLetter = response.data.filter(
            (doctor) => doctor.name[0].toUpperCase() === letter
          );
          if (doctorsStartingWithLetter.length > 0) {
            alphabetSections.push({
              id: doctorsStartingWithLetter[0].id,
              title: letter,
              data: doctorsStartingWithLetter,
            });
          }
        }
        setAlphabetSections(alphabetSections);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/association`)
      .then((response) => response.json())
      .then((data) => setAssociations(data))
      .catch((error) => console.log(error));
  }, []);

  const handlePress = (association) => {
    setSelectedAssociation(association);
    setDropdownVisible(false); // hide dropdown after selecting an option
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    const filteredList = doctorList.filter((doctor) => {
      const doctorName = doctor.name.toLowerCase();
      const associationName = getAssociation(
        associations,
        doctor.association
      ).toLowerCase();
      const searchTextLower = text.toLowerCase();
      return (
        doctorName.includes(searchTextLower) ||
        associationName.includes(searchTextLower)
      );
    });

    const alphabetSections = [];
    let sectionId = 0;
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const doctorsStartingWithLetter = filteredList.filter(
        (doctor) => doctor.name[0].toUpperCase() === letter
      );
      if (doctorsStartingWithLetter.length > 0) {
        alphabetSections.push({
          id: sectionId++,
          title: letter,
          data: doctorsStartingWithLetter,
        });
      }
    }

    setAlphabetSections(alphabetSections);
  };

  const handleItemClick = (item) => {
    console.log(item);
    navigation?.navigate?.("references", { reference: item });
  };

  const handleVoiceSearch = async () => {
    try {
      setVoiceSearchActive(true); // set voiceSearchActive to true
      const { transcription } = await Speech.recognizeAsync({
        onSpeechStart: () => {
          setVoiceSearchActive(true); // set voiceSearchActive to true on speech start
        },
        onSpeechEnd: () => {
          setVoiceSearchActive(false); // set voiceSearchActive to false on speech end
        },
      });
      handleSearchTextChange(transcription);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={{
        flex: 1,
        backgroundColor:
          "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text
              style={{
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: 24,
                lineHeight: 28,
                color: "#06080A",
                marginLeft: 10,
              }}
            >
              <Text> </Text>

              <Text> Directory </Text>
            </Text>
          </TouchableOpacity>
          <View style={styles.dropdown}>
            {/* <TouchableOpacity style={styles.dropbtn} onPress={toggleDropdown}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor:
                    "linear-gradient(280.22deg, rgba(239, 239, 239, 0.1) 2.41%, rgba(239, 239, 239, 0.7) 100%)",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                  // elevation: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 16,
                    display: "flex",
                    alignItems: "center",
                    letterSpacing: -0.3,
                    color: "#67B8F7",
                  }}
                >
                  {selectedAssociation || "Association "}
                </Text>
                <FontAwesome
                  name={dropdownVisible ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#67B8F7"
                />
              </View>
            </TouchableOpacity> */}
            {dropdownVisible ? ( // render options only if dropdown is visible
              <View style={styles.dropdownContent}>
                {associations.map((association) => (
                  <TouchableOpacity
                    key={association.id}
                    style={styles.dropdownOption}
                    onPress={() => handlePress(association.name)}
                  >
                    <Text>{association.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}

            {/* Add null as fallback for render function */}
          </View>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            value={searchText}
            onChangeText={handleSearchTextChange}
            style={styles.input}
            placeholder="Search by doctor name, association"
          />
          <TouchableOpacity onPress={handleVoiceSearch}>
            <Ionicons
              name="mic-outline"
              size={24}
              color="#686868"
              style={styles.micIcon}
            />
          </TouchableOpacity>
        </View>

        <SectionList
          sections={alphabetSections}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          } // Update keyExtractor function
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleItemClick(item)}
              key={item.id}
              style={styles.doctorCard}
            >
              <View style={styles.doctorImageContainer}>
                <Image
                  source={require("../assets/carousel1.png")}
                  style={styles.doctorImage}
                />
              </View>
              <View>
                <Text style={styles.doctorName}>{item.name}</Text>
                <Text style={styles.doctorContact}>{item.contact}</Text>
                <Text style={styles.doctorAssociation}>
                  {getAssociation(associations, item.association)}
                </Text>
                <Text style={styles.doctorSpecialization}>
                  {item.specialization}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(108, 184, 241, 0.16)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 26,
    shadowRadius: 14,
    // elevation: 2,
    shadowOffset: { width: 0, height: 6 },
    borderRadius: 11.78,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  dropdown: {
    position: "relative",
  },
  dropbtn: {
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    flexDirection: "row", // add flex direction to align icon to the right
    justifyContent: "space-between", // add justify content to space out text and icon
    alignItems: "center", // add align items to center icon vertically
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    zIndex: 5,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  dropdownOption: {
    padding: 10,
    // borderWidth: 1,
    zIndex: 100,
  },
  micIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  doctorImageContainer: {
    width: 44,
    height: 44,
    borderRadius: 32,
    overflow: "hidden",
    marginRight: 15,
  },
  doctorImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  doctorList: {
    flex: 1,
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    marginHorizontal: 1,
    marginVertical: 0,
    // backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // elevation: 4,
    borderTopWidth: 0.5,
    borderColor: "grey",
  },
  doctorName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  doctorContact: {
    color: "gray",
  },
  doctorSpecialization: {
    color: "#555",
  },
  alphabetSidebar: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
  },
  alphabetButton: {
    paddingHorizontal: 10,
  },
  alphabetButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "#f2f2f2",
  },
  sectionHeaderText: {
    color: "#333",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default Directory;
