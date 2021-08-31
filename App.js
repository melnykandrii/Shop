import 'react-native-gesture-handler';

import * as Font from 'expo-font';

import React, { useState } from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import AppLoading from 'expo-app-loading';
import MainDrawerNavi from './navigation/MainDrawerNavi';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { StatusBar } from 'expo-status-bar';
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart';
import { composeWithDevTools } from 'redux-devtools-extension';
import ordersReducer from './store/reducers/order'
import productsReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk), composeWithDevTools());

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainDrawerNavi />
      <StatusBar style="auto" />
    </Provider>
  );
}
