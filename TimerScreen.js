import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Modal } from 'react-native';
import { useState, useCallback } from 'react';
import { Timer } from './Components/Timer';
import { useNavigation } from '@react-navigation/native';

function TimerScreen({route, navigation}) {
    /*list of props:
                      onDelete = {removeTimerHandler}
                      onPress = {openTimerHandler}
                      name = {itemData.item.intervalName}
                      id = {itemData.item.intervalID}
                      description = {itemData.item.intervalDescription}
                      duration = {itemData.item.intervalDuration}
                      color = {itemData.item.intervalColor}
                      sound = {itemData.item.intervalSound}
                      intervals = {itemData.item.intervals} 
                      isRunning = {itemData.item.isRunning}
                      
                      */

    
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [secondText, setSeconds] = useState('');
    const [minuteText, setMinutes] = useState('');
    const timers = route.params.intervals;
    const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
    const timer = timers[currentTimerIndex];
    //const [isRunning, setIsRunning] = useState(false);

    //constant to change pause and play
    const [isImage1Displayed, setIsImage1Displayed] = useState(true);

    const image1 = require('./assets/PlayGrey.png');
    const image2 = require('./assets/Pause.png');

    const onPress = () => {
        setIsImage1Displayed((prevState) => !prevState);
    
        if(isImage1Displayed){
            //state was paused and has just been started
            startTimers();
        } else {
            //state was playing and should now pause
            handlePauseTimers();
        }
    };

    function handleTimerFinish(id) {
        //const nextTimerIndex = timers.findIndex(timer => timer.id === id) + 1;
        console.log(timers.length)
        const timer = timers[currentTimerIndex];
        timer.isRunning = false;
        const nextTimerIndex = currentTimerIndex+1;
        
        if (nextTimerIndex < timers.length) {
            setCurrentTimerIndex(nextTimerIndex);
            const timer = timers[nextTimerIndex];
            console.log(timer)
            timer.isRunning = true;
            forceUpdate();
            console.log(nextTimerIndex)
            console.log(timers[nextTimerIndex])
            
            
        } else {
            //code to play alert and then call a goBack function that resets variables, back button should also call that function

          /*Sound.createAsync(
            {
              uri:
                'http://www.orangefreesounds.com/wp-content/uploads/2017/08/Alarm-clock-ringing-sound.mp3',
              },
              { shouldPlay: true });
            setTimers([]);
            setCurrentTimer(null);
              }*/
        }
      }

      function handlePauseTimers(){

        const timer = timers[currentTimerIndex];
        timer.isRunning = false;
        forceUpdate();
        
    
      }
    
      function startTimers() {
        // Start the timer at the current index
        const timer = timers[currentTimerIndex];
        timer.isRunning = true;
        forceUpdate();
        
      }


      return (
        <View style={[styles.appContainer, { backgroundColor: timer.intervalColor }]}>
            <View style = {styles.titleBar}>
                <Text style={{fontSize:50, }}>{timer.intervalName}</Text>
                <Text style={{fontSize:30, }}>{timer.intervalDescription}</Text>
            </View>
            <View style = {styles.timer}>
        
            <Timer
                id={timer.intervalID}
                duration={timer.intervalDuration}
                name={timer.intervalName}
                description={timer.intervalDescription}
                color={timer.intervalColor}
                onFinish={handleTimerFinish}
                isRunning={timer.isRunning}
                />
            </View>
            <View style = {styles.controlBar}>
            <TouchableOpacity onPress={navigation.goBack}>
            <Image
                source={require('./assets/Left.png')}
                style={{ width: 60, height: 60 }}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
            <Image
                source={isImage1Displayed ? image1 : image2}
                style={{ width: 100, height: 100 }}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={navigation.goBack}>
            <Image
                source={require('./assets/Right.png')}
                style={{ width: 60, height: 60 }}
                />
            </TouchableOpacity>

            </View>
        </View>
      )

} export default TimerScreen

const styles = StyleSheet.create({

appContainer: {
    flex: 1,
    flexDirection: 'column',
    
},
titleBar: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
},
timer: {
    flex: 5,
    alignItems: 'center',
    alignContent: 'center',
},
controlBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 100,
    alignItems: 'center',
    alignContent: 'center',
},

});