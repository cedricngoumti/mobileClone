import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../../../utils/Colors";
import { windowWidth } from "../../../utils/Dimensions";
import { AuthContext } from "../../../navigation/AuthProvider";

interface Props {
  name: string;
  image: string;
}

const Card = ({ name, image }: Props) => {
  return (
    <TouchableOpacity
      style={{
        width: windowWidth / 3,
        height: windowWidth / 3,
        marginVertical: 10,
        paddingLeft: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => null}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          backgroundColor: COLORS.white,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 100,
            borderRadius: 10,
            borderColor: COLORS.primary,
            borderWidth: 0.3,
          }}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.productName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  isOff: {
    fontSize: 9,
    color: COLORS.white,
    fontWeight: "300",
  },
  productName: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: "600",
    marginBottom: 2,
  },
});
