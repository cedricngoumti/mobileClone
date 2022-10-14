import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/layouts/Header";
import Card from "../../components/layouts/Card";
import { COLORS } from "../../utils/Colors";

const HomeScreen = () => {
  return (
    <View>
      <Header name="Acceuil" />
      <ScrollView>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text style={styles.title}>Favoris</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Card
            name="Orange Money"
            image={
              "https://logos-marques.com/wp-content/uploads/2021/07/Orange-Money-logo-500x336.png"
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: "500",
  },
});
