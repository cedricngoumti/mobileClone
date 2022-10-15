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
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Card
            name="Canal +"
            image={
              "https://www.crtv.cm/wp-content/uploads/2020/03/logo-Canal-500x445.jpg"
            }
          />
          <Card
            name="Groupe SABC"
            image={
              "https://image.jimcdn.com/app/cms/image/transf/none/path/s1084e755aa436055/image/i778094e8eaff93a6/version/1594567307/image.jpg"
            }
          />
          <Card
            name="Camwater Bills"
            image={
              "https://logos-marques.com/wp-content/uploads/2021/07/Orange-Money-logo-500x336.png"
            }
          />
        </View>

        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Card
            name="Mobile Money"
            image={
              "https://lemobileaukamer.files.wordpress.com/2014/11/mobile-money.jpg"
            }
          />
          <Card
            name="Eneo "
            image={
              "https://www.ocameroun.info/wp-content/uploads/sites/6/2018/04/Eneo-logo.jpg"
            }
          />
          <Card
            name="StarTimes"
            image={
              "https://www.emploi.cm/sites/emploi.cm/files/styles/medium/public/logo/jpeg.jpg?itok=f4RF5ciJ"
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({});
