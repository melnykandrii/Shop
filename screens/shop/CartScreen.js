import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/order';

import { Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Card from '../../components/UI/Card';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import DefaultEmptyScreen from '../../components/UI/EmptyScreen';
import React from 'react';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });
    const dispatch = useDispatch();

    if (cartItems.length === 0){
        return (
            <DefaultEmptyScreen 
            title='The cart is empty.'
            subTitle='After adding a product it will appear here. Tap on the button to start shopping.'
            buttonTitle='Shop'
            navigateTo={() => {
                console.log('Cart Screen navigation')
                props.navigation.navigate('Sale Market')
            }}
            />
        )
    }
    
    return (
        <View style={styles.screen}>
            <Text style={styles.headerTitle}>Added Products</Text>
            <View style={styles.tablehead}>
                <Text style={styles.headerQty}>QTY</Text><Text style={styles.headerName}>Name</Text><Text style={styles.headerPrice}>Price</Text>
            </View>
            <FlatList 
                data={cartItems} 
                keyExtractor={item => item.productId} 
                renderItem={itemData => (
                    <CartItem 
                        quantity={itemData.item.quantity} 
                        title={itemData.item.productTitle} 
                        amount={itemData.item.sum} 
                        deletable
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                        onViewDetails={() => {
                            props.navigation.navigate('Product Details', {
                            productId:itemData.item.productId,
                            productTitle:itemData.item.productTitle
                            });
                        }}
                    />
                )}
            />
            <View style={styles.summary}>
                
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) *100) / 100}</Text></Text>
                
            </View>
            <View style={styles.buttonCont}>
                <Button 
                        color={Platform.OS === 'android' ? Colors.headdroid : Colors.labelios} 
                        title="Order Now" 
                        disabled={cartItems.length === 0}
                        onPress={() => {
                            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
                            props.navigation.navigate('Sale Market');
                            //props.navigation.goBack()
                            props.navigation.navigate('My Orders');
                        }}
                    />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    headerTitle: {
        fontFamily: 'open-sans-bold',
        fontSize:20,
        textAlign: 'center'
    },
    tablehead: {
        flexDirection:'row',
        justifyContent: 'flex-end',
    },
    headerQty: {
        fontFamily: 'open-sans',
        fontSize: 13,
        marginRight:'2%'
    },
    headerName: {
        fontFamily: 'open-sans',
        fontSize: 13,
        marginRight: '50%'
    },
    headerPrice: {
        fontFamily: 'open-sans',
        fontSize: 13,
        marginRight: '20%'
    },
    summary: {
        flexDirection:'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
    },
    summaryText:{
        fontFamily: 'open-sans-bold',
        fontSize:18,
    },
    amount: {
        color: Platform.OS === 'android' ? Colors.headdroid : Colors.labelios,
    },
    buttonCont: {
        marginVertical: 10,
        alignItems: Platform.OS === 'android' ? 'stretch' : 'center'
    },
});
export default CartScreen;