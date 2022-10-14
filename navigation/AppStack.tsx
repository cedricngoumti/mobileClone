import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { COLORS } from "../utils/Colors";
import HomeScreen from "../screens/Home/HomeScreen";
import ServiceScreen from "../screens/Home/ServiceScreen";
import { Text } from "react-native";
import AccountScreen from "../screens/Home/AccountScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: "whitesmoke",
        tabBarStyle: {
          backgroundColor: COLORS.primary,
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text style={{ fontWeight: "300", color: COLORS.white }}>
              {focused ? route.name : ""}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen
        name="Acceuil"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Entypo name={"home"} color={color} size={34} />
            ) : (
              <AntDesign name={"home"} color={color} size={24} />
            ),
        }}
      />
      <Tab.Screen
        name="Compte"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome name="user-circle" size={34} color={color} />
            ) : (
              <FontAwesome name="user-circle-o" color={color} size={24} />
            ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServiceScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Entypo name="shopping-cart" color={color} size={34} />
            ) : (
              <AntDesign name="shoppingcart" color={color} size={24} />
            ),
        }}
      />
      <Tab.Screen
        name="historiques"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <AntDesign name="areachart" color={color} size={34} />
            ) : (
              <AntDesign name="areachart" color={color} size={24} />
            ),
        }}
      />

      <Tab.Screen
        name="Plus"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialIcons name="more-vert" color={color} size={34} />
            ) : (
              <MaterialIcons name="more-vert" color={color} size={24} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
