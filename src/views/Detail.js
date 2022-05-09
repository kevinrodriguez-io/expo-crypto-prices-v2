import { ScrollView, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";

export const Detail = ({ route }) => {
  const coinId = route.params.id;
  const chartUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=7`;
  const date = new Date()
  const coinDetails = `https://api.coingecko.com/api/v3/coins/${coinId}/history?vs_currency=usd&date=${date.getUTCDay()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`;
  const { data, isLoading, refetch } = useQuery(coinDetails, ({ queryKey }) =>
    fetch(queryKey).then((res) => res.json())
  );
  return (
    <ScrollView>
      <Text>{coinId}</Text>
      <Text>
        {JSON.stringify(data, null, 2)}
      </Text>
    </ScrollView>
  );
};
