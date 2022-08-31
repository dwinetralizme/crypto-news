import { configureStore } from "@reduxjs/toolkit";
import { cryptoCoins } from "../services/cryptoCoinsApi";
// import { apiSlice } from "../services/cryptoStatusApi";
// import { useFetchBreedQuery } from "../services/cryptoStatusApi";

export default configureStore({
  reducer: {
    [cryptoCoins.reducerPath]: cryptoCoins.reducer,
    // [useFetchBreedQuery.reducerPath]: useFetchBreedQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      cryptoCoins.middleware
    ),
});
