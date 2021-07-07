import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';
function PreviousBillsScreen(props) {
    return (
        <View style={styles.mainContainer}>
            <Text>
                Previous Bills Screen
            </Text>
            <Button title="New Bill" onPress={()=>{
          props.navigation.navigate({
            routeName: 'NewBillScreen',
            params: {}
          });
        }}></Button>
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
export default PreviousBillsScreen
