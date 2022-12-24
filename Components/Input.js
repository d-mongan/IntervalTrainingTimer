import {StyleSheet,View, TextInput, TouchableOpacity, Image} from 'react-native'
import { useState } from 'react';

function Input(props) {
const [enteredTimerText, setEnteredTimerText]= useState('');

function InputHandler(enteredText){
    setEnteredTimerText(enteredText);
  };
function addTimerHandler(){
    props.addTimer(enteredTimerText);
    setEnteredTimerText('');
}

return (
<View style = {styles.inputContainer}>
      <TextInput 
          placeholder='Add New Interval Timer...' 
          style = {styles.textInput} 
          onChangeText={InputHandler}
            value={enteredTimerText}
          />

        <TouchableOpacity onPress={addTimerHandler}>
                <Image
                source={require('../assets/Add.png')}
                style={{ width: 60, height: 60 }}
                />
        </TouchableOpacity>
     </View>
); 
};

export default Input;

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
    goalsContainer: {
      flex: 6,
  
    },
    
    button:{
      
    }
  });