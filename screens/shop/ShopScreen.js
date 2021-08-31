import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';

import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import DefaultEmptyScreen from '../../components/UI/EmptyScreen';
import { Platform } from 'react-native';
import ProductItem from '../../components/shop/ProducItem';

const ShopScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);

   // const displayedProducts = useSelector(state => state.products.filteredProducts);
/*
    const prodId = products.id;

    const availableProducts = useSelector(state => state.products.filteredProducts);

    const displayedProducts = availableProducts.filter(
        product => product.id.indexOf(prodId) >= 0
    );
*/
    const dispatch = useDispatch();

    useEffect(() => {
       
        const loadProducts = async () => { 
            setIsLoading(true);
            try {
                await dispatch(productsActions.fetchProducts()); 
            } catch (err) {
                setError(err.message);
            }
            
            setIsLoading(false);   
        };
        loadProducts();
    }, [dispatch]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('Product Details', {
            productId: id,
            productTitle: title
            });
    };

    if (error) {
        return <View style={styles.indicator}> 
            <Text>An error ocurred!</Text>
            <Text></Text>
            <Button title='Try again' onPress={() => {}}/>
        </View>
    }

    if (isLoading) {
        return <View style={styles.indicator}> 
            <ActivityIndicator size='large' color={Platform.OS === 'android' ? Colors.headdroid : Colors.labelios}/>
        </View>
    }

    if (!isLoading && products.length === 0){
        return(
            <DefaultEmptyScreen 
            title="There is no product available for you."
            subTitle='You can add your products if you`d like. It will be available for you and for everyone. Tap on the button and start adding.'
            buttonTitle='My Product'
            navigateTo={() => {
                console.log('Add a product screen navigation')
                props.navigation.navigate('My Products')
            }}
            />
        )
    }
    
    return (
    <FlatList 
        data={products} 
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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicator: {
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export default ShopScreen;