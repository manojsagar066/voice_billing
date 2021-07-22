import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch} from 'react-redux';
import {
    StyleSheet,Alert,
    Text,TextInput,
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
                  if (item !== undefined)
                    {
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
                            <Text style={{ fontSize: 20 }}>
                              {item.customer}{" "}
                            </Text>
                            <Text style={{ fontSize: 20 }}>₹ {item.total}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                }}
              />
            ) : (
              <View>
                <Text style={{ textAlign: "center", fontSize: 15 }}>
                  Looks like you are a new user,
                </Text>
                <Text style={{ textAlign: "center", fontSize: 15 }}>
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
                  <Text style={{ fontSize: 20, paddingBottom: 10 }}>
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
                <Button
                  color={"#307fc9"}
                  title="add New"
                  onPress={() => {
                    setIsModalVisible(false);
                    if(customer ===''){
                        Alert.alert("Invalid entry','You have to enter customer's name",[
                          {
                            text:'Re-enter',
                            onPress:()=>{
                              setIsModalVisible(true);
                            }
                          }
                        ])
                    }
                    else{
                      props.navigation.navigate({
                        routeName: "NewBillScreen",
                        params: {
                          customerName: customer,
                          dispatcher: dispatch,
                        },
                      });
                    }
                  }}
                />
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
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
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
    margin: 10,
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: Dimensions.get("window").width * 0.89,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#d6d3cb",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: Dimensions.get("window").width * 0.7,
    height: 40,
    color: "#1f1e1c",
    backgroundColor: "white",
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginVertical: 20,
  },
  buttonStyle: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
    backgroundColor: "#307fc9",
  },
});
export default PreviousBillsScreen
