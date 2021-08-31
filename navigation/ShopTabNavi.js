import { Platform, Text } from 'react-native';

import Colors from '../constants/Colors';
import FavStack from './FavStack';
import FavoritesScreen from '../screens/shop/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import ShopNavigation from './ShopNavigation';
import ShopScreen from '../screens/shop/ShopScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useSelector } from 'react-redux';

const FavTabNavi = Platform.OS === 'android' && Platform.Version >= 21 
    ? createMaterialBottomTabNavigator() 
    : createBottomTabNavigator();

function ShopTabNavi() {
  const favMeals = useSelector(state => state.products.favoriteProducts);  
    return (
        <FavTabNavi.Navigator
        activeColor= {Colors.labeldroid}
        shifting='true'
        backBehavior='none'
        screenOptions={({ route }) => ({
            headerBackTitleVisible: false,
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'All Products') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'card'
                        : 'card-outline'
                    }
                    size= {18}
                    color={color}
                  />
                );
              } else if (route.name === 'Favorites') {
                return (
                  <Ionicons
                    name={focused ? 'ios-star-sharp' : 'ios-star-outline'}
                    size= {18}//{size}
                    color={color}
                  />
                );
              }
            },
          })}
            tabBarOptions={{
                activeTintColor: Platform.OS === 'android' ? Colors.labeldroid : Colors.labelios,
                inactiveTintColor: Platform.OS === 'android' ? Colors.disabledroid: Colors.disablediOS,
                labelStyle: {
                    fontFamily: 'open-sans-bold',
                    fontSize: 10
                },
                style: {
                    backgroundColor: Platform.OS === 'android' ? Colors.headdroid : Colors.headiOS
                }
            }}
        >
            <FavTabNavi.Screen
                name='All Products'
                component={ShopScreen}
                options={{
                    tabBarColor: Colors.headdroid,
                    //tabBarLabel:Platform.OS === 'android' ? <Text style={{fontFamily:'open-sans-bold'}}>All Products</Text> : 'All Products'
                }}
            />
            <FavTabNavi.Screen
                name='Favorites'
                component={FavoritesScreen}
                options={{
                    //tabBarBadge: favMeals.length,
                    tabBarColor: Colors.headdroid,
                    //tabBarLabel:Platform.OS === 'android' ? <Text style={{fontFamily:'open-sans-bold'}}>Favorities</Text> : 'Favorities'
                }}
            />
        </FavTabNavi.Navigator>
    );
}

export default ShopTabNavi