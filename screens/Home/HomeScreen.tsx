import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Card from "../../components/layouts/Card";
import { COLORS } from "../../utils/Colors";
import Resume from "../../components/layouts/Resume";
import MainContainer from "../../components/layouts/MainContainer";
import { Service } from "../../model/Service";
import fetchApi from "../../api/fetchApi";
import Loading from "../../components/elements/Loading/Loading";

const HomeScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetchApi(`service`)
      .get()
      .then((e) => setServices(e.data))
      .finally(() => setIsLoading(false));

    return () => {
      false;
    };
  }, []);
  return (
    <MainContainer>
      <Header name="Home" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
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
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <>
                  <Resume />
                  <View
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ alignItems: "center", flexDirection: "row" }}
                    >
                      <Text style={styles.title}>Favorites</Text>
                    </View>
                  </View>
                </>
              )}
              data={services}
              numColumns={3}
              renderItem={({ item, index }) => <Card key={index} item={item} />}
            />
          </View>
        )}
      </View>
    </MainContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: "500",
  },
});
