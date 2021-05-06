import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {colors} from '../utils/index'
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'
const {PRIMARY_COLOR, SECOND_COLOR, BORDER_COLOR} = colors;
export default function WeatherDetails({currentWeather, unitsSystem}) {
    const {
        main: {feels_like, humidity, pressure},
        wind: {speed}
    } = currentWeather;
    const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`
    return (
        <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>
                <View style={styles.weatherDetailsBox1}>
                    <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR}/>
                        <View style={styles.weatherDetailsItems}>
                            <Text>Feels like:</Text>
                            <Text style={styles.textSecond}>{feels_like}°</Text>
                        </View>
                        
                    </View>
                    
                </View>
                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                            <MaterialCommunityIcons name="water" size={25} color={PRIMARY_COLOR}/>
                            <View style={styles.weatherDetailsItems}>
                                <Text>Humidity:</Text>
                                <Text style={styles.textSecond}>{humidity}%</Text>
                            </View>
                            
                    </View>
                        
                </View>
                
            </View>

            <View style={styles.weatherDetailsRow1}>
                <View style={styles.weatherDetailsBox1}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="weather-windy" size={25} color={PRIMARY_COLOR}/>
                        <View style={styles.weatherDetailsItems}>
                            <Text>Wind Speed:</Text>
                            <Text style={styles.textSecond}>{windSpeed}</Text>
                        </View>
                        
                    </View>
                    
                </View>
                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                            <MaterialCommunityIcons name="speedometer" size={25} color={PRIMARY_COLOR}/>
                            <View style={styles.weatherDetailsItems}>
                                <Text>Pressure:</Text>
                                <Text style={styles.textSecond}>{pressure} hPa</Text>
                            </View>
                            
                    </View>
                        
                </View>
                
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    weatherDetails:{
        marginTop: 'auto',
        margin: 15,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10
    },
    weatherDetailsRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    weatherDetailsRow1:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderTopWidth:1, 
        borderTopColor:BORDER_COLOR,
    },
    weatherDetailsBox1: {
        flex: 1,
        padding:20,
        borderRightWidth:1,
        borderRightColor: BORDER_COLOR
    },
    weatherDetailsBox: {
        flex: 1,
        padding:20
    },
    weatherDetailsItems:{
        alignItems:'flex-end',
        justifyContent:'flex-end'
    },
    textSecond:{
        fontSize: 15,
        color: SECOND_COLOR,
        fontWeight:'700',
        margin: 7
    }
})