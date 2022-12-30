import { useState, useEffect, React, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';


/*function start() {
    this.isRunning = true;
    this.forceUpdate();
  }
  function stop() {
    this.isRunning = false;
    this.forceUpdate();
  }*/


    export function Timer(props) {
  
        const [currentDuration, setCurrentDuration] = useState(props.duration);
        const [minutes, setCurrentMinutes] = useState(Math.floor(currentDuration / 60).toString().padStart(2, '0'));
        const [seconds, setCurrentSeconds] = useState((currentDuration % 60).toString().padStart(2, '0'));
        const ID = props.id;
        const [isRunning, setIsRunning] = useState(props.isRunning);
        //const [, updateState] = useState();
        //const forceUpdate = useCallback(() => updateState({}), []);

  

  function updateDuration() {
    setCurrentDuration(currentDuration => currentDuration - 1);
    setCurrentMinutes(Math.floor(currentDuration / 60).toString().padStart(2, '0'));
    setCurrentSeconds((currentDuration % 60).toString().padStart(2, '0'));
  }

  useEffect(() => {
    let intervalId = null;
    if (isRunning && currentDuration > 0) {
      intervalId = setInterval(updateDuration, 1000);
    } else if (currentDuration > 0) {
      
    } else {
        clearInterval(intervalId);
        props.onFinish(ID);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, currentDuration]);

  useEffect(() => {
    setIsRunning(props.isRunning);
  }, [props.isRunning]);

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