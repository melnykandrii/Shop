import Colors from '../../constants/Colors';
import { HeaderButton } from 'react-navigation-header-buttons';
import {Ionicons}from '@expo/vector-icons';
import { Platform } from 'react-native';
import React from 'react';

const DefaultHeaderButton = props => {
    return (
        <HeaderButton 
            {...props} 
            IconComponent={Ionicons} 
            iconSize={23} 
            color={Platform.OS === 'android' ? Colors.labeldroid : Colors.labelios}
        />
    );
};
export default DefaultHeaderButton;