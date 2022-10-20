import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { User } from "../model/User";
import fetchApi from "../api/fetchApi";

export interface AuthContextInterface {
  user: User | null;
  isLoading: boolean;
  onLauched: boolean;
  login: any;
  logout: () => void;
  startApp: () => void;
  refreshUser: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  user: null,
  isLoading: true,
  onLauched: false,
  login: () => {},
  logout: () => {},
  startApp: () => {},
  refreshUser: () => {},
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

  const refreshUser = () => {
    fetchApi(`login/me`)
      .get(`?id=${user?.id}`)
      .then((e) => {
        setUser(e.data);
        console.log("refresh", e.data);
      });
  };

  const login = async (e: any) => {
    const userObject = JSON.stringify(e.user);
    setIsLoading(true);
    try {
      await AsyncStorage.setItem("@smobilepay_Auth:user", userObject);
      await AsyncStorage.setItem("@smobilepay_Auth:jwt", e.token);
      setUser(e.user);
    } catch (e) {}
    setTimeout(() => {
      showMessage({
        message: "Parfait",
        description: "Bienvenue, ",
        type: "success",
      });
      setIsLoading(false);
    }, 1200);
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("@smobilepay_Auth:user").then(() => {
      try {
        AsyncStorage.removeItem("@smobilepay_Auth:jwt");
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
        fetchApi(`login/me`)
          .get(`?id=${userDataLocal.id}`)
          .then((e) => {
            if (e.data) setUser(e.data);
          });
      } else {
        const started = await AsyncStorage.getItem("is_started");
        if (started) setOnLauched(true);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
      refreshUser,
    }),
    [user, isLoading, onLauched]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
