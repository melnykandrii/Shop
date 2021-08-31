import * as productsActions from '../../store/actions/products'

import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import DefaultButton from '../../components/UI/DefaultButton';
import DefaultInputCont from '../../components/UI/InputComponent';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const EditProductScreen = props => {
    const prodId = props.route.params?.productId ?? 'p432';
    //const prodId = props.route.params.productId
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        }, 
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        }, 
        formIsValid: editedProduct ? true : false
    });
/*
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
*/
    

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check errors in the form.', [{text: 'Ok'}])
            return;
        }
        if (editedProduct) {
            dispatch(
                productsActions.updateProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl
                )
            );
        } else {
            dispatch(
                productsActions.createProduct(
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl, 
                    +formState.inputValues.price
                )
            );
        }
        props.navigation.goBack()
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE, 
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        }, 
        [dispatchFormState]
    );
    
    return (
        <KeyboardAvoidingView style={styles.keyboard} behavior='padding' keyboardVerticalOffset={50}>
        <ScrollView>
            <View style={styles.form}>
                <DefaultInputCont 
                    id="title"
                    label='Title'
                    errorText='Please enter a valid title!'
                    //value={formState.inputValues.title} 
                    //onChangeText={textChangeHandler.bind(this, 'title')} 
                    keyboard='default' 
                    autoCapitalize='words' 
                    autoCorrect
                    returnKey='next'
                    submit={() => this.urlRef.focus()}
                    blur={false}
                    placeholder="Title"
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid={!!editedProduct}
                    required
                />
                <DefaultInputCont 
                    id="imageUrl"
                    label='Image URL' 
                    errorText='Please enter a valid image url!'
                    //value={formState.inputValues.imageUrl} 
                    //onChangeText={textChangeHandler.bind(this, 'imageUrl')} 
                    keyboard='url' 
                    returnKey='next'
                    submit={() => editedProduct ? this.descRef.focus() : this.priceRef.focus()} 
                    onInputChange={inputChangeHandler}
                    inputRef={urlRef => this.urlRef = urlRef}
                    blur={false}
                    placeholder="ImageUrl"
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid={!!editedProduct}
                    required
                    
                />
                {editedProduct ? null : (
                    <DefaultInputCont 
                        id='price'
                        label='Price'
                        errorText='Please enter a valid price!'
                        //value={formState.inputValues.price} 
                        //onChangeText={textChangeHandler.bind(this, 'price')} 
                        keyboard='decimal-pad'
                        returnKey='next'
                        submit={() => this.descRef.focus()} 
                        inputRef={priceRef => this.priceRef = priceRef}
                        blur={false}
                        placeholder="0.00"
                        onInputChange={inputChangeHandler}
                        required
                        min={0.1}
                    />
                )}
                <DefaultInputCont 
                    id='description'
                    label='Description'
                    //value={formState.inputValues.description} 
                    //onChangeText={textChangeHandler.bind(this, 'description')} 
                    keyboard='default' 
                    autoCapitalize='sentences' 
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    returnKey='done'
                    submit={() => {props.route.params.submit()}} 
                    inputRef={descRef => this.descRef = descRef}
                    blur={false}
                    placeholder="Description"
                    errorText='Please enter a Description'
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initiallyValid={!!editedProduct}
                    required
                    minLength={5}
                />
            </View>
            <DefaultButton 
                    title='Save' 
                    onPress={() => {
                        props.route.params.submit();
                    }} 
                />
        </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboard:{
        flex: 1
    },
    form: {
        margin: 20
    }
});


export default EditProductScreen;