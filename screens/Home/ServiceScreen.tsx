import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/layouts/Header";
import Card from "../../components/layouts/Card";

const ServiceScreen = () => {
  return (
    <View>
      <Header
        name="Services"
        searchFilter={{
          filterType: "Automobile",
          iconSearch: "car-rental",
          placeholder: "Chercher par marque",
        }}
      />
      <ScrollView>
        <Card
          name="Orange Money"
          image={
            "https://logos-marques.com/wp-content/uploads/2021/07/Orange-Money-logo-500x336.png"
          }
        />
      </ScrollView>
    </View>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({});
