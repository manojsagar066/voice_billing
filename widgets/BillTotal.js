import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native';
function BillTotal({total}) {
    return (
      <View style={styles.total}>
        <Text style={styles.text}>The total cost is: ₹{total}</Text>
      </View>
    );
}
const styles = StyleSheet.create({
  total: {
    alignItems: "center",
    marginTop: Dimensions.get("window").width / 40,
  },
  text: {
    fontSize: Dimensions.get("window").width / 15,
    color: "#307fc9",
    fontWeight: "bold",
  },
});
export default BillTotal

