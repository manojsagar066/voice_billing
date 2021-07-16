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
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default AddNewItemScreen
