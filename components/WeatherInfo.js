//Handles weather information

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {colors} from '../utils/index';

const {PRIMARY_COLOR, SECOND_COLOR} = colors;
//Use rnf shortcut
export default function WeatherInfo({currentWeather}) {
    
    const {main:{temp},
           weather: [details], //Details is an array with id, main, description, icon
           name,
        } = currentWeather;
    const {icon, main, description} = details;//Variables from weather array

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    return (
        //assign iconUrl to uri
        <View style={styles.weatherInfo}>
            <Text>{name}</Text>
            <Image style={styles.weatherIcon} source={{uri: iconUrl}}/> 
            <Text style={styles.textPrimary}>{temp}°</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.textSecond}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
    },
    weatherIcon: {
        width:100,
        height:100
    },
    weatherDescription: {
        textTransform: 'capitalize' //Or uppercase
    },
    textPrimary:{
        fontSize:40,
        color: PRIMARY_COLOR
    },
    textSecond:{
        fontSize:20,
        color: SECOND_COLOR,
        fontWeight: '500',
        marginTop:10
    }
})