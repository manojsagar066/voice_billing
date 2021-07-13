import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Button
  } from 'react-native';
function PreviousBillsScreen(props) {
    const selector = useSelector((state)=>state.app);
    console.log(selector.name,selector.id);
    return (
        <View style={styles.mainContainer}>
            <Text>{selector.name}</Text>
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
