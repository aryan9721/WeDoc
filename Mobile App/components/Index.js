import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import Tabs from "../navigation/tabs";
import OTPScreen from "../screens/OTPScreen";
import Login from "../screens/Login";
import Entry from "../screens/Entry";

const Stack = createStackNavigator();

function ProfilePage() {
  const navigation = useNavigation();

  // State variable to track whether the user is on the ProfilePage
  const [isProfilePage, setIsProfilePage] = useState(true);

  // Function to handle the back button press
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Subscribe to the hardware back button event when the component mounts
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Prevent the default back button behavior if the user is on the ProfilePage
        // if (isProfilePage) {
        return true; // Returning true prevents the default back button behavior
        // }
        return false; // Allow the default back button behavior for other screens
      }
    );

    // Unsubscribe from the back button event when the component unmounts
    return () => backHandler.remove();
  }, [isProfilePage]);

  return (
    <View style={{ flex: 1 }}>
      {/* Custom header with a back button */}
      {/* <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Text style={{ color: "white" }}>Go Back</Text>
      </TouchableOpacity> */}
      <Tabs />
    </View>
  );
}

export default function Index() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.bottom}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="entry" component={Entry} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="otp" component={OTPScreen} />
            {/* Using the custom header for ProfilePage */}
            <Stack.Screen
              name="profile"
              component={ProfilePage}
              options={{
                headerShown: false,
                headerBackImage: () => null, // Hide the default back button
              }}
            />
          </Stack.Navigator>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

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
    zIndex: 1,
    backgroundColor: "#808080",
    borderRadius: 15,
    height: "100%",
    width: "100%",
  },
});
