import { StyleProp, View, ViewStyle } from "react-native";
import React, { FunctionComponent } from "react";

interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const MainContainer: FunctionComponent<ContainerProps> = (props) => {
  return (
    <View style={[{ flex: 1, backgroundColor: "#fff" }, props.style]}>
      {props.children}
    </View>
  );
};

export default MainContainer;
