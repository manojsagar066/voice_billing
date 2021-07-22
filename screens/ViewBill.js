import React, { createRef,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import takeScreenGrab from "../helpers/screenShotHelper";
const ViewBill = (props) => {
  const dispatch = useDispatch();
  const billRef = createRef();
  const state = useSelector(state => state.app);
  const [loading,isLoading] = useState(false);
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
        {loading?<Text>
          Loading....
        </Text> :<TouchableOpacity onPress={()=>{
          takeScreenGrab(
            isLoading,
            billRef,
            props.navigation,
            state.id,
            props.navigation.state.params.customerName,
            props.navigation.state.params.data,
            props.navigation.state.params.total,
            dispatch,
            state.bills,
            props.navigation.state.params.from
          );
        }}>
          <Text style={{color:'white'}}>Done</Text>
        </TouchableOpacity>}
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
