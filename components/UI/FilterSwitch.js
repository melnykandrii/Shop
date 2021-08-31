import { Platform, StyleSheet, Switch, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import React from 'react';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch 
                trackColor={{
                    false: Platform.OS === 'android' ? Colors.disabledroid : Colors.disablediOS, 
                    true: Platform.OS === 'android' ? Colors.headdroid : Colors.labelios
                }}
                thumbColor={Platform.OS === 'android' ? Colors.labeldroid : ''}
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        width: '80%',
        marginVertical: 12,
        marginTop: 30
    }
});
export default FilterSwitch;