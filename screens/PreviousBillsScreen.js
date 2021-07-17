import React,{useState} from 'react'
import { useSelector,useDispatch} from 'react-redux';
import {
    StyleSheet,
    Text,TextInput,
    View,
    Modal,
    Button
  } from 'react-native';

function PreviousBillsScreen(props) {
    const [customer,setCustomer] = useState('');
    const [isModalVisible,setIsModalVisible] = useState(false);
    const dispatch = useDispatch()
    const selector = useSelector((state)=>state.app);
    return (
        <View style={styles.mainContainer}>
            <Text>
                Previous Bills Screen
            </Text>
            <View style={styles.centeredView}>
            <Modal transparent={true} animationType='slide' visible={isModalVisible}>
              <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <TextInput style={styles.input} value={customer} placeholder='Enter the customer name' onChangeText={(data)=>{
            setCustomer(data);
          }}/></View>
                  <Button title="add New" onPress={()=>{
                    setIsModalVisible(false);
                    props.navigation.navigate({
                    routeName: 'NewBillScreen',
                    params: {
                      customerName:customer,
                      dispatcher:dispatch
                    }
                    });
                  }}/>
              </View>
              </View>
            </Modal>
            </View>
            <Button title="New Bill" onPress={()=>{
          // props.navigation.navigate({
          //   routeName: 'NewBillScreen',
          //   params: {}
          // });
          setIsModalVisible(true);
        }}></Button>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#d6d3cb'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 25,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    input: {
      width: '90%',
      height: 50,
      color: '#1f1e1c',
      backgroundColor: '#8f8d89',
      borderRadius: 6,
      marginTop: 10,
      paddingHorizontal: 10,
      fontSize: 16,
    },
})
export default PreviousBillsScreen
