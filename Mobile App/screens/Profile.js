import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
  RefreshControl,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import useApiKeyStore from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile(dummy) {
  const apiKey = useApiKeyStore((state) => state.apiKey);
  const navigation = useNavigation();
  const [profile, setProfile] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false); // Add state for refreshing
  let { BACKEND_URL } = process.env;
  if (!BACKEND_URL) BACKEND_URL = "http://170.187.254.215:4000";
  let x_api_key = apiKey;

  const fetchProfile = async () => {
    // useEffect(() => {
    //   console.log('prop',profile);
    // }, [profile])

    setIsRefreshing(true); // Set refreshing status
    try {
      console.log("url", `${BACKEND_URL}/api/user/profile`);
      const response = await fetch(`${BACKEND_URL}/api/user/profile`, {
        headers: {
          "x-api-key": x_api_key,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        try {
          const { profileImageUrl, ...rest } = data;
          await AsyncStorage.setItem("profile", JSON.stringify(rest));
          console.log("Data saved successfully.", data);
        } catch (error) {
          console.log("Error saving data:", error);
        }
        setProfile(data);
      } else {
        console.error("Error fetching profile1:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsRefreshing(false); // Reset refreshing status
    }
  };

  const updateProfile = async () => {
    console.log("saving ", profile);
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": x_api_key,
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        const data = await response.json();
        try {
          const { profileImageUrl, ...rest } = profile;
          await AsyncStorage.setItem("profile", JSON.stringify(rest));
          console.log("Data saved successfully.", rest);
        } catch (error) {
          console.log("Error saving data:", error);
        }
        setProfile(data);
        // navigation.navigate("Home");
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [dummy]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      console.log("profileImage", result.assets[0].base64);
      setProfile({ ...profile, profileImageUrl: result.assets[0].base64 });
      // console.log({ ...profile, profileImageUrl: result.assets[0].base64 });
      // const formData = new FormData();
      // formData.append("image", {
      //   uri: result.assets[0].uri,
      //   name: "image.jpg",
      //   type: "image/jpeg",
      // });
      // console.log(formData)
      // var myHeaders = new Headers();
      // myHeaders.append("x-api-key", x_api_key);
      // try {
      //   const response = await fetch(`${BACKEND_URL}/api/user/profile`, {
      //     method: "PATCH",
      //     headers: myHeaders,
      //     body: formData,
      //     redirect: "follow",
      //   });

      //   if (response.ok) {
      //     console.log('Data saved successfully.', data);
      //     const data = await response.json();
      //     try {
      //       await AsyncStorage.setItem('profile', JSON.stringify(data));
      //       console.log('Data saved successfully.', data);
      //     } catch (error) {
      //       console.log('Error saving data:', error);
      //     }
      //     setProfile(data);
      //   } else {
      //     console.error("Error updating profile:", response.statusText);
      //   }
      // } catch (error) {
      //   console.error("Error updating profile:", error);
      // }
    }
    console.log("res", profile);
  };
  const handleEndReached = ({ distanceFromEnd }) => {
    if (distanceFromEnd === 0) {
      fetchProfile();
    }
  };

  const handleLogout = async () => {
    // Clear the cache and navigate to the entry screen
    await AsyncStorage.removeItem("profile");

    navigation.reset({
      index: 0,
      routes: [{ name: "entry" }],
    });
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchProfile}
            colors={["#67B8F7"]} // Customize the refresh indicator color
          />
        }
      >
        <ImageBackground
          source={require("../assets/Background.png")}
          style={{
            flex: 1,
            paddingBottom: 200,
            backgroundColor:
              "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
          }}
        >
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <View>
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
                    {" "}
                    My Profile
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => updateProfile()}>
                <View
                  style={{
                    backgroundColor: "rgba(239, 239, 239, 0.7)",
                    borderRadius: 8,
                    shadowColor: "#67B8F7",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 6,
                    elevation: 5,
                    overflow: "hidden",
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
                      padding: 5,
                    }}
                  >
                    Save{" "}
                    <Icon
                      name="check"
                      style={{
                        position: "absolute",
                        width: 12.69,
                        height: 9.26,
                        left: 344.66,
                        top: 66.37,
                      }}
                      color="#67B8F7"
                    />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.profileImageSection}>
              {/* <Image
                style={styles.profileImage}
                source={profile.profileImageUrl}
              /> */}
              <Image
                src={`data:image/png;base64,${profile.profileImageUrl}`}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.icon} onPress={pickImage}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: "white",
                  }}
                  source={require("../assets/Camera.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.profileSection}>
              <TextInput
                style={styles.profileInput}
                value={profile.name}
                placeholder="Name"
                onChangeText={(value) =>
                  setProfile({ ...profile, name: value })
                }
              />
            </View>
            <View style={styles.profileSection}>
              <TextInput
                style={styles.profileInput}
                placeholder="Contact No."
                onChangeText={(value) =>
                  setProfile({ ...profile, contact: value })
                }
                value={profile.contact}
              />
            </View>
            <View style={styles.profileSection}>
              <TextInput
                style={styles.profileInput}
                value={profile.email}
                placeholder="Email address"
                onChangeText={(value) =>
                  setProfile({ ...profile, email: value })
                }
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                ...styles.profileSection,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 50,
                  marginHorizontal: 10, // Add margin here
                }}
              >
                <TextInput
                  style={styles.profileInput}
                  value={profile.dob}
                  placeholder="Date of birth"
                  onChangeText={(value) =>
                    setProfile({ ...profile, dob: value })
                  }
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 70,
                  marginHorizontal: 10, // Add margin here
                }}
              >
                <TextInput
                  style={styles.profileInput}
                  placeholder="Blood Group"
                  onChangeText={(value) =>
                    setProfile({ ...profile, blood_group: value })
                  }
                  value={profile.blood_group}
                />
              </View>
            </View>

            <View style={styles.profileSection}>
              <TextInput
                style={styles.profileInput}
                placeholder="Country"
                onChangeText={(value) =>
                  setProfile({ ...profile, country: value })
                }
                value={profile.country}
              />
            </View>
            <View style={styles.profileSection}>
              <TextInput
                style={styles.profileInput}
                placeholder="State"
                onChangeText={(value) =>
                  setProfile({ ...profile, state: value })
                }
                value={profile.state}
              />
            </View>
            <View style={styles.profileSection}>
              <TextInput
                style={styles.profileInput}
                placeholder="City"
                onChangeText={(value) =>
                  setProfile({ ...profile, city: value })
                }
                value={profile.city}
              />
            </View>
            {/* <TouchableOpacity
            style={styles.updateButton}
            onPress={() => updateProfile()}
          >
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity> */}
            <View style={styles.logoutButtonContainer}>
              <Button title="Logout" onPress={handleLogout} />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImageSection: {
    position: "relative",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 115.07,
    height: 118,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#67B8F7",
  },

  icon: {
    position: "absolute",
    bottom: 7,
    right: 140,
  },
  profileSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 11.78,
    marginHorizontal: 15,
    marginVertical: 7,
    padding: 12,
  },
  profileLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileInput: {
    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
    marginVertical: 20,
  },
  updateButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    alignSelf: "center",
  },
  logoutButtonContainer: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
