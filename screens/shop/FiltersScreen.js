import { Button, Platform, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import DefaultButton from '../../components/UI/DefaultButton';
import FilterSwitch from '../../components/UI/FilterSwitch';
import { setFilters } from '../../store/actions/products';
import {useDispatch} from 'react-redux';

const FiltersScreen = props => {
    const {navigation} = props;

    const [isClothes, setIsClothes] = useState(false);
    const [isElectronic, setIsElectronic] = useState(false);
    const [isBook, setIsBook] = useState(false);
    const [isHomeDeco, setIsHomeDeco] = useState(false);
    const [isOffice, setIsOffice] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            clothes: isClothes,
            electronic: isElectronic,
            book: isBook,
            homeDeco: isHomeDeco,
            office: isOffice
        };
        dispatch(setFilters(appliedFilters));
        console.log(appliedFilters);
    }, [isClothes, isElectronic, isBook, isHomeDeco, isOffice, dispatch]);

    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters, navigation]);
    
    return (
        <View style={styles.screen}>
            <FilterSwitch
                label='Clothes'
                state={isClothes}
                onChange={newValue => setIsClothes(newValue)}
            />
            <FilterSwitch
                label='Electronic'
                state={isElectronic}
                onChange={newValue => setIsElectronic(newValue)}
            />
            <FilterSwitch
                label='Book'
                state={isBook}
                onChange={newValue => setIsBook(newValue)}
            />
            <FilterSwitch
                label='Home Deco'
                state={isHomeDeco}
                onChange={newValue => setIsHomeDeco(newValue)}
            />
            <FilterSwitch
                label='Office'
                state={isOffice}
                onChange={newValue => setIsOffice(newValue)}
            />
            <DefaultButton
                title='Save'  
                onPress={() => {
                    props.route.params.save();
                    navigation.goBack();
            }} />
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white"
    }
});
export default FiltersScreen;