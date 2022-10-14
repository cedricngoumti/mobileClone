import { StyleSheet, Text, View, StatusBar } from "react-native";
import Navigation from "./navigation";
import FlashMessage from "react-native-flash-message";
import { COLORS } from "./utils/Colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary}
        barStyle={"light-content"}
        showHideTransition={"fade"}
      />

      <Navigation />

      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
