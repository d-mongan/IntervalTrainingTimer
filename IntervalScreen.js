import { Button, StyleSheet, Text, TextInput, View, FlatList, Modal, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Picker, PickerItem } from 'react-native-picker';
import { useState, useCallback } from 'react';
import IntervalItem from './Components/IntervalItem';
import InputIntervalItem from './Components/InputIntervalItem';
import { useNavigation } from '@react-navigation/native';
import { saveData, loadData } from './Components/Storage';


function IntervalScreen({route, navigation}) {

  //old textinput for minutes/seconds:
  /*<TextInput  maxLength={2} 
                                            keyboardType="number-pad"  
                                            value={intervalMinutes}
                                            placeholder={intervalMinutes === 0 ? '00' : intervalMinutes.toString().padStart(2, '0')}
                                    onChangeText={(text) => {
                                        if (/^\d+$/.test(text) && Number(text) <= 59) {
                                            setIntervalMinutes(Number(text));
                                        }
                                    }}
                                style={{ width: 50, height: 50, fontSize:30 }}></TextInput>

                                <Text style={{fontSize: 50, color: '#2D2A32', width: 30, paddingBottom:10}}>:</Text>
                
                                <TextInput  maxLength={2} 
                                            keyboardType="number-pad"  
                                            value={intervalSeconds}
                                            placeholder={intervalSeconds === 0 ? '00' : intervalSeconds.toString().padStart(2, '0')}
                                onChangeText={(text) => {
                                        if (/^\d+$/.test(text) && Number(text) <= 59) {
                                            setIntervalSeconds(Number(text));
                                        }
                                }}
                                style={{ width: 50, height: 50, fontSize:30,  }}></TextInput>*/ 

  //for the color picker
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const Colors = ['red', 'orange', 'yellow', 'green', 'blue'];
  
  //for the seconds/minutes scrollwheel
  const secondsItems = [];
  for (let i = 0; i < 60; i++) {
    secondsItems.push({label: i.toString().padStart(2, '0'), value: i});
  }

  const minutesItems = [];
  for (let i = 0; i < 60; i++) {
    minutesItems.push({label: i.toString().padStart(2, '0'), value: i});
  }

  const renderItem = ({ item }) => {
    return (
      <Text style={[styles.item, item.value === intervalMinutes ? styles.selected : styles.faded]}>
        {item.label}
      </Text>
    );
  };

    //general arrays for the timers
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const { IntervalTimers, timerID } = route.params;
    const intervalsObject = IntervalTimers.find((timer) => timer.id === timerID);
    const [intervals, setIntervals] = useState(intervalsObject.intervals);

    //const intervals = intervalsObject.intervals;

    //grab the name, id and the array which holds the different intervals for this timer
    const name = intervalsObject.name;
    const id = intervalsObject.id;

    //variables for adding new intervals to the timer
    const [modalVisible, setModalVisible] = useState(false);
    const [intervalName, setIntervalName] = useState('');
    const [intervalDescription, setIntervalDescription] = useState('');
    const [intervalMinutes, setIntervalMinutes] = useState(0);
    const [intervalSeconds, setIntervalSeconds] = useState(0);
    const [intervalDuration, setIntervalDuration] = useState('');
    const [intervalColor, setIntervalColor] = useState('red');
    const [intervalSound, setIntervalSound] = useState('');
    const [intervalID, setIntervalID] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    function addTimerHandler(){
        //pop-up allowing user to write name, description, length, colour and completion sound
        setModalVisible(true)
        
      }

      function updateExistingItem(intervalID, updatedItem) {
        const updatedIntervals = intervals.map((interval) => {
          if (interval.intervalID === intervalID) {
            return updatedItem;
          } else {
            return interval;
          }
        });
      
        setIntervals(updatedIntervals);
        intervalsObject.intervals = updatedIntervals;
        saveData('IntervalTimers', IntervalTimers);
      }

    function saveNewItem() {
        if (intervalID===''){
            const newItem = { 
                intervalID: Math.random(),
                intervalName, 
                intervalDescription, 
                intervalMinutes, 
                intervalSeconds, 
                intervalDuration: (intervalMinutes*60)+intervalSeconds, 
                intervalColor, 
                intervalSound,
                isRunning,
            };
            intervals.push(newItem);
            saveData('IntervalTimers', IntervalTimers);
        } else {
            const existingItem = { 
                intervalID,
                intervalName, 
                intervalDescription, 
                intervalMinutes, 
                intervalSeconds, 
                intervalDuration: (intervalMinutes*60)+intervalSeconds, 
                intervalColor, 
                intervalSound,
                isRunning,
            };
            updateExistingItem(intervalID, existingItem);
            saveData('IntervalTimers', IntervalTimers);
        }

        //reset variables used in the popup
        setModalVisible(false)
        setIntervalName('')
        setIntervalDescription('')
        setIntervalMinutes(0)
        setIntervalSeconds(0)
        setIntervalDuration('')
        setIntervalColor('red')
        setIntervalSound('')
        setIntervalID('')
        setIsRunning(false)
    }

    function saveExistingItem(id) {

    }
    
    function removeTimerHandler(id){
        
            Alert.alert(
              'Delete item',
              'Are you sure you want to delete this item?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                    
                    
                    //const index = intervals.findIndex((interval) => interval.intervalID === id);
                    //setIntervals(intervals.splice(index, 1));
                    setIntervals(intervals.filter((interval) => interval.intervalID !== id))
                    intervalsObject.intervals = intervals.filter((interval) => interval.intervalID !== id);
                    saveData('IntervalTimers', IntervalTimers);
                }
                },
              ],
              {cancelable: false},
            );
            
            
    };
    
      function openTimerHandler(id) {
        //const interval = intervalTimerItem.find((timer) => timer.id === id);
        //popup a window with the same options as the create window but filled in with the details so the user can edit them
        const item = intervals.find((interval) => interval.intervalID === id);
        
        setIntervalName(item.intervalName)
        setIntervalDescription(item.intervalDescription)
        setIntervalMinutes(item.intervalMinutes)
        setIntervalSeconds(item.intervalSeconds)
        setIntervalDuration(item.intervalDuration)
        setIntervalColor(item.intervalColor)
        setIntervalSound(item.intervalSound)
        setIntervalID(item.intervalID)

        setModalVisible(true);
      }

      function startTimer() {
        //start the interval timer
        navigation.navigate('Timer', { intervals: intervals});
      }

      function toggleColorPicker() {
        setColorPickerVisible(!colorPickerVisible);
      }
    
      function selectColor(color) {
        setIntervalColor(color);
        toggleColorPicker();
      }
    
    
      return (
        
        <View style = {styles.appContainer}>
            <View style = {styles.titleBar}>
            <Text style={{fontSize: 35, color: '#2D2A32', width: '90%', textAlign: 'center'}}>{name}</Text>
            </View>
            <View style = {styles.playBar}>
            <TouchableOpacity onPress={navigation.goBack}>
            <Image
                source={require('./assets/Back.png')}
                style={{ width: 60, height: 60 }}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={addTimerHandler}>
                <Image
                source={require('./assets/Add.png')}
                style={{ width: 60, height: 60 }}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={startTimer}>
                <Image
                source={require('./assets/Play.png')}
                style={{ width: 60, height: 60 }}
                />
            </TouchableOpacity>
            
            </View>
            
            <View style = {styles.timersContainer}>
            <FlatList  data={intervals} 
                    keyExtractor={(item, id) => {return item.intervalID}}
                    renderItem={(itemData)=>{ 
                    return <IntervalItem 
                      onDelete = {removeTimerHandler}
                      onPress = {openTimerHandler}
                      name = {itemData.item.intervalName}
                      id = {itemData.item.intervalID}
                      description = {itemData.item.intervalDescription}
                      duration = {itemData.item.intervalDuration}
                      color = {itemData.item.intervalColor}
                      sound = {itemData.item.intervalSound}
                      intervals = {itemData.item.intervals}
                      minutes = {itemData.item.intervalMinutes}
                      seconds = {itemData.item.intervalSeconds}
                      />
            }} />
         
      
            </View>
            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style = {styles.modalContainer}>
                        <Text>Name:</Text>
                        <TextInput value={intervalName} onChangeText={(text) => setIntervalName(text)} />
                        <Text>Description:</Text>
                        <TextInput value={intervalDescription} onChangeText={(text) => setIntervalDescription(text)} />
                        <Text>Duration:</Text>
                            <View style ={styles.timer}>
                            



                            
                            </View>
                            <View>
                              <TouchableOpacity onPress={toggleColorPicker}>
                                <View style={[styles.colorBox, { backgroundColor: intervalColor }]} />
                              </TouchableOpacity>
                              {colorPickerVisible && (
                                <View style={styles.colorPicker}>
                                  <ScrollView horizontal>
                                    {Colors.map(color => (
                                      <TouchableOpacity key={color} onPress={() => selectColor(color)}>
                                        <View style={[styles.colorBox, { backgroundColor: color }]} />
                                      </TouchableOpacity>
                                    ))}
                                  </ScrollView>
                                </View>
                              )}
                            </View>

                        <Button title="Save" onPress={saveNewItem} />

                    </View>
                </Modal>
                
        </View>
        
        
      );



} export default IntervalScreen

const styles = StyleSheet.create({
    appContainer: {
      paddingTop: 50,
      paddingHorizontal:16,
      flex: 1,
      
    },
    titleBar: {
      flex: 0.5,
      flexDirection: 'row',
      marginBottom: 8,
      borderBottomColor: '#cccccc',
      borderBottomWidth: 1,
      paddingBottom: 8,
      
    },
    playBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        flex: 0.75,
    },
    timersContainer: {
      flex: 6,
  
    },
    
    timer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 180,
    },
    modalContainer:{

    },
    colorBox: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 5,
    },
    colorPicker: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    },
    selectedItem: {
      fontSize: 32,
      color: 'black',
    },
    unselectedItem: {
      fontSize: 32,
      color: 'gray',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 48,
      textAlign: 'center',
    },
    
  }); 