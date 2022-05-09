import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useQuery } from "react-query";

const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=false";

const getPriceStyle = (item) => {
  return item.price_change_percentage_24h > 0
    ? {
        color: "green",
      }
    : {
        color: "red",
      };
};

export const Home = ({ navigation }) => {
  const { data, isLoading, refetch } = useQuery(URL, ({ queryKey }) =>
    fetch(queryKey).then((res) => res.json())
  );
  return (
    <SafeAreaView>
      <FlatList
        refreshing={isLoading}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Detail", {
                id: item.id,
              });
            }}
            style={styles.card}
          >
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.items}>
              <Text>{item.name}</Text>
              <Text style={getPriceStyle(item)}>{item.current_price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    margin: 5,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  items: {
    marginLeft: 16,
    justifyContent: "center",
  },
});
