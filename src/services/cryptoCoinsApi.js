import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_KEY,
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoCoins = createApi({
  reducerPath: "cryptoCoinsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: (count) =>
        createRequest(
          `/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers[0]=1&orderBy=marketCap&orderDirection=desc&limit=${count}&offset=0`
        ),
    }),
    getCoinByUuid: builder.query({
      query: (coinId) =>
        createRequest(
          `/coin/${coinId}?timePeriod=24h&referenceCurrencyUuid=yhjMzLPhuIDl`
        ),
    }),
    getCoinHistory: builder.query({
      query: ({ coinId, timePeriode }) =>
        createRequest(
          `/coin/${coinId}/history?timePeriod=${timePeriode}&referenceCurrencyUuid=yhjMzLPhuIDl`
        ),
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetCoinByUuidQuery,
  useGetCoinHistoryQuery,
} = cryptoCoins;
