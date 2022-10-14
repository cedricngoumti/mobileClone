import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { User } from "../model/User";

export interface AuthContextInterface {
  user: User | null;
  isLoading: boolean;
  login: any;
  logout: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
};

export const AuthContext =
  createContext<AuthContextInterface>(authContextDefaults);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (e: any) => {
    const userObject = JSON.stringify(e);
    setIsLoading(true);

    try {
      await AsyncStorage.setItem("@smobilepay_Auth:user", userObject);
      setUser(e);
    } catch (e) {
      // saving error
    }
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
    AsyncStorage.clear().then(() => {
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
      }
      setIsLoading(false);
    };

    loadLocalUser();
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
