import { Button, Platform } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import React from 'react';

const OrdersNavi = createStackNavigator();

function OrdersNavigation() {
    return (
        <OrdersNavi.Navigator
          initialRouteName='My Orders'
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
          <OrdersNavi.Screen 
              name="My Orders" 
              component={OrdersScreen}
              options={({navigation}) => ({
                headerLeft: (props) => (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title='Menu' 
                            iconName={Platform.OS === 'android' ? 'logo-android' : 'logo-apple'}
                            onPress={() => {
                            navigation.toggleDrawer();
                            //console.log('Search tapped')
                            //navigation.navigate('Categories')
                            }}
                        />
                    </HeaderButtons>
                ),
            })}
          />
        <OrdersNavi.Screen 
            name="Product Details" 
            component={ProductDetailsScreen}
            options={({route, navigation}) => ({ 
              title: route.params.productTitle, gestureEnabled: true,
            })}
        />
        </OrdersNavi.Navigator>
    );
  };
  
  export default OrdersNavigation;