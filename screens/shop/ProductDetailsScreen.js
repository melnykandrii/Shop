import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';

import { Button, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors';

const ProductDetailsScreen = props => {

const prodId = props.route.params.productId;

const selectedProduct = useSelector(state => 
    state.products.availableProducts.find(prod => prod.id === prodId)
);

//const currentProductIsFavorite = useSelector(state => state.products.favoriteProducts.some(prod => prod.id === prodId));

const dispatch = useDispatch();
/*
const toggleFavoriteHandler = useCallback(() => {
    dispatch(productActions.toggleFavorite(prodId));
}, [dispatch, prodId]);

useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavoriteHandler});
},[toggleFavoriteHandler]);

useEffect(() => {
    props.navigation.setParams({isFav: currentProductIsFavorite});
},[currentProductIsFavorite]);*/

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.buttonCont}>
                <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
                <Button color={Platform.OS === 'android' ? Colors.headdroid : Colors.labelios}  title="Add to Cart" onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct));
                }} />
            </View>
            <View>
            <Text style={styles.descriptionHeader}>Description:</Text>
            <Text style={styles.descriptionText}>{selectedProduct.description}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width:"100%",
        height: 300
    },
    buttonCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: Platform.OS === 'android' ? Colors.headdroid : Colors.labelios,
        textAlign:'center',
        marginVertical: 10
    },
    descriptionHeader: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        textAlign: 'justify',
        marginHorizontal: 20
    },
    descriptionText: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'justify',
        marginHorizontal: 20
    }
});

export default ProductDetailsScreen;