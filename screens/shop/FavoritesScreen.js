import * as cartActions from '../../store/actions/cart';

import { Button, FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import DefaultEmptyScreen from '../../components/UI/EmptyScreen';
import ProductItem from '../../components/shop/ProducItem';
import React from 'react';

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.products.favoriteProducts);

    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('Product Details', {
            productId: id,
            productTitle: title
            });
    };

    if(favMeals.length === 0 || !favMeals) {
        return (
            <DefaultEmptyScreen 
            title="You don't have Favorite products ."
            subTitle='All your favorite products will be here once you mark them. Tap on the button to start shopping.'
            buttonTitle='Shop'
            navigateTo={() => {
                props.navigation.navigate('All Products')
            }}
            />
        )
    }
    return (
        <FlatList 
        data={favMeals} 
        keyExtractor={item => item.id} 
        renderItem={itemData => (
            <ProductItem 
                image={itemData.item.imageUrl} 
                title={itemData.item.title} 
                price={itemData.item.price} 
                onSelect={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}
            >
                <Button 
                    color={Platform.OS === 'android' ? Colors.headdroid : Colors.labelios} 
                    title='View Details' 
                    onPress={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }} 
                />
                <Button 
                    color={Platform.OS === 'android' ? Colors.headdroid : Colors.labelios} 
                    title='Add to Cart' 
                    onPress={() => {
                        dispatch(cartActions.addToCart(itemData.item));
                    }} 
                />
            </ProductItem>
        )} 
    />
    );
};

export default FavoritesScreen;