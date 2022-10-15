import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext } from "react";
import Header from "../../components/layouts/Header";
import ListItem from "../../components/layouts/ListItem";
import Button from "../../components/elements/Buttons";
import { AuthContext } from "../../navigation/AuthProvider";

const AccountScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Header name="Compte" />
      <ScrollView>
        <View
          style={{
            padding: 10,
          }}
        >
          <Button title="Sign out" onPress={() => logout()} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
