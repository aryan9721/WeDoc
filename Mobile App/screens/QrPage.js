import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
export default function QrPage() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleItemClick = (item) => {
    console.log('item',item);
    navigation.navigate("references", { reference: item });
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // console.log(data)
    handleItemClick(JSON.parse(data));
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
        <View style={styles.editButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate("reference-main")}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                <Icon name="chevron-left" size={24} color="#67B8F7" />{" "}
                References
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("qr-page")}
              style={{
                height: 30,
                width: 29,
                backgroundColor: "#F0F1F4",
                borderRadius: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/scanner.png")}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  backgroundColor: "rgba(255, 255, 255, 0)",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.referredButton}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 3,
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFFFF",
                shadowColor: "#6CB8F1",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.16,
                shadowRadius: 14,
                borderRadius: 5.78,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              onPress={() => navigation.navigate("referred-to-me")}
            >
              <Text
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: 16,
                  lineHeight: 19,
                  color: "#67B8F7",
                }}
              >
                Referred To Me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FFFFFF",
                shadowColor: "#6CB8F1",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.16,
                shadowRadius: 14,
                borderRadius: 5.78,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              onPress={() => navigation.navigate("referred-by-me")}
            >
              <Text
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: 16,
                  lineHeight: 19,
                  color: "#67B8F7",
                }}
              >
                Referred By Me
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              lineHeight: 24,
              color: "#06080A",
              // textDecorationLine: "underline",
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            Scan QR Code to refer a Patient
          </Text>
        </View>
        <View style={styles.qrScannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
              style={styles.scanAgainButton}
            />
          )}
          <View style={styles.borderCurve} />
        </View>
        <View>
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              letterSpacing: -0.3,
              color: "#686868",
            }}
          >
            Allign QR Code within frame to Scan
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#67B8F7",
            shadowColor: "#6CB8F1",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.16,
            shadowRadius: 14,
            borderRadius: 11.78,
            margin: 20,
            paddingVertical: 12,
          }}
          // onPress={() => {
          //   refer_patient();
          //   navigation.navigate("referred-by-me", {
          //     key: new Date().getTime(),
          //   });
          // }}
          onPress={() => navigation.navigate("referred-by-me")}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              lineHeight: 24,
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
            Done&nbsp; &#x2192;
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  qrScannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
    width: 250.97,
    height: 250.97,
  },
  referredButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  scanAgainButton: {
    position: "absolute",
    bottom: 20,
  },
  bottomButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
