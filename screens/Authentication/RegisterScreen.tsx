import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../utils/Colors";
import { EvilIcons } from "@expo/vector-icons";
import Input from "../../components/elements/Inputs";
import Button from "../../components/elements/Buttons";
import { AuthContext } from "../../navigation/AuthProvider";
import { showMessage } from "react-native-flash-message";
import fetchApi from "../../api/fetchApi";

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const { login } = useContext(AuthContext);

  const register = async () => {
    if (username) {
      if (email) {
        if (password) {
          if (password === confirmPassword) {
            setIsConnecting(true);

            fetchApi()
              .register({
                email,
                password,
                confirm_password: confirmPassword,
              })
              .then((e) => {
                if (e.error) {
                  showMessage({
                    message: "Erreur",
                    description: e.messages.message,
                    type: "danger",
                  });
                } else {
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
                    });

                  //login({ email, password });
                }
              })
              .catch((e) => console.log("erreur", e))
              .finally(() => setIsConnecting(false));
          } else {
            showMessage({
              message: "Erreur",
              description: "les mots de passes doivent ??tre identiques",
              type: "danger",
            });
          }
        } else {
          showMessage({
            message: "Erreur",
            description: "Mer??i de saisir votre mot de passe",
            type: "danger",
          });
        }
      } else {
        showMessage({
          message: "Erreur",
          description: "Merci de saisir votre adresse email",
          type: "danger",
        });
      }
    } else {
      showMessage({
        message: "Erreur",
        description: "Mer??i de saisir votre nom utilisateur",
        type: "danger",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 18, paddingTop: 5 }}
        >
          <EvilIcons name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <Text style={styles.text}>Cr??ation de votre compte utilisateur, </Text>

        <Text style={styles.slogan}></Text>

        <View>
          <Input
            placeholderText={"nom & pr??nom"}
            iconType={"user"}
            labelValue={username}
            onChangeText={setUsername}
          />
          <Input
            placeholderText={"Votre adresse email"}
            iconType={"mail"}
            labelValue={email}
            onChangeText={setEmail}
          />

          <Input
            placeholderText={"Mot de Passe"}
            iconType={"lock"}
            labelValue={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Input
            placeholderText={"Confirmation  mot de passe"}
            iconType={"lock"}
            labelValue={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <View
            style={{
              paddingBottom: 25,
            }}
          >
            {isConnecting ? (
              <Button title="enregistrement..." onPress={() => null} />
            ) : (
              <Button title="Valider" onPress={() => register()} />
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.forgotButton}>Je poss??de d??j?? un compte!</Text>
        </TouchableOpacity>

        <Text style={styles.notice}>
          En continuant, vous reconnaissez avoir lu notre politique de
          confidentialit?? sur l'utilisation de vos donn??es et accept?? nos
          conditions d'utilisation{" "}
        </Text>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    justifyContent: "center",
    //alignItems: 'center',
    //padding: 5,
    //paddingTop: 5,
  },
  main: {
    padding: 20,
    paddingTop: 2,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-start",
  },
  text: {
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
    textAlign: "center",
  },
  slogan: {
    width: "100%",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "cover",
    alignSelf: "center",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 5,
    textAlign: "center",
    color: COLORS.primary,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.primary,
  },
  notice: {
    width: "100%",
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 20,
    textAlign: "center",
  },
});
