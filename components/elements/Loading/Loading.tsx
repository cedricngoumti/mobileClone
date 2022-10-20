import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS } from "../../../utils/Colors";

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size={"large"} color={COLORS.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
