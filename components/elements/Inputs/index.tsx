import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { COLORS } from "../../../utils/Colors";
import { AntDesign } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";

interface Props {
  labelValue: string;
  placeholderText: string;
  iconType: any;
  onChangeText: (e: string) => void;
}

const Input = ({
  labelValue,
  placeholderText,
  iconType,
  onChangeText,
  ...rest
}: Props) => {
  return (
    <View style={styles.inpuContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      <TextInput
        style={styles.input}
        value={labelValue}
        placeholder={placeholderText}
        onChangeText={(e) => onChangeText(e)}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inpuContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    paddingHorizontal: 10,
    borderColor: COLORS.primary,
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightColor: COLORS.primary,
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    //fontFamily:'Lato-Regular',
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    tintColor: COLORS.primary,
    borderWidth: 1,
  },
});
