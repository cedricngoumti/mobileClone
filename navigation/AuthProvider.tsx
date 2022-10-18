import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { User } from "../model/User";

export interface AuthContextInterface {
  user: User | null;
  isLoading: boolean;
  onLauched: boolean;
  login: any;
  logout: () => void;
  startApp: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  user: null,
  isLoading: true,
  onLauched: false,
  login: () => {},
  logout: () => {},
  startApp: () => {},
};

export const AuthContext =
  createContext<AuthContextInterface>(authContextDefaults);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [onLauched, setOnLauched] = useState<boolean>(false);

  const startApp = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem("is_started", "AlreadyStarted");
      setTimeout(() => {
        setOnLauched(true);
        setIsLoading(false);
      }, 1200);
    } catch (error) {}
  };

  const login = async (e: any) => {
    const userObject = JSON.stringify(e);
    setIsLoading(true);
    try {
      await AsyncStorage.setItem("@smobilepay_Auth:user", userObject);
      setUser(e);
    } catch (e) {}
    setTimeout(() => {
      showMessage({
        message: "Parfait",
        description: "Bienvenue, " + e.email,
        type: "success",
      });
      setIsLoading(false);
    }, 1200);
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("@smobilepay_Auth:user").then(() => {
      try {
        setUser(null);
      } catch (e) {
        console.log(e);
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  useEffect(() => {
    const loadLocalUser = async () => {
      setIsLoading(true);
      const storagedUser = await AsyncStorage.getItem("@smobilepay_Auth:user");
      if (storagedUser) {
        const userDataLocal = JSON.parse(storagedUser);
        setUser(userDataLocal);
      } else {
        const started = await AsyncStorage.getItem("is_started");
        if (started) setOnLauched(true);
      }
      setIsLoading(false);
    };

    loadLocalUser();
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      isLoading,
      onLauched,
      login,
      logout,
      startApp,
    }),
    [user, isLoading, onLauched]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
