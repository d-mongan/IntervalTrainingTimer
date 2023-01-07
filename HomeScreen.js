import { StyleSheet, View, FlatList, Alert, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import Item from './Components/Item';
import Input from './Components/Input';
import { saveData, loadData } from './Components/Storage';
import { useNavigation } from '@react-navigation/native';

function HomeScreen({navigation}) {
    
  const image = require('./assets/gradient.png');

  const [IntervalTimers, setIntervalTimers] = useState([])
  //check if IntervalTimers already exists and grab it from local storage
  const loadIntervalTimers = async () => {
    const data = await loadData('IntervalTimers');
    if (data !== 'error'){
      setIntervalTimers(data);
    }
    
  }
  useEffect(() => {
    loadIntervalTimers();
  }, []);

  
  function addTimerHandler(enteredText){
    let randID = Math.random().toString()
    setIntervalTimers((IntervalTimers)=>
    [...IntervalTimers, 
      {name: enteredText, id: randID, intervals: []}]);

    saveData('IntervalTimers', [...IntervalTimers, 
      {name: enteredText, id: randID, intervals: []}]);
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
                saveData('IntervalTimers', IntervalTimers.filter((timer) => timer.id !== id));
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
    <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
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
                  style = {styles.timerItem}
                  />
     }} />
     
  
     </View>
    </View>
    </ImageBackground>
    </View>
  );
} export default HomeScreen;



const styles = StyleSheet.create({
container: {
  flex: 1,
},

  image:{
    flex: 1,
    justifyContent: "center"
  },
  
  appContainer: {
    paddingTop: 50,
    paddingHorizontal:16,
    flex: 1,
    backgroundColor: 'transparent',
    backgroundImage: require('./assets/gradient.png'),
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
