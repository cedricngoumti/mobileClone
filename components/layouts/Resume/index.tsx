import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../../../utils/Colors";
import { windowHeight, windowWidth } from "../../../utils/Dimensions";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../../navigation/AuthProvider";
import { formatAmount } from "../../../utils/misc";

const Resume = () => {
  const { user, refreshUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View>
          <View style={{ paddingBottom: 10 }}>
            <Text style={styles.text}>Balance SmobilPay</Text>
            <Text style={styles.solde}>
              {user?.smobilmoney
                ? formatAmount(user?.smobilmoney)
                : "____ ____ ____"}
            </Text>
            <Text style={styles.description}>
              {" "}
              {user?.comission
                ? formatAmount(user?.comission) + "commissions"
                : "____ ____ ____"}
            </Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={styles.text}>Balance Agent bank</Text>
            <Text style={styles.solde}>
              {user?.bankmoney
                ? formatAmount(user.bankmoney)
                : "____ ____ ____"}
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => refreshUser()}>
          <FontAwesome name="refresh" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Resume;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
    borderWidth: 0.3,
    borderColor: COLORS.gray,
    height: windowHeight / 4,
    minHeight: windowHeight / 4,
    borderRadius: 15,
    zIndex: 5,
  },
  text: {
    paddingVertical: 3,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
  },
  solde: {
    paddingVertical: 2,
    fontSize: 15,
    color: COLORS.primary,
  },
  description: {
    paddingVertical: 1,
    fontSize: 12,
    color: COLORS.gray,
  },
});
