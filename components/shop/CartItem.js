import { Button, Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

import Colors from '../../constants/Colors';
import {Ionicons}from '@expo/vector-icons';
import React from 'react';

const CartItem = props => {
   let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return(
            <View style={styles.cartItem}>
                <View style={styles.itemData}>
                    <Text style={styles.quantity}>{props.quantity}  </Text>
                    <TouchableOpacity onPress={props.onViewDetails} >
                        <Text style={styles.mainText}>{props.title} </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemData}>
                    <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
                    {props.deletable && (
                        <TouchableOpacity 
                            onPress={props.onRemove} 
                            style={styles.deleteButton}>
                            <Ionicons 
                                name={Platform.OS === 'android' ? 'trash-outline' : 'ios-trash'} 
                                size = {20} 
                                color = 'silver'//{Platform.OS === 'android' ? Colors.headdroid : Colors.labelios} 
                            />
                        </TouchableOpacity>
                    )}

                </View>
            </View>
        
    );
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5
        
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    quantity: {
        fontFamily: 'open-sans',
        fontSize: 12,
        color: Platform.OS === 'android' ? Colors.headdroid : Colors.labelios
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 14
    },
    deleteButton: {
        marginLeft: 20
    }

});

export default CartItem;