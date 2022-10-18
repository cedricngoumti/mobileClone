import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import Login from "../screens/Authentication/LoginScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import StarterScreen from "../screens/Authentication/StarterScreen";
import { AuthContext } from "./AuthProvider";

const Stack = createNativeStackNavigator();

function AuthStack() {
  const { onLauched } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!onLauched && (
        <Stack.Screen
          name="Starter"
          component={StarterScreen}
          options={{
            headerShown: false,
          }}
        />
      )}

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
