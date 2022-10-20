import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Card from "../../components/layouts/Card";
import MainContainer from "../../components/layouts/MainContainer";
import { Service } from "../../model/Service";
import fetchApi from "../../api/fetchApi";
import Loading from "../../components/elements/Loading/Loading";

const ServiceScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetchApi(`service`)
      .get()
      .then((e) => setServices(e.data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));

    return () => {
      false;
    };
  }, []);

  return (
    <MainContainer>
      <Header name="Services" />
      {isLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <FlatList
            data={services}
            numColumns={3}
            renderItem={({ item, index }) => <Card key={index} item={item} />}
          />
        </View>
      )}
    </MainContainer>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({});
