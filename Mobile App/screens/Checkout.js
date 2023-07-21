import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const Checkout = ({ route }) => {
  useEffect(() => {
    console.log("checkoutUrl:", route.params.checkoutUrl);
  }, []);

  let uri = route.params.checkoutUrl;
  if (!uri) {
    console.log("uri not found");
    uri = "https://checkout.stripe.com/c/pay/cs_test_a1TMUJ7Xgyzk8QAQlnwMdU1FtNhx020WdLZJDTsRw9koG3gyIBBSUf9AMi#fidkdWxOYHwnPyd1blpxYHZxWjA0Sz1Pd2dWQE9TbDNCcGZCU0BgYXVGVzJIMHJCdE13QEhHZ0hTRmFBUzJ9cHQ2dWd8NlxIfHNAVFE0NnIyQVZvTEd1YnNjdnVndj1RZnJkTU92S2ZXUlRoNTU3MkJcb1JtfycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl";
  } else {
    console.log("uri:", uri);
  }

  return (
    <View style={styles.container}>
      <WebView source={{ uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Checkout;
