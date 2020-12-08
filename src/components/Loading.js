import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Loading: {
    color: "#999",
    margin: "30px 0",
  },
});

export default function Loading() {
  return <ActivityIndicator size="small" style={styles.Loading}></ActivityIndicator>;
}
