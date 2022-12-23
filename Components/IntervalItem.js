import {StyleSheet, Text, Pressable} from 'react-native'

function IntervalItem(props) {
    return (
        <Pressable onLongPress={props.onDelete.bind(this, props.id)} onPress={props.onPress.bind(this,props.id)}>
            <Text style={styles.listItem}>{props.name}</Text>
        </Pressable>
      );


};

export default IntervalItem;

const styles = StyleSheet.create({

    listItem: {
        padding: 2,
        margin: 2,
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#cccccc',
        borderRadius: 8,
      },

})