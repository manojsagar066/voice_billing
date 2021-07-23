import React, { createRef,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,Dimensions,
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
            <Text style={styles.textStyle}>
              {item["Item Name"].charAt(0).toUpperCase() +
                item["Item Name"].slice(1)}
            </Text>
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
              Total Cost is: ₹{props.navigation.state.params.total}
            </Text>
          </View>
          <View style={styles.billContainer}>{renderData()}</View>
        </View>
      </ScrollView>
      <View style={styles.billButton}>
        {loading ? (
          <Text
            style={{
              color: "white",
              fontSize: Dimensions.get("window").width / 19.5,
              fontWeight: "bold",
            }}
          >
            Just a sec..
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
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
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: Dimensions.get("window").width / 22,
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        )}
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
    marginTop: Dimensions.get("window").width / 39,
    fontSize: Dimensions.get("window").width / 15.6,
    color: "#307fc9",
    fontWeight: "bold",
  },
  billContainer: {
    borderWidth: Dimensions.get("window").width / 195,
    margin: Dimensions.get("window").width / 26,
    padding: Dimensions.get("window").width / 78,
    borderRadius: Dimensions.get("window").width / 40,
    backgroundColor: "#d6d3cb",
  },
  individualItem: {
    paddingHorizontal: Dimensions.get("window").width / 78,
    borderBottomWidth: Dimensions.get("window").width / 390,
    marginTop: Dimensions.get("window").width / 195,
    height: Dimensions.get("window").width / 6.5,
    justifyContent: "space-around",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  costStyle: {
    marginRight: Dimensions.get("window").width / 78,
    marginVertical: Dimensions.get("window").width / 195,
    fontSize: Dimensions.get("window").width / 19.5,
    color: "black",
  },
  textStyle: {
    fontSize: Dimensions.get("window").width / 19.5,
  },
  subTextStyle: {
    fontSize: Dimensions.get("window").width / 30,
    color: "grey",
  },
  billButton: {
    alignSelf: "center",
    backgroundColor: "#307fc9",
    paddingHorizontal: Dimensions.get("window").width / 22,
    paddingVertical: Dimensions.get("window").width / 16,
    borderRadius: Dimensions.get("window").width / 6,
    position: "absolute",
    bottom: Dimensions.get("window").width / 39,
  },
});
export default ViewBill;

