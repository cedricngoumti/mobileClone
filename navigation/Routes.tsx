import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "./AuthProvider";
import AppStack from "./AppStack";
import { COLORS } from "../utils/Colors";
import AuthStack from "./AuthStack";

const Routes = () => {
  const { user, isLoading } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
      ) : (
        <NavigationContainer>
          {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      )}
    </>
  );
};

export default Routes;
