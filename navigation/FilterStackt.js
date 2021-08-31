import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import FiltersScreen from '../screens/shop/FiltersScreen';
import HeaderButton from '../components/UI/HeaderButton';
import React from 'react';
import ShopNavigation from './ShopNavigation';
import { TransitionPresets } from '@react-navigation/stack';

const FilterNavi = createStackNavigator();
function FilterNavigation() {
  return (
      <FilterNavi.Navigator
      mode="modal"
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
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.6],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
      >
          <FilterNavi.Screen 
            name="Sale Market" 
            component={ShopNavigation}
            options={{
              headerShown: false,
            }}
        />
        <FilterNavi.Screen 
            name="Filters" 
            component={FiltersScreen}
            options={({navigation, route}) => ({
              headerShown: true,
              title: 'Filters',
              ...TransitionPresets.FadeFromBottomAndroid,
              headerLeft: (props) => (
                  <HeaderButtons HeaderButtonComponent={HeaderButton}>
                      <Item 
                          title='Close' 
                          iconName="close-outline"
                          onPress={() => {
                          navigation.goBack();
                          //console.log('Search tapped')
                          //navigation.navigate('Categories')
                          }}
                      />
                  </HeaderButtons>
              ),
              headerRight: (props) => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title='Save' 
                        iconName='checkmark-outline'
                        onPress={() => {
                        //navigation.toggleDrawer();
                        //console.log('Search tapped')
                        route.params.save();
                        navigation.goBack();
                        }}
                    />
                </HeaderButtons>
            ),
          })}
        />
      </FilterNavi.Navigator>
  );
};
export default FilterNavigation