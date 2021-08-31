import AuthScreen from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import FilterNavigation from './FilterStackt';
import { Ionicons } from '@expo/vector-icons';
import MyProdNavigation from './MyProductsStack';
import { NavigationContainer } from '@react-navigation/native';
import OrdersNavigation from '../navigation/MyOrdersStack';
import { Platform } from 'react-native';
import React from 'react';
import ShopNavigation from '../navigation/ShopNavigation';
import ShopTabNavi from './ShopTabNavi';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

const MainDrawer = createDrawerNavigator();

function MainDrawerNavi() {
  return (
    <NavigationContainer>
      <MainDrawer.Navigator 
        initialRouteName="LogIn"
        backBehavior='history'
          drawerStyle={{
            backgroundColor: Platform.OS === 'android' ? Colors.headdroid : Colors.headiOS,
            width: '90%',
          }}
          drawerContentOptions={{
            activeTintColor: Platform.OS === 'android' ? Colors.labeldroid : Colors.labelios,
            inactiveTintColor: Platform.OS === 'android' ? Colors.disabledroid: Colors.disablediOS,
            itemStyle: {
              padding: 30,
              },
            labelStyle:{
              fontFamily: 'open-sans-bold',
              fontSize: 20},
          }}
          screenOptions={({ route }) => ({
            drawerIcon: ({ focused, color, size }) => {
              if (route.name === 'All Products') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'ios-home-sharp'
                        : 'ios-home-outline'
                    }
                    size= {size}
                    color={color}
                  />
                );
              } else if (route.name === 'My Products') {
                return (
                  <Ionicons
                    name={focused ? 'ios-list-sharp' : 'ios-list-outline'}
                    size= {size}
                    color={color}
                  />
                );
              } else if (route.name === 'My Orders') {
                return (
                  <Ionicons
                    name={focused ? 'basket-sharp' : 'basket-outline'}
                    size= {size}
                    color={color}
                  />
                );
              } else if (route.name === 'LogIn') {
                return (
                  <Ionicons
                    name={focused ? 'basket-sharp' : 'basket-outline'}
                    size= {size}
                    color={color}
                  />
                );
              }
            },
          })}
      >
        <MainDrawer.Screen 
            name="LogIn" 
            component={AuthScreen}
        />
        <MainDrawer.Screen 
            name="All Products" 
            component={FilterNavigation}
        />
        <MainDrawer.Screen 
            name="My Orders" 
            component={OrdersNavigation} 
        />
        <MainDrawer.Screen 
            name="My Products" 
            component={MyProdNavigation} 
        />
      </MainDrawer.Navigator>
    </NavigationContainer>
  );
}

export default MainDrawerNavi;