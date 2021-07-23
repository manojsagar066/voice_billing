import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch} from 'react-redux';
import {
    StyleSheet,Alert,
    Text,TextInput,ToastAndroid,
    View,Dimensions,
    Modal,FlatList,
    Button,TouchableOpacity
  } from 'react-native';
function PreviousBillsScreen(props) {
  const dispatchAction = useDispatch();
  const state = useSelector(state => state.app)
    const [customer,setCustomer] = useState('');
    const [isModalVisible,setIsModalVisible] = useState(false);
    const dispatch = useDispatch()
    const selector = useSelector((state)=>state.app);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.centeredView}>
          <View>
            {selector.bills.length !== 0 ? (
              <FlatList
                keyExtractor={(item) => {
                  if (item !== undefined) return item._id["$oid"];
                }}
                data={selector.bills}
                renderItem={({ item }) => {
                  if (item !== undefined) {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate({
                            routeName: "ViewBill",
                            params: {
                              data: item.items,
                              total: item.total,
                              customerName: item.customer,
                              from: "previousBills",
                            },
                          });
                        }}
                        style={styles.individualBill}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: Dimensions.get("window").width / 19.5,
                            }}
                          >
                            {item.customer}{" "}
                          </Text>
                          <Text
                            style={{
                              fontSize: Dimensions.get("window").width / 19.5,
                            }}
                          >
                            ₹ {item.total}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                }}
              />
            ) : (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: Dimensions.get("window").width / 26,
                  }}
                >
                  Looks like you are a new user,
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: Dimensions.get("window").width / 26,
                  }}
                >
                  click New bill to start your first billing
                </Text>
              </View>
            )}
          </View>
          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Text
                    style={{
                      fontSize: Dimensions.get("window").width / 19.5,
                      paddingBottom: Dimensions.get("window").width / 39,
                    }}
                  >
                    Enter the customer name:
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={customer}
                    onChangeText={(data) => {
                      setCustomer(data);
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <View
                    style={{
                      marginHorizontal: Dimensions.get("window").width / 39,
                    }}
                  >
                    <Button
                      color={"#307fc9"}
                      title="add New"
                      onPress={() => {
                        if (customer === "") {
                          ToastAndroid.show(
                            "Customer's name is required",
                            2000
                          );
                        } else {
                          setIsModalVisible(false);
                          props.navigation.navigate({
                            routeName: "NewBillScreen",
                            params: {
                              customerName: customer,
                              dispatcher: dispatch,
                            },
                          });
                          setCustomer('')
                        }
                      }}
                    />
                  </View>
                  <Button
                    color={"#307fc9"}
                    title="Dismiss"
                    onPress={() => {
                      setIsModalVisible(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            // props.navigation.navigate({
            //   routeName: 'NewBillScreen',
            //   params: {}
            // });
            setIsModalVisible(true);
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: Dimensions.get("window").width / 19.5,
              fontWeight: "bold",
            }}
          >
            New bill
          </Text>
        </TouchableOpacity>
      </View>
    );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d6d3cb",
  },
  individualBill: {
    margin: Dimensions.get("window").width / 39,
    backgroundColor: "white",
    borderRadius: Dimensions.get("window").width / 26,
    paddingVertical: Dimensions.get("window").width / 19.5,
    paddingHorizontal: Dimensions.get("window").width / 13,
    width: Dimensions.get("window").width * 0.89,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: Dimensions.get("window").width / 195,
    },
    shadowOpacity: Dimensions.get("window").width / 1560,
    shadowRadius: Dimensions.get("window").width / 97.5,
    elevation: Dimensions.get("window").width / 80,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").width / 17.72,
  },
  modalView: {
    margin: Dimensions.get("window").width / 19.5,
    backgroundColor: "#d6d3cb",
    borderRadius: Dimensions.get("window").width / 19.5,
    padding: Dimensions.get("window").width / 15.6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: Dimensions.get("window").width / 195,
    },
    shadowOpacity: Dimensions.get("window").width / 1560,
    shadowRadius: Dimensions.get("window").width / 97.5,
    elevation: Dimensions.get("window").width / 80,
  },
  input: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width / 9.75,
    color: "#1f1e1c",
    backgroundColor: "white",
    borderRadius: Dimensions.get("window").width / 65,
    marginTop: Dimensions.get("window").width / 39,
    paddingHorizontal: Dimensions.get("window").width / 39,
    fontSize: Dimensions.get("window").width / 24.375,
    marginVertical: Dimensions.get("window").width / 19.5,
  },
  buttonStyle: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Dimensions.get("window").width / 23,
    backgroundColor: "#307fc9",
  },
});
export default PreviousBillsScreen

