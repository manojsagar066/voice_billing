import React from 'react'
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,Alert,ToastAndroid} from 'react-native';
function ItemsCard(props) {
    const {title,quantity,cost,setBillData,units,setTotal} = props;
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onLongPress={() => {
            Alert.alert(
              `Delete ${title}`,
              `Do you want to delete this item??`,
              [
                {
                  text: "Delete",
                  onPress: () => {
                    setBillData((prevBill) =>
                      prevBill.filter((value, index, arr) => {
                        if (
                          value["Item Name"].toLowerCase() ===
                          title.toLowerCase()
                        ) {
                          setTotal((prev) => {
                            return prev - value["Price ₹"] / 2;
                          });
                        }
                        return (
                          value["Item Name"].toLowerCase() !==
                          title.toLowerCase()
                        );
                      })
                    );
                  },
                },
                {
                  text: "Cancel",
                  onPress: () => {},
                },
              ],
              {
                cancelable: true,
              }
            );
          }}
          onPress={()=>{
            ToastAndroid.show("Long press to delete the item", 2000);
          }}
        >
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.text}>
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </Text>
              <Text style={[styles.subtext]}>{`${quantity}${units}`}</Text>
            </View>
            <View style={[styles.cost]}>
              <Text
                style={{
                  color: "white",
                  alignSelf: "center",
                  paddingVertical: Dimensions.get("window").width / 22,
                  fontSize: Dimensions.get("window").width / 25,
                }}
              >{`₹ ${cost}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
  card: {
    marginTop: Dimensions.get("window").width / 22,
    marginHorizontal: Dimensions.get("window").width / 39,
    width: Dimensions.get("window").width * 0.9,
    paddingHorizontal: Dimensions.get("window").width / 22,
    backgroundColor: "white",
    borderRadius: Dimensions.get("window").width / 78,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: Dimensions.get("window").width / 195,
    },
    shadowOpacity: 0.25,
    shadowRadius: Dimensions.get("window").width / 78,
    elevation: Dimensions.get("window").width / 78,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: Dimensions.get("window").width / 20,
    paddingHorizontal: Dimensions.get("window").width / 78,
    paddingBottom: Dimensions.get("window").width / 78,
    paddingTop: Dimensions.get("window").width / 39,
  },
  subtext: {
    fontSize: Dimensions.get("window").width / 30,
    paddingHorizontal: Dimensions.get("window").width / 78,
    paddingBottom: Dimensions.get("window").width / 39,
    paddingTop: Dimensions.get("window").width / 78,
    color: "grey",
  },
  cost: {
    height: Dimensions.get("window").width / 7.5,
    width: Dimensions.get("window").width / 7.5,
    backgroundColor: "#307fc9",
    borderRadius: Dimensions.get("window").width / 13,
    marginTop: Dimensions.get("window").width / 55,
  },
});
export default ItemsCard

