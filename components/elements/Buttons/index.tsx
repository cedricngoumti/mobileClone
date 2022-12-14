import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../../utils/Colors";
import { windowHeight } from "../../../utils/Dimensions";

interface Props {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.butonContainer} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ButtonOutline = ({ title, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.butonOutlineContainer,
          { borderWidth: 0.3, borderColor: COLORS.white },
        ]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: "100%",
    zIndex: 5,
    height: windowHeight * 0.08,
  },
  butonContainer: {
    backgroundColor: COLORS.accent,
    marginTop: 10,
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  butonOutlineContainer: {
    backgroundColor: COLORS.primary,
    marginTop: 10,
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
