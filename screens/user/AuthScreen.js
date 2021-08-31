import * as authActions from '../../store/actions/auth';

import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import Input from '../../components/UI/Input';
import { LinearGradient } from 'expo-linear-gradient';
import { act } from 'react-test-renderer';
import { useDispatch } from 'react-redux';

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
    for (const key in updatedValidities) {
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

const AuthScreen = props => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
        email: '',
        password: ''
        },
        inputValidities: {
        email: false,
        password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if(error) {
            Alert.alert('An Error Occured!', error, [{text: 'Ok'}]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignUp){
            action = authActions.signup(
                    formState.inputValues.email,
                    formState.inputValues.password
                );
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('All Products')
        } catch(err) {
            setError(err.message);
            setIsLoading(false);
        }
        
    };

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
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? 'padding' : 'height'}
        keyboardVerticalOffset={50}
        style={styles.screen}
        >
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <Card style={styles.authContainer}>
            <ScrollView>
                <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue=""
                />
                <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={inputChangeHandler}
                initialValue=""
                />
                <View style={styles.buttonContainer}>
                {isLoading ? (
                    <ActivityIndicator size='small' color={Colors.primaryColor}/>
                ) : (
                <Button
                    title={isSignUp ? 'Sign Up' : 'Log In'}
                    color={Colors.primary}
                    onPress={authHandler}
                />)}
                </View>
                <View style={styles.buttonContainer}>
                <Button
                    title={`Switch to ${isSignUp ? 'Log In' : 'Sign Up'}`}
                    color={Colors.accent}
                    onPress={() => {
                        setIsSignUp(prevState => !prevState);
                    }}
                />
                </View>
            </ScrollView>
            </Card>
        </LinearGradient>
        </KeyboardAvoidingView>
    );
    };

    AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
    };

    const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
    });

    export default AuthScreen;
