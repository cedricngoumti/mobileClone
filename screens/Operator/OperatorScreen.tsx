import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import MainContainer from "../../components/layouts/MainContainer";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../utils/Colors";
import { Service } from "../../model/Service";
import Input from "../../components/elements/Inputs";
import Button from "../../components/elements/Buttons";
import { showMessage } from "react-native-flash-message";
import { formatAmount } from "../../utils/misc";
import fetchApi from "../../api/fetchApi";
import { AuthContext } from "../../navigation/AuthProvider";

const OperatorScreen = (props: any) => {
  const { user, refreshUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const service: Service = props.route.params.item;
  const [identy, setIdentity] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const showConfirmDialog = () => {
    return Alert.alert(
      "Confirm the transaction",
      `Are you sure you want to transfert ${formatAmount(
        +amount
      )} to ${identy} ?`,
      [
        {
          text: "Yes",
          onPress: () => {
            confirmTransaction();
          },
        },

        {
          text: "No",
        },
      ]
    );
  };

  const sendMoney = () => {
    if (identy) {
      if (amount) {
        if (Platform.OS === "web") {
          confirmTransaction();
        } else {
          showConfirmDialog();
        }
      } else {
        showMessage({
          message: "Error",
          description: "please enter the amount of the transaction",
          type: "danger",
        });
      }
    } else {
      showMessage({
        message: "Error",
        description: "please enter the beneficiary number",
        type: "danger",
      });
    }
  };

  const confirmTransaction = () => {
    setIsLoading(true);
    fetchApi(
      `transaction/add?userid=${user?.id}&amount=${amount}&serviceid=${service.id}&identity=${identy}`
    )
      .get()
      .then((e) => {
        if (e.error) {
          showMessage({
            message: e.messages.message,
            description: e.messages.message,
            type: "danger",
          });
        } else {
          showMessage({
            message: "Good",
            description:
              "the transaction has been initialized you will receive a confirmation notification",
            type: "success",
            duration: 5000,
          });
          refreshUser();
          navigation.goBack();
        }
      })
      .catch((e) => {
        showMessage({
          message: "Error",
          description: "check your internet connexion",
          type: "danger",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <MainContainer>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="keyboard-backspace"
            size={30}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{service.name}</Text>

        <FontAwesome
          style={{ position: "absolute", right: 13, top: 12 }}
          name="ellipsis-v"
          size={24}
          color={COLORS.white}
        />
      </View>
      <ScrollView>
        <View style={{ paddingTop: 15 }}>
          <View
            style={{ display: "flex", flexDirection: "row", paddingLeft: 10 }}
          >
            <View>
              <Image
                style={styles.userImage}
                resizeMode="cover"
                source={{
                  uri: service.image,
                }}
              />
            </View>
            <View
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text>{service.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.main}>
          {service.promotion > 0 && (
            <View
              style={{
                backgroundColor: "orange",
                padding: 5,
                borderRadius: 5,
                marginVertical: 20,
              }}
            >
              <Text style={{ alignSelf: "center" }}>
                you get a {service.promotion}% discount for using this service
              </Text>
            </View>
          )}
          <Text
            style={{
              fontSize: 26,
              fontWeight: "600",
              marginVertical: 20,
              alignSelf: "center",
            }}
          >
            {service.name} Form
          </Text>
          <Input
            placeholderText={"beneficiary"}
            iconType={"phone"}
            labelValue={identy}
            onChangeText={setIdentity}
          />
          <Input
            labelValue={amount}
            placeholderText={"amount"}
            iconType={"creditcard"}
            onChangeText={setAmount}
            keyboardType={"phone-pad"}
          />
          {isLoading ? (
            <Button title="Processing..." onPress={() => null} />
          ) : (
            <Button title="Send" onPress={() => sendMoney()} />
          )}
        </View>
      </ScrollView>
    </MainContainer>
  );
};

export default OperatorScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  containerAlert: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: COLORS.transparent,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
    marginHorizontal: 15,
  },
  userImage: {
    alignSelf: "center",
    marginLeft: 10,
    width: 100,
    height: 100,
    borderRadius: 25,
    borderWidth: 0.3,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    padding: 20,
    paddingTop: 5,
    flex: 0.6,
    justifyContent: "center",
    zIndex: 2,
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: COLORS.white,
    marginBottom: 30,
    borderRadius: 10,
  },
  text: {
    fontSize: 30,
  },
});
