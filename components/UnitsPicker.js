import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {Picker} from '@react-native-picker/picker';
export default function UnitsPicker({unitsSystem, setUnitsSystem}) {
    return (
        <View style={styles.unitsSystem}>
            <Picker selectedValue={unitsSystem} onValueChange={(item)=> setUnitsSystem(item)} mode="dropdown"> {/*So that the picker stays at the selected item*/}
                <Picker.Item label="C°" value="metric"/>
                <Picker.Item label="F°" value="imperial"/>
            </Picker>
        </View>
    )
}
const styles = StyleSheet.create({
    unitsSystem: {
        ...Platform.select({
            ios:{
                top:-20,
                position: 'absolute'
            },
            android:{
                top:20,
                position: 'absolute'
            },
            
        }),
        left: 20,
        height: 50,
        width: 100
    }
})