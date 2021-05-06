import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import {colors} from './utils/index';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
const API_KEY = 'd9089573dfa7d293dd8759932fe923e1';

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'; //Use https:// to make url valid
export default function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');//for celsius
  useEffect(() => {
    load(); //async function
  }, [unitsSystem],[currentWeather]);

  async function load(){//Ask location permission + update weather data via api call
    setCurrentWeather(null);
    setErrorMessage(null);
    try{
      let {status} = await Location.requestForegroundPermissionsAsync();

      if(status != 'granted'){
        setErrorMessage('Location Access Needed to Run App !');
        return;
      }
      const location = await Location.getCurrentPositionAsync();


      const {latitude, longitude} = location.coords; 

      const weather_url = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${API_KEY}`;

      const response = await fetch(weather_url);
      //alert(`Latitude : ${latitude}, Longitude: ${longitude}`);
      const result = await response.json();

      if(response.ok){
        setCurrentWeather(result);
      }
      else{
        setErrorMessage(result.message);
      }
    }
    catch(error){
      setErrorMessage(error.message);
    }
  }

  if(currentWeather){
    const {main : {temp}} = currentWeather;/*Accessing 2 levels of deconstruction*/
    return (//JSX expression
      /*Div element, elements mapped to IOS/Android components*/
      <View style={styles.container}>
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/> 
          <ReloadIcon load={load}/> {/*Pass a function*/}
          <WeatherInfo currentWeather={currentWeather}/> 
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
      </View>
    );} //Custom components like weatherInfo used like html tags
    else if(errorMessage){
      return (//JSX expression
        /*Div element, elements mapped to IOS/Android components*/
        <View style={styles.container}>
          <Text>{errorMessage}</Text>
        </View>
      );
   }
   else{
    return (//JSX expression
      /*Div element, elements mapped to IOS/Android components*/
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/> {/*To avoid blank loading screen */}
        <StatusBar style="auto" />
      </View>
    );
   }
}


const styles = StyleSheet.create({ //Styles object
  container: {//Not CSS
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});
