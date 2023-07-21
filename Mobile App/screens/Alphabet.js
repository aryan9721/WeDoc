import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Alphabet = ({ sections, scrollToSection }) => {
  return (
    <View style={styles.container}>
      {sections.map((section) => (
        <TouchableOpacity
          key={section.title}
          style={styles.alphabetButton}
          onPress={() => scrollToSection(section.id)}
        >
          <Text style={styles.alphabetText}>{section.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    width: 30,
    alignItems: "center",
  },
  alphabetButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  alphabetText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default Alphabet;
