import {StyleSheet, Text, Pressable} from 'react-native'

function Item(props) {
    return (
        <Pressable onLongPress={props.onDelete.bind(this, props.id)} onPress={props.onPress.bind(this,props.id)}>
            <Text style={styles.listItem}>{props.name}</Text>
        </Pressable>
      );


};

export default Item;

const styles = StyleSheet.create({

    listItem: {
        color: '#2D2A32',
        fontSize: 20,
        padding: 10,
        paddingLeft: 20,
        margin: 6,
        borderWidth: 1,
        borderColor: '#BE97C6',
        backgroundColor: '#fff',
        borderRadius: 70,
      },

})