import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';

import Card from '../UI/Card';
import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
           
            <Button
                color={Platform.OS === 'android' ? Colors.headdroid : Colors.labelios} 
                title={showDetails ? 'Hide Details' : 'Show Details'}
                onPress={() => {
                    setShowDetails(prevState => !prevState)
                }}
            />
           
            {showDetails && (
                <View style={styles.detalItems}>
                    {props.items.map(cartItem => (
                        <CartItem 
                            key={cartItem.productId}
                            quantity={cartItem.quantity} 
                            amount={cartItem.sum} 
                            title={cartItem.productTitle}
                        />
                    ))}
                </View>
            )}
        </Card>
    )
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    detalItems: {
        width: '100%'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 14
    },
    totalAmount: {
        fontSize: 16,
        fontFamily: 'open-sans-bold',
        color: Platform.OS === 'android' ? Colors.headdroid : Colors.labelios,
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Platform.OS === 'android' ? Colors.disabledroid : Colors.disablediOS,
    }


});

export default OrderItem;