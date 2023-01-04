import { useState, useEffect, React, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';



    export function Timer(props) {
  
        const [currentDuration, setCurrentDuration] = useState(props.duration);
        const [minutes, setCurrentMinutes] = useState(Math.floor(currentDuration / 60).toString().padStart(2, '0'));
        const [seconds, setCurrentSeconds] = useState((currentDuration % 60).toString().padStart(2, '0'));
        const [ID, setCurrentID] = useState(props.id);
        const [isRunning, setIsRunning] = useState(props.isRunning);
        //const [, updateState] = useState();
        //const forceUpdate = useCallback(() => updateState({}), []);
  

  function updateDuration() {
    
    setCurrentDuration(currentDuration => currentDuration - 1);
    setCurrentMinutes(Math.floor(currentDuration / 60).toString().padStart(2, '0'));
    setCurrentSeconds((currentDuration % 60).toString().padStart(2, '0'));
    
  }
  let intervalId = null;
  //added this to try and set the timer straight away when timer changes, untested
  //updateDuration();

  useEffect(() => {
    //let intervalId = null;
    if (isRunning && currentDuration > -1) {
      intervalId = setInterval(updateDuration, 1000);
      console.log(currentDuration);
    } else if (isRunning && currentDuration < 0) {
      clearInterval(intervalId);
      props.onFinish(ID);
      return;
    } else {
         
    }
      
    return () => clearInterval(intervalId);
  }, [isRunning, currentDuration, ID]);

  useEffect(() => {
    setIsRunning(props.isRunning);
  }, [props.isRunning]);

  useEffect(() => {
    setCurrentDuration(props.duration);
  }, [props.duration]);

  useEffect(() => {
    setCurrentID(props.id);
  }, [props.id]);

  return (
    <View style = {timerStyles.timerBox}>
        
            <Text style = {{fontSize: 110, color: '#2D2A32'}} >{minutes}:{seconds}</Text>
        
        <View style = {timerStyles.progressBar}>
        
        </View>
    </View>
  );
}
const timerStyles = StyleSheet.create({

        timerBox: {
          
            height:310,
            width: '90%',
            borderWidth: 2,
            borderRadius: 155,
            borderColor: '#2D2A32',
            flexDirection: 'column',
            paddingTop: 70,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
        },
  
        progressBar: {
            flex: 1,


        },

});