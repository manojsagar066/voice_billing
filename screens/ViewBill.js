import React, { createRef } from "react";
import { Icon } from "react-native-elements";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import takeScreenGrab from "../helpers/screenShotHelper";
const ViewBill = (props) => {
  const billRef = createRef();

  const renderData = () => {
    const data = props.navigation.state.params.data;
    let ans = [];
    let count = 0;
    for (let item of data) {
      ans.push(
        <View key={`${count}`} style={styles.individualItem}>
          <View style={styles.itemRow}>
            <Text style={styles.textStyle}>{item["Item Name"]}</Text>
            <Text style={[styles.costStyle]}>₹{item["Price ₹"]}</Text>
          </View>
          <Text
            style={styles.subTextStyle}
          >{`${item.Quantity}${item.Units}`}</Text>
        </View>
      );
      count += 1;
    }
    return ans;
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View collapsable={false} ref={billRef}>
          <View>
            <Text style={styles.headerTitle}>
              Total Cost is:{props.navigation.state.params.total}
            </Text>
          </View>
          <View style={styles.billContainer}>{renderData()}</View>
        </View>
      </ScrollView>
      <View style={styles.billButton}>
        <TouchableOpacity onPress={()=>{
          takeScreenGrab(billRef,props.navigation)
        }}>
          <Icon name="share" type="fontisto" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#d6d3cb",
  },
  headerTitle: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 25,
    color: "#307fc9",
  },
  billContainer: {
    borderWidth: 2,
    margin: 15,
    padding: 5,
    borderRadius: 9,
    backgroundColor: "#d6d3cb",
  },
  individualItem: {
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    marginTop: 2,
    height: 60,
    justifyContent: "space-around",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  costStyle: {
    marginRight: 5,
    marginVertical: 2,
    fontSize: 20,
    color: "black",
  },
  textStyle: {
    fontSize: 20,
  },
  subTextStyle:{
    fontSize: 13,
    color:'grey'
  },  
  billButton: {
    alignSelf: "center",
    backgroundColor: "#307fc9",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 30,
    position: "absolute",
    bottom: 10,
  },
});
export default ViewBill;
