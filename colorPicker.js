import React from 'react';
import { TouchableOpacity, View, Text, Modal, FlatList, StyleSheet } from 'react-native';

function ColorPicker({ currentColor, onSelect }) {
  const [modalVisible, setModalVisible] = useState(false);
  const availableColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo']; // replace with your own list of colors

  function handleColorPress(color) {
    setModalVisible(false);
    onSelect(color);
  }

  return (
    <View>
      <TouchableOpacity
        style={{ backgroundColor: currentColor }}
        onPress={() => setModalVisible(true)}
      />
      
      <Modal visible={modalVisible}>
      
        <FlatList
          data={availableColors}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ backgroundColor: item }}
              onPress={() => handleColorPress(item)}
            />
          )}
          keyExtractor={item => item}
        />
        
      </Modal>
      
    </View>
  );
}
const styles = StyleSheet.create({
    
    colorOptionsContainer: {
      position: 'absolute',
      top: 60,
      left: 0,
      width: 100,
      flexDirection: 'row',
    }
})