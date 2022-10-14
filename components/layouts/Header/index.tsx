import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { windowWidth } from "../../../utils/Dimensions";
import { COLORS } from "../../../utils/Colors";

interface Props {
  name: string;
  searchFilter?: {
    filterType: string;
    iconSearch: string;
    placeholder: string;
  };
}

const Header = ({ name, searchFilter }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.containerHeader}>
        <View>
          <Text style={styles.logoView}>{name}</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => null}>
            <View
              style={
                searchFilter ? styles.withSearchIcon : styles.withoutSearchIcon
              }
            >
              {searchFilter && (
                <AntDesign name="search1" size={24} color={COLORS.black} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: windowWidth,
    backgroundColor: COLORS.primary,
    //borderBottomRightRadius: 25,
    //borderBottomLeftRadius: 25,
    elevation: 5,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoView: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginLeft: 5,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.white,
  },
  logo: {
    fontSize: 25,
    fontStyle: "italic",
    color: COLORS.black,
    fontWeight: "900",
  },
  logoSpecial: {
    fontSize: 25,
    fontStyle: "italic",
    color: COLORS.black,
    fontWeight: "300",
  },
  resultLogo: {
    paddingLeft: 25,
  },
  withSearchIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    margin: 15,
    marginRight: 25,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.3,
    borderColor: COLORS.gray,
    backgroundColor: "#fdfdfd",
  },
  withoutSearchIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    margin: 15,
    marginRight: 25,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
