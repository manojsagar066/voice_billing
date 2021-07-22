import React,{createRef}from 'react';
import {
  StyleSheet,
  Text,ScrollView,FlatList,SectionList,
  View,Share,Alert,
  PixelRatio,TouchableOpacity
} from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const ViewBill = (props) => {
    const billRef = createRef();

const takeScreenGrab = async()=>{
    const result = await captureRef(billRef, {
      result: "tmpfile",
      quality: 1,
      format: "png",
      
    });
    const x = Sharing.isAvailableAsync().then((res)=>{
        if(res){
            Sharing.shareAsync(result, {
              dialogTitle:'Send bill to'
            }).then((response)=>{
                Alert.alert('Done','Bill sent to the customer',[
                    {
                        text:'Done',
                        onPress:()=>{
                            props.navigation.navigate({
                                routeName:'PreviousBillsScreen'
                            })
                        }
                    }
                ]);
            });
        }
    });
}
    
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.headerTitle}>The generated bill is:</Text>
        </View>
        <View ref={billRef} style={styles.billContainer}>
          <FlatList
            keyExtractor={(item,index) => item.item + index}
            data={props.navigation.state.params.data}
            renderItem={({ item }) => {
              return (
                <View style={styles.individualItem}>
                  <View style={styles.itemRow}>
                    <Text style={styles.textStyle}>{item.item}</Text>
                    <Text style={[styles.costStyle]}>₹{item.cost}</Text>
                  </View>
                  <Text style={styles.textStyle}>{item.quantity}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.billButton}>
          <TouchableOpacity onPress={takeScreenGrab}>
            <Text style={[styles.costStyle]}>Generate Bill</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#d6d3cb",
  },
  headerTitle: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 25,
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
  },
  textStyle: {
    fontSize: 15,
  },
  billButton: {
    alignSelf: "center",
    backgroundColor: "yellow",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    position: "absolute",
    bottom: 10,
  },
});
export default ViewBill
