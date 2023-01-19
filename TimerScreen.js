import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Modal, ImageBackground } from 'react-native';
import { useState, useCallback, useEffect,    } from 'react';
import { Timer } from './Components/Timer';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

function TimerScreen({route, navigation}) {  
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [secondText, setSeconds] = useState('');
    const [minuteText, setMinutes] = useState('');
    const timers = route.params.intervals;
    const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
    const [timer, setTimer] = useState(timers[currentTimerIndex]);
    
    //sounds    
    async function playFinalSound(){
      let finalSound = new Audio.Sound();
      await finalSound.loadAsync(require('./assets/finalAlarm.mp3'));
      finalSound.playAsync(1);
    }
    async function playIntervalSound(){
      let intervalSound = new Audio.Sound();
      await intervalSound.loadAsync(require('./assets/intervalAlarm.mp3'));
      intervalSound.playAsync(1);
    }
    
    useEffect(() => {
      setTimer(timers[currentTimerIndex]);
    }, [currentTimerIndex]);
    
    
    //handle background gradients
    const [backgroundImage, setBackgroundImage] = useState(require('./assets/grad_red.png'));
    useEffect(() => {
      if (timer.intervalColor == 'red') {
        setBackgroundImage(require('./assets/grad_red.png'));
      } else if (timer.intervalColor == 'orange') {
        setBackgroundImage(require('./assets/grad_orange.png'));
      } else if (timer.intervalColor == 'green') {
        setBackgroundImage(require('./assets/grad_green.png'));
      } else if (timer.intervalColor == 'blue') {
        setBackgroundImage(require('./assets/grad_blue.png'));
      } else if (timer.intervalColor == 'yellow') {
        setBackgroundImage(require('./assets/grad_yellow.png'));
      }
    }, [timer.intervalColor]);

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
        const timer = timers[currentTimerIndex];
        timer.isRunning = false;
        let nextTimerIndex = currentTimerIndex+1;
        
        if (nextTimerIndex < timers.length) {
            playIntervalSound();
            
            setCurrentTimerIndex(nextTimerIndex)
            const timer = timers[nextTimerIndex];
            //forceUpdate();
            timer.isRunning = true;
            
        } else {
            //code to play alert and then call a goBack function that resets variables, back button should also call that function
            //resetTimers();
            playFinalSound();
        }
      }

      function handleTimerNext(){ 
        let nextTimerIndex = currentTimerIndex+1;
        if (nextTimerIndex < timers.length) {
          if(!isImage1Displayed){
            setIsImage1Displayed(true);
          }
            setCurrentTimerIndex(nextTimerIndex);
            setTimer(timers[nextTimerIndex]);
            timer.isRunning = false;          

      } else {
        resetTimers();
      }
    }
      function handleTimerPrevious(){
        let prevTimerIndex = currentTimerIndex-1;
        
        if (prevTimerIndex >= 0) {
          if(!isImage1Displayed){
            setIsImage1Displayed(true);
          }
            setCurrentTimerIndex(prevTimerIndex);
            setTimer(timers[prevTimerIndex]);
            timer.isRunning = false;
            
      } else {
        resetTimers();
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
      function resetTimers() {
        navigation.goBack();
        
        //maybe try adding a 1 second wait here so the first timer doesn't flash?
        const timer = timers[currentTimerIndex];
        timer.isRunning = false;
        setCurrentTimerIndex(0);

        
    }


      return (
        <View style={styles.appContainer}>
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        <TouchableOpacity onPress={resetTimers} style={{marginTop: 40, marginLeft: 15}}>
            <Image
                source={require('./assets/close.png')}
                style={{ width: 30, height: 30 }}
                />
            </TouchableOpacity>
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
                timer={timer}
                />
            </View>
            <View style = {styles.controlBar}>
            <TouchableOpacity onPress={handleTimerPrevious}>
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
            <TouchableOpacity onPress={handleTimerNext}>
            <Image
                source={require('./assets/Right.png')}
                style={{ width: 60, height: 60 }}
                />
            </TouchableOpacity>

            </View>
            </ImageBackground>
        </View>
      )

} export default TimerScreen

const styles = StyleSheet.create({

  appContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
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