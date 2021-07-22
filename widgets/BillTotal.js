import React from 'react'
import {View,Text,StyleSheet} from 'react-native';
function BillTotal({total}) {
    return (
        <View style={styles.total}>
            <Text style={styles.text}>
                The total cost is: {total}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    total:{alignItems:'center',marginTop:10,},
    text:{
        fontSize:20,
    }
})
export default BillTotal
