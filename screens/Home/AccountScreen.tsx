import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/layouts/Header";
import ListItem from "../../components/layouts/ListItem";

const AccountScreen = () => {
  return (
    <View>
      <Header name="Compte" />
      <ScrollView>
        <View
          style={{
            padding: 10,
          }}
        >
          <ListItem name="Profil" icon={"user"} rightIcon={"right"} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
