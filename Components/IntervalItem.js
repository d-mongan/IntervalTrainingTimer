import {StyleSheet, Text, Pressable, View} from 'react-native'
//import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';


/*list of props:
                      onDelete = {removeTimerHandler}
                      onPress = {openTimerHandler}
                      name = {itemData.item.intervalName}
                      id = {itemData.item.intervalID}
                      description = {itemData.item.intervalDescription}
                      duration = {itemData.item.intervalDuration}
                      color = {itemData.item.intervalColor}
                      sound = {itemData.item.intervalSound}
                      intervals = {itemData.item.intervals} */

function IntervalItem(props) {
    

    return (
        <Pressable onLongPress={props.onDelete.bind(this, props.id)} onPress={props.onPress.bind(this,props.id)}>
        <View >
        <LinearGradient
        colors={['#F5F5F5', '#F5F5F5', props.color]}
        style={styles.listItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 0.6,1]}
      >
            <View style = {styles.topRow}>
                <Text style={{fontSize: 20, color: '#2D2A32'}}>{props.name}</Text>
                <View style ={styles.duration}>
                    <Text style={{fontSize: 20, color: '#2D2A32'}}>{props.minutes.toString().padStart(2, '0')}
                    :
                    {props.seconds.toString().padStart(2, '0')}</Text>
                </View>
            </View>

            <View style = {styles.bottomRow}>
                <Text tyle={{fontSize: 15,color: '#2D2A32' }}>{props.description}</Text>
            </View>
        </LinearGradient>
        </View>
        </Pressable>
      );


};

export default IntervalItem;

const styles = StyleSheet.create({

    listItem: {
        padding: 5,
        margin: 2,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#cccccc',
       
        borderRadius: 40,
      },
      topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        
      },
      bottomRow: {
        paddingLeft: 20,
      },
      duration: {
        paddingRight: 16,
        paddingTop: 8,

      },
})