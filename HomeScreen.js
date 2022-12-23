import { Button, StyleSheet, Text, TextInput, View, FlatList, Alert } from 'react-native';
import { useState } from 'react';
import Item from './Components/Item';
import Input from './Components/Input';
import { useNavigation } from '@react-navigation/native';

function HomeScreen({navigation}) {
    //const navigation = useNavigation();
    const [IntervalTimers, setIntervalTimers] = useState([])

  
  function addTimerHandler(enteredText){
    setIntervalTimers((IntervalTimers)=>
    [...IntervalTimers, 
      {name: enteredText, id: Math.random().toString(), intervals: []}]);
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
            {text: 'OK', onPress: () => setIntervalTimers(IntervalTimers=>{
                return IntervalTimers.filter((timer) => timer.id !== id);
            })},
          ],
          {cancelable: false},
        );
      
        
  };

  function openTimerHandler(timerID) {
    
    
    //console.log(Intervals)
    navigation.navigate('Interval', { IntervalTimers: IntervalTimers, timerID: timerID});

  }

  return (
    <View style = {styles.appContainer}>
     <Input addTimer = {addTimerHandler} />
     <View style = {styles.timersContainer}>
     <FlatList  data={IntervalTimers} 
                keyExtractor={(item, index) => {return item.id}}
                renderItem={(itemData)=>{ 
                return <Item 
                  onDelete = {removeTimerHandler}
                  onPress = {openTimerHandler}
                  name = {itemData.item.name}
                  id = {itemData.item.id}
                  intervals = {itemData.item.intervals}
                  />
     }} />
     
  
     </View>
    </View>
  );
} export default HomeScreen;



const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal:16,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
  },
  timersContainer: {
    flex: 6,

  },
  
  button:{
    
  }
}); 
