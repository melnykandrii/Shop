import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';
import FavoritesScreen from '../screens/shop/FavoritesScreen';
import HeaderButton from '../components/UI/HeaderButton'
import { Platform } from 'react-native';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import React from 'react';
import ShopScreen from '../screens/shop/ShopScreen';

const FavNavi = createStackNavigator();

function FavNavigation() {
  return (
      <FavNavi.Navigator
        initialRouteName='Favorites'
        headerMode='screen'
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.headdroid : Colors.headiOS
          },
          headerTintColor: Platform.OS === 'android' ? Colors.labeldroid : Colors.labelios,
          headerTitleAlign: 'center',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitleStyle: {
            fontFamily: 'open-sans-bold',
            fontSize: 22
          },
          headerBackTitleStyle: {
            fontFamily: 'open-sans',
          }
        }}
      >
        <FavNavi.Screen 
            name="Favorites" 
            component={FavoritesScreen}
        />
      </FavNavi.Navigator>
  );
};

export default FavNavigation