import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Calender from "../screens/Calender";
import Career from "../screens/Career";
import Cme from "../screens/Cme";
import Login from "../screens/Login";
import CmeCalender from "../screens/CmeCalender";
import CmeDescription from "../screens/CmeDescription";
import Directory from "../screens/Directory";
import EventDescription from "../screens/EventDescription";
import Events from "../screens/Events";
import Gallery from "../screens/Gallery";
import GalleryDescription from "../screens/GalleryDescription";
import Home from "../screens/Home";
import Membership from "../screens/Membership";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import QrPage from "../screens/QrPage";
import ReferenceMain from "../screens/ReferenceMain";
import References from "../screens/References";
import ReferredByMe from "../screens/ReferredByMe";
import ReferredPatientDetails from "../screens/ReferredPatientDetails";
import ReferredToMe from "../screens/ReferredToMe";
import OTPScreen from "../screens/OTPScreen";
import Checkout from "../screens/Checkout";
import GalleryCalender from "../screens/GalleryCalender";
import Entry from "../screens/Entry";
import TermsAndCondition from "../screens/TermsAndCondition";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import { Dimensions } from "react-native";
import Patient from "../screens/Patient";
const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        // top: -30,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#67B8F7",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const Tabs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottom}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              display: "none",
            },
          }}
        >
          <Tab.Screen
            name="profile-page"
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    // top: 10,
                  }}
                >
                  <Image
                    source={require("../assets/user.png")}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#67B8F7" : "#748c94",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#67B8F7" : "#748c94",
                      fontSize: 12,
                    }}
                  >
                    Profile
                  </Text>
                </View>
              ),
              headerShown: false, // Hide the header for this screen
            }}
          />

          <Tab.Screen
            name="directory"
            component={Directory}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    // top: 10,
                  }}
                >
                  <Image
                    source={require("../assets/directory.png")}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#67B8F7" : "#748c94",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#67B8F7" : "#748c94",
                      fontSize: 12,
                    }}
                  >
                    Directory
                  </Text>
                </View>
              ),
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabIconContainer, { marginBottom: 34 }]}>
                  <View
                    style={[
                      {
                        backgroundColor: focused ? "#67B8F7" : "#67B8F7",
                        borderRadius: 50,
                        width: 60,
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        shadowColor: "#B4D8FF",
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowOpacity: 0.8,
                        shadowRadius: 4,
                        elevation: 5,
                      },
                    ]}
                  >
                    <Image
                      source={require("../assets/homewhite.png")}
                      resizeMode="contain"
                      style={[styles.tabIcon, { tintColor: "#fff" }]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.tabText,
                      { color: focused ? "#67B8F7" : "#748c94" },
                    ]}
                  >
                    Home
                  </Text>
                </View>
              ),
              headerShown: false, // Hide the header for this screen
            }}
          />

          <Tab.Screen
            name="reference-main"
            component={ReferenceMain}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    // top: 10,
                  }}
                >
                  <Image
                    source={require("../assets/refer.png")}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#67B8F7" : "#748c94",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#67B8F7" : "#748c94",
                      fontSize: 12,
                    }}
                  >
                    References
                  </Text>
                </View>
              ),
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="membership"
            component={Membership}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    left: 6,
                    // top: 10,
                  }}
                >
                  <Image
                    source={require("../assets/crown.png")}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#67B8F7" : "#748c94",
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#67B8F7" : "#748c94",
                      fontSize: 12,
                    }}
                  >
                    Membership
                  </Text>
                </View>
              ),
              headerShown: false, // Hide the header for this screen
            }}
          />

          <Tab.Screen
            name="checkout"
            component={Checkout}
            options={{
              title: "career",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />

          <Tab.Screen
            name="events"
            component={Events}
            options={{
              title: "events",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="event-description"
            component={EventDescription}
            options={{
              title: "event-description",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="terms-and-condition"
            component={TermsAndCondition}
            options={{
              title: "terms-and-condition",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="privacy-policy"
            component={PrivacyPolicy}
            options={{
              title: "privacy-policy",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="cme"
            component={Cme}
            options={{
              title: "cme",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="cme-description"
            component={CmeDescription}
            options={{
              title: "cme-description",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="career"
            component={Career}
            options={{
              title: "career",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="event-calender"
            component={Calender}
            options={{
              title: "event-calender",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />

          <Tab.Screen
            name="gallery-calender"
            component={GalleryCalender}
            options={{
              title: "gallery-calender",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="cme-calender"
            component={CmeCalender}
            options={{
              title: "cme-calender",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="gallery"
            component={Gallery}
            options={{
              title: "gallery",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="gallery-description"
            component={GalleryDescription}
            options={{
              title: "gallery-description",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="notification"
            component={Notification}
            options={{
              title: "notification",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="qr-page"
            component={QrPage}
            options={{
              title: "qr-page",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="references"
            component={References}
            options={{
              title: "reference-main",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="referred-to-me"
            component={ReferredToMe}
            options={{
              title: "referred-to-me",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="patient"
            component={Patient}
            options={{
              title: "patient",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="referred-by-me"
            component={ReferredByMe}
            options={{
              title: "referred-by-me",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
          <Tab.Screen
            name="referred-patient-details"
            component={ReferredPatientDetails}
            options={{
              title: "referred-patient-details",
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown: false, // Hide the header for this screen
            }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
export default Tabs;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    // left: 6,
    // right: 20,
    zIndex: 1,
    backgroundColor: "#808080",
    borderRadius: 15,
    height: "100%",
    width: "100%",
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    // top: 10,
  },
  tabIcon: {
    width: 25,
    height: 25,
  },
  tabText: {
    color: "#748c94",
    fontSize: 12,
  },

  // Media queries
  "@media (max-width: 600px)": {
    bottom: {
      height: "50%",
      width: "90%",
    },
  },
  "@media (min-width: 600px) and (max-width: 900px)": {
    bottom: {
      height: "40%",
      width: "70%",
    },
  },
  "@media (min-width: 900px) and (max-width: 1200px)": {
    bottom: {
      height: "30%",
      width: "60%",
    },
  },
  "@media (min-width: 1200px)": {
    bottom: {
      height: "25%",
      width: "50%",
    },
  },
});
