import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../../../utils/Colors";
import { windowWidth } from "../../../utils/Dimensions";
import { AuthContext } from "../../../navigation/AuthProvider";
import { Service } from "../../../model/Service";
import { useNavigation } from "@react-navigation/native";

interface Props {
  item: Service;
}

const Card = ({ item }: Props) => {
  const navigation = useNavigation<any>();

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
      onPress={() =>
        navigation.navigate("Operator", {
          item: item,
        })
      }
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
        {item.promotion > 0 && (
          <View
            style={{
              position: "absolute",
              right: -5,
              top: -10,
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
              zIndex: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 14,
              }}
            >
              -{item.promotion}%
            </Text>
          </View>
        )}
        <Image
          source={{ uri: item.image }}
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
      <Text style={styles.productName}>{item.name}</Text>
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
