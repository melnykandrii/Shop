import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton'
import { Platform } from 'react-native';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import React from 'react';
import ShopTabNavi from './ShopTabNavi';

const ShopNavi = createStackNavigator();

function ShopNavigation() {
  return (
      <ShopNavi.Navigator
        initialRouteName='Sale Market'
        headerMode='screen'
        screenOptions={{
          headerTitleAllowFontScaling: true,
          headerBackTitleVisible: false,
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
        <ShopNavi.Screen 
            name="Sale Market" 
            component={ShopTabNavi}
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
              headerRight: (props) => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title='Filter' 
                        iconName={Platform.OS === 'android' ? 'filter-sharp' : 'filter-outline'}
                        onPress={() => {
                        //navigation.toggleDrawer();
                        //console.log('Search tapped')
                        navigation.navigate('Filters')
                        }}
                    />
                    <Item 
                        title='Cart' 
                        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        onPress={() => {
                        //navigation.toggleDrawer();
                        //console.log('Search tapped')
                        navigation.navigate('Cart')
                        }}
                    />
                </HeaderButtons>
            ),
          })}
        />
        <ShopNavi.Screen 
            name="Product Details" 
            component={ProductDetailsScreen}
            options={({route, navigation}) => ({ 
              title: route.params?.productTitle ?? 'Product Details', 
              gestureEnabled: true,
              headerRight: (props) => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title='Favorite' 
                        iconName={route.params.isFav ? 'heart-sharp' : 'heart-outline'}
                        onPress={() => {
                        //navigation.toggleDrawer();
                        console.log('Fav_tapped')
                        //navigation.navigate('Cart')
                        route.params.toggleFav();
                        }}
                    />
                    <Item 
                        title='Cart' 
                        iconName='md-cart'
                        onPress={() => {
                        //navigation.toggleDrawer();
                        //console.log('Search tapped')
                        navigation.navigate('Cart')
                        }}
                    />
                    
                </HeaderButtons>
            ),
            })}
        />
        <ShopNavi.Screen 
            name="Cart" 
            component={CartScreen} 
        />
      </ShopNavi.Navigator>
  );
};

export default ShopNavigation;