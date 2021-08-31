import { Button, Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

import Card from '../UI/Card';
import Colors from '../../constants/Colors';
import React from 'react';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return(
            <Card style={styles.product}>
                <View style={styles.touchable}>
                    <TouchableCmp onPress={props.onSelect} useForeground>
                        <View>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{uri: props.image}} />
                            </View>
                        
                            <View style={styles.details}>
                                <Text style={styles.title}>{props.title}</Text>
                                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                            </View>
                            <View style={styles.buttons}>
                                {props.children}
                            </View>
                        </View>
                    </TouchableCmp>
                </View>
            </Card>
        
    );
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
        
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width:'100%',
        height: '60%'
    },
    image: {
        width:'100%',
        height: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 5,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        marginVertical: 2,
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: Colors.headdroid,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20

    }

});

export default ProductItem;