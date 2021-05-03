import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
const API_KEY = 'd9089573dfa7d293dd8759932fe923e1';

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'; //Use https:// to make url valid
export default function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');//for celsius
  useEffect(() => {
    load(); //async function
  }, []);

  async function load(){//Ask location permission
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
        <StatusBar style="auto" />
        <View style={styles.main}>
          <WeatherInfo currentWeather={currentWeather}/> 
        </View>
      </View>//Custom components like weatherInfo used like html tags
    );} 
    else{
      return (//JSX expression
        /*Div element, elements mapped to IOS/Android components*/
        <View style={styles.container}>
          <Text>{errorMessage}</Text>
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
