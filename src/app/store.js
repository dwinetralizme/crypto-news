import { configureStore } from '@reduxjs/toolkit'
import { cryptoCoins } from '../services/cryptoCoinsApi'
import { cryptoNewsApi } from '../services/cryptoNewsApi'

export default configureStore({
  reducer: {
    [cryptoCoins.reducerPath]: cryptoCoins.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      cryptoCoins.middleware,
      cryptoNewsApi.middleware
    ),
})
