import React, { useState, useEffect, useCallback } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import useApiKeyStore from "./store";

export default function Membership() {
  const navigation = useNavigation();
  const { redirectToCheckout } = useStripe(); // Move the hook usage here
  const [showPopup, setShowPopup] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); // Add state for refreshing

  const handlePaymentStatus = (success) => {
    setPaymentSuccess(success);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
  };

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Call your function to fetch the updated membership data
    fetch_plan()
      .then(() => {
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.error("Error refreshing membership:", error);
        setIsRefreshing(false);
      });
  }, []);

  const imageUris = [
    "https://images.unsplash.com/photo-1674069698493-c2868c7115e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1674076342844-4eb2eba04dd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1674064299395-e1472219eaf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1674100429730-df12f845ff26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1673993386955-45fc437f5de9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mzd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1674108015366-95f4dbf94d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    // ...
  ];
  const BACKEND_URL = "http://170.187.254.215:4000";

  const [plan, setplan] = React.useState([]);
  const fetch_plan = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let res = await fetch(`${BACKEND_URL}/api/membership/plan`, requestOptions);
    let response = await res.json();
    console.log(response);
    setplan(response);
  };
  useEffect(() => {
    fetch_plan();
  }, []);

  const apiKey = useApiKeyStore((state) => state.apiKey);

  const getImageForPlan = (index) => {
    return { uri: imageUris[index] };
  };

  const handleUpdate = (id) => {
    console.log(`${BACKEND_URL}/api/doctor/updateMembershipPlan`, id, apiKey);
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", apiKey);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BACKEND_URL}/api/doctor/updateMembershipPlan`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const createCheckoutLink = async (id, _payId) => {
    const url = "https://api.stripe.com/v1/checkout/sessions";
    console.log("priceId: ", _payId);
    let payId = _payId ? _payId : "price_1N8zCmSEJVi6GucGcTXPO9fF";
    const secretKey =
      "sk_test_51N8JrbSEJVi6GucGhDjvIZVlBydlOap5XvURgH3hB7sdgXrTkiKDI4nOXrqtZ2tH5pIJAS6blOgpSvH6BrNqt4Up00zTyoZ07K";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${secretKey}`,
      },
      body: `payment_method_types%5B%5D=card&line_items%5B%5D%5Bprice%5D=${payId}&line_items%5B%5D%5Bquantity%5D=1&success_url=https%3A%2F%2Fexample.com%2Fsuccess&cancel_url=https%3A%2F%2Fexample.com%2Fcancel&mode=payment`,
      redirect: "follow",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (response.ok) {
        console.log("response ", id);
        handleUpdate(id);
        navigation.navigate("checkout", { checkoutUrl: data.url });
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // This is the dummy backend calling for testing payment gateway
  // Dummy function to simulate creating a session on the backend
  const createDummySession = useCallback(async () => {
    // Replace this code with the actual logic for creating a session on your backend
    // In test mode, you can use the Stripe API directly to create a session
    const response = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer sk_test_51N8JrbSEJVi6GucGhDjvIZVlBydlOap5XvURgH3hB7sdgXrTkiKDI4nOXrqtZ2tH5pIJAS6blOgpSvH6BrNqt4Up00zTyoZ07K", // Replace with your Stripe secret key
          "Content-Type": "application/json",
        },
        body: new URLSearchParams({
          // Include any required parameters for creating the session
          // Example:
          success_url: "https://your-website.com/success", // Redirect URL after successful payment
          cancel_url: "https://your-website.com/cancel", // Redirect URL after canceled payment
          payment_method_types: "card",
          line_items: [
            {
              price_data: {
                currency: "INR",
                product_data: { name: "Membership" },
                unit_amount: 1000,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
        }),
      }
    );

    if (response.ok) {
      handlePaymentStatus(true); // Payment succeeded
    } else {
      console.error("Error creating session:", response.error);
      handlePaymentStatus(false); // Payment failed
    }
  }, []);
  return (
    <SafeAreaView>
      <StripeProvider publishableKey="pk_test_51N8JrbSEJVi6GucGVEedpCR7M5wGqHrEMBbMVCdDV7xuq3pby3YMyvEQT13w7DSjIBpgvfspbs8TcwaHJsNcRWQm0027GYjWhz">
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          <ImageBackground
            source={require("../assets/Background.png")}
            style={{
              flex: 1,
              background:
                "linear-gradient(180deg, rgba(103, 184, 247, 0.0576) 0%, rgba(103, 184, 247, 0.0216) 100%)",
            }}
          >
            <SafeAreaView style={styles.container}>
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
                    Membership
                  </Text>
                </TouchableOpacity>
              </View>
              {plan &&
                plan.map((plan, id) => (
                  <TouchableOpacity
                    key={id}
                    onPress={async () => {
                      const session = await createCheckoutLink(
                        plan._id,
                        plan.stripe_price_object
                      );

                      if (session) {
                        const { error } = await redirectToCheckout({
                          sessionId: session.id,
                        });

                        if (error) {
                          console.log("Error redirecting to checkout:", error);
                          // Handle error
                        }
                      }
                    }}
                    style={styles.welcome}
                  >
                    <View
                      style={{
                        margin: 10,
                      }}
                    >
                      <Card style={{ borderRadius: 11.78 }}>
                        <View style={{ overflow: "hidden" }}>
                          <ImageBackground
                            source={getImageForPlan(id)}
                            resizeMode="cover"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 11.78,
                            }}
                          >
                            {/* {top-left1} */}
                            <Text style={styles.text4}>{plan.name}</Text>
                            {/* top-left2 */}
                            <Text style={styles.text5}>
                              Association fees for 12 Months
                            </Text>
                            {/* top-right */}
                            <Text style={styles.text}>Upto{"\n"} 25% off </Text>
                            {/* bottom-left */}
                            <Text
                              style={{
                                fontSize: 24,
                                color: "white",
                                // backgroundColor: "white",
                                ...styles.text1,
                              }}
                            >
                              ₹ {plan.amount ? plan.amount : 1000}
                            </Text>
                            <View style={styles.text2}>
                              <TouchableOpacity
                                style={{
                                  backgroundColor: "#67B8F7",
                                  borderRadius: 7.78,
                                  shadowColor: "#6CB8F1",
                                  shadowOffset: { width: 0, height: 6 },
                                  shadowOpacity: 0.16,
                                  shadowRadius: 14,
                                  elevation: 6, // elevation is needed for shadow on Android
                                }}
                                onPress={async () => {
                                  const session = await createCheckoutLink(
                                    plan._id,
                                    plan.stripe_price_object
                                  );

                                  if (session) {
                                    const { error } = await redirectToCheckout({
                                      sessionId: session.id,
                                    });

                                    if (error) {
                                      console.log(
                                        "Error redirecting to checkout:",
                                        error
                                      );
                                      // Handle error
                                    }
                                  }
                                }}
                              >
                                <Text
                                  style={{
                                    fontStyle: "normal",
                                    fontWeight: "800",
                                    fontSize: 18,
                                    lineHeight: 22,
                                    color: "#FFFFFF",
                                    padding: 7,
                                  }}
                                >
                                  Pay Now
                                </Text>
                              </TouchableOpacity>
                            </View>

                            {/* bottom-right */}
                            <Text
                              style={{
                                fontSize: 15,
                                color: "red",
                                // backgroundColor: "white",
                                ...styles.text3,
                              }}
                            >
                              Membership Expired in {"\n"}{" "}
                              {plan.duration ? plan.duration : 1} months
                            </Text>
                          </ImageBackground>
                        </View>
                      </Card>
                    </View>
                    <View>
                      <Text style={styles.welcome}> </Text>
                    </View>
                    <View>
                      <Text style={styles.welcome}> </Text>
                    </View>
                    <View>
                      <Text style={styles.welcome}> </Text>
                    </View>
                    <View>
                      <Text style={styles.welcome}> </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </SafeAreaView>
          </ImageBackground>
        </ScrollView>
        <Modal visible={showPopup} transparent>
          <View style={styles.popupContainer}>
            <View
              style={[
                styles.popup,
                { backgroundColor: paymentSuccess ? "green" : "red" },
              ]}
            >
              <Text style={styles.popupText}>
                {paymentSuccess ? "Payment Successful!" : "Payment Failed!"}
              </Text>
            </View>
          </View>
        </Modal>
      </StripeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
  },
  welcome: {
    flex: 1,
    paddingVertical: 15,
    height: "100%",
    position: "relative",
  },
  image: {
    position: "relative",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 11.78,
  },
  text: {
    fontSize: 20,
    color: "white",
    width: 45,
    height: 34,
    position: "absolute",
    left: 314,
    top: 0,
    backgroundColor: "#67B8F7",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    color: "#FFFFFF",
  },
  text1: {
    position: "absolute",
    width: 150,
    height: 34,
    left: 10,
    top: 100,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 28,
    lineHeight: 34,
    color: "#67B8F7",
  },
  text2: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  text3: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  text4: {
    position: "absolute",
    height: 24,
    left: 10,
    top: 7,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 24,
    color: "#06080A",
  },
  text5: {
    position: "absolute",
    height: 16,
    left: 10,
    top: 36,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    color: "#686868",
  },
  popupContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    padding: 20,
    borderRadius: 10,
  },
  popupText: {
    fontSize: 18,
    color: "white",
  },
});
