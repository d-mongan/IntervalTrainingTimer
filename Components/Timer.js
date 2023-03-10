import { useState, useEffect, React } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Audio } from 'expo-av';


    export function Timer(props) {
  
      
        const [currentDuration, setCurrentDuration] = useState(props.duration);
        const [minutes, setCurrentMinutes] = useState(Math.floor(currentDuration / 60).toString().padStart(2, '0'));
        const [seconds, setCurrentSeconds] = useState((currentDuration % 60).toString().padStart(2, '0'));
        const [ID, setCurrentID] = useState(props.id);
        const [isRunning, setIsRunning] = useState(props.isRunning);
        const [index, setCurrentIndex] = useState(props.index);
        const [timer, setTimer] = useState(props.timer)
       // const [, updateState] = useState();
        //const forceUpdate = useCallback(() => updateState({}), []);

        //sounds
        async function playWarningSound(){
          let warningSound = new Audio.Sound();
          await warningSound.loadAsync(require('../assets/warningAlarm.wav'));
          warningSound.playAsync(1);
        }
        
        useEffect(() => {
          setIsRunning(props.isRunning);
        }, [props.isRunning]);
      
        useEffect(() => {
          setCurrentDuration(props.duration);
        }, [props.duration]);
      
        useEffect(() => {
          setTimer(props.timer);
          updateTimer();
        }, [props.timer]);

  function updateDuration() {
    
    setCurrentDuration(currentDuration => currentDuration - 1);
    setCurrentMinutes(Math.floor(currentDuration / 60).toString().padStart(2, '0'));
    setCurrentSeconds((currentDuration % 60).toString().padStart(2, '0'));
    
  }
  function updateTimer(){
    setCurrentDuration(props.timer.intervalDuration);
          setCurrentMinutes(Math.floor(props.timer.intervalDuration / 60).toString().padStart(2, '0'));
          setCurrentSeconds((props.timer.intervalDuration % 60).toString().padStart(2, '0'));

  }
  let intervalId = null;

  useEffect(() => {
    //let intervalId = null;
    if (isRunning && currentDuration > -1) {
      intervalId = setInterval(updateDuration, 1000);
      if(currentDuration < 3 && currentDuration > -1){
        playWarningSound()
      }
      console.log(currentDuration);
    } else if (isRunning && currentDuration < 0) {
      
      props.onFinish(ID);
      //return;
    } else  {
      //timer paused
         
    }
      
    return () => clearInterval(intervalId);
  }, [isRunning, currentDuration, timer]);

  

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