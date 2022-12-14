import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { COLORS } from "../../utils/Colors";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import Svg, { Path } from "react-native-svg";
import Input from "../../components/elements/Inputs";
import Button from "../../components/elements/Buttons";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../navigation/AuthProvider";
import fetchApi from "../../api/fetchApi";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const signIn = async () => {
    if (email) {
      setIsConnecting(true);

      if (password) {
        fetchApi()
          .login({
            email,
            password,
          })
          .then((t) => {
            if (t.token) {
              login(t);
            } else {
              showMessage({
                message: "Error",
                description: t.error,
                type: "danger",
              });
            }
          })
          .catch((err) => {
            showMessage({
              message: "Erreur",
              description: "une erreure est survenue ",
              type: "danger",
            });
          })
          .finally(() => setIsConnecting(false));
      } else {
        setIsConnecting(false);

        showMessage({
          message: "Erreur",
          description: "Mer??i de saisir votre mot de passe",
          type: "danger",
        });
      }
    } else {
      showMessage({
        message: "Erreur",
        description: "Mer??i de saisir votre nom utilisateur",
        type: "danger",
      });
      setIsConnecting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.main}>
        <View
          style={{
            width: "100%",
            alignContent: "center",
            alignItems: "center",
            paddingBottom: windowHeight * 0.03,
          }}
        ></View>
        <Text style={styles.text}>Bienvenue sur SmobilPay</Text>

        <Text style={styles.slogan}>
          Veuillez entrer vos coordonnees d'acces.
        </Text>

        <View>
          <Input
            placeholderText={"nom utilisateur"}
            iconType={"user"}
            labelValue={email}
            onChangeText={setEmail}
          />
          <Input
            labelValue={password}
            placeholderText={"mot de passe"}
            iconType={"lock"}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View
            style={{
              paddingBottom: 25,
            }}
          >
            {isConnecting ? (
              <Button title="Connexion..." onPress={() => null} />
            ) : (
              <Button title="Connexion" onPress={() => signIn()} />
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.forgotButton}>je n'ai pas encore de compte?</Text>
        </TouchableOpacity>
      </View>

      {!isKeyboardVisible && (
        <View style={styles.bottom}>
          <View style={styles.box}>
            <Svg
              height={200}
              width={windowWidth}
              viewBox="0 0 1440 320"
              style={styles.bottomWavy}
            >
              <Path
                fill={COLORS.white}
                d="M0,64L40,96C80,128,160,192,240,202.7C320,213,400,171,480,149.3C560,128,640,128,720,154.7C800,181,880,235,960,218.7C1040,203,1120,117,1200,74.7C1280,32,1360,32,1400,32L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
              />
            </Svg>
            <Image
              source={require("../../assets/images/smobilpaylogo.png")}
              resizeMode={"contain"}
              style={styles.logoBottom}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  main: {
    padding: 20,
    paddingTop: 25,
    flex: 0.6,
    justifyContent: "center",
    zIndex: 10,
  },
  text: {
    width: "100%",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: COLORS.grayLight,
  },
  slogan: {
    width: "100%",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.grayLight,
  },
  forgotButton: {
    marginVertical: 5,
    textAlign: "center",
    color: COLORS.grayLight,
  },
  bottom: {
    position: "absolute",
    width: windowWidth,
    bottom: 0,
  },
  box: {
    backgroundColor: COLORS.white,
    minHeight: windowHeight * 0.2,
    height: windowHeight * 0.2,
    justifyContent: "center",
    flex: 1,
  },
  bottomWavy: {
    position: "absolute",
    bottom: windowHeight * 0.1,
  },
  logoBottom: {
    padding: 20,
    width: windowWidth * 0.6,
    zIndex: 5,
    alignSelf: "center",
  },
});
