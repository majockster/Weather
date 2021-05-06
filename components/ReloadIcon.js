import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { colors } from '../utils/index';
export default function ReloadIcon({load}) {
    
    const refreshIconName = Platform.OS === "ios" ? "ios-refresh" : "md-refresh";
    //const refreshIconName = 'ios-refresh';
    return (
        <View style={styles.reloadIcon}>
            <Ionicons onPress={load} name={refreshIconName} size={24} color={colors.PRIMARY_COLOR}/>
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon: {
        
        ...Platform.select({
            ios:{
               position: 'absolute',
               top:30,
               right:20 
            },
            default:{
                top: -50,
                left: 1875
            }
        }),
       
    }
})