import {StyleSheet,View, TextInput, Button} from 'react-native'
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

      <Button 
          title='Add Timer'
          onPress={addTimerHandler}
          style={styles.button}
           />
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
      
      flex: 1,
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#cccccc',
      width: '50%',
      marginRight: 8,
      padding: 8,
    },
    goalsContainer: {
      flex: 6,
  
    },
    
    button:{
      
    }
  });