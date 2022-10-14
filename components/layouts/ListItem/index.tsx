import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface Props {
  icon: string;
  name: string;
  rightIcon: string;
}

const ListItem = ({ icon, name, rightIcon }: Props) => {
  return (
    <View
      style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={{ paddingHorizontal: 5 }}>{icon}</Text>
        <Text style={{ paddingHorizontal: 5 }}>{name}</Text>
      </View>
      <Text>{rightIcon}</Text>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
