import React from 'react'
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
function AddNewItemScreen() {
    return (
        <View style={styles.mainContainer}>
            <Text>
                Previous Bills Screen
            </Text>
        </View>
    )
}
AddNewItemScreennavigationOptions = (navigationData) => {
  return {
    headerRight: () => {
      return (
        <TouchableOpacity>
          <Icon
            style={{ marginRight: 10 }}
            name="logout"
            type="material"
            size={30}
            color="#808e9b"
          />
        </TouchableOpacity>
      );
    },
  };
};
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default AddNewItemScreen
