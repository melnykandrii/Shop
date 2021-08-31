import * as productsActions from '../../store/actions/products';

import { ActivityIndicator, Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import DefaultEmptyScreen from '../../components/UI/EmptyScreen';
import ProductItem from '../../components/shop/ProducItem';

const UserProductsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const userProducts = useSelector(state => state.products.userProducts);
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

    const editProductHandler = (id, title) => {
        props.navigation.navigate('Edit Product', {
            productId: id,
            productTitle: title
            });
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: 'default'}, 
            {text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(productsActions.deleteProduct(id));
            }}
        ]);
   };

   if (error) {
        return (
            <View style={styles.indicator}> 
                <Text>An error ocurred!</Text>
                <Text></Text>
                <Button title='Try again' onPress={() => {}}/>
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.indicator}> 
                <ActivityIndicator size='large' color={Platform.OS === 'android' ? Colors.headdroid : Colors.labelios}/>
            </View>
        )
    }

    if (!isLoading && userProducts.length === 0){
        return(
            <DefaultEmptyScreen 
            title="You don't have any products."
            subTitle='After adding it will appear here. Tap on the button to start adding.'
            buttonTitle='Add My Product'
            navigateTo={() => {
                console.log('Add a product screen navigation')
                props.navigation.navigate('Edit Product')
            }}
            />
        )
    }
        return (
            <FlatList 
                data={userProducts} 
                keyExtractor={item => item.id} 
                renderItem={itemData => (
                    <ProductItem
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            editProductHandler(itemData.item.id, itemData.item.title)
                        }}
                    >
                        <Button 
                            color={Platform.OS === 'android' ? Colors.headdroid : Colors.labelios} 
                            title='Edit' 
                            onPress={() => {
                                editProductHandler(itemData.item.id, itemData.item.title)
                            }} 
                        />
                        <Button 
                            color={Platform.OS === 'android' ? Colors.headdroid : Colors.labelios} 
                            title='Delete' 
                            onPress={() => {
                                deleteHandler(itemData.item.id)
                            }} 
                        />
                    </ProductItem>
                )} 
            />
    );
};

const styles = StyleSheet.create({
    indicator: {
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export default UserProductsScreen;