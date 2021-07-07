import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,Dimensions,
    TouchableOpacity
  } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { FlatList } from 'react-native-gesture-handler';
function NewBillScreen(props) {
    const [dummyData,setDummyData] = useState(
        [
            {
                item:"Groundnut Oil",
                quantity:"2L",
                amount:100
            },
            {
                item:"Coconut Oil",
                quantity:"1L",
                amount:50
            }
        ],
    );
    const renderItem = ({item})=>{
        return (<View style={styles.itemRow}>
            <View><Text style={{fontWeight:600}}>{item.item}</Text></View>
            <View><Text style={{fontWeight:600}}>{item.quantity}</Text></View>
            <View><Text style={{fontWeight:600}}>{item.amount}</Text></View>
        </View>)
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainRow}>
                <View><Text style={{fontWeight:'bold',fontSize:15,color:'#187fcc'}}>Item</Text></View>
                <View><Text style={{fontWeight:'bold',fontSize:15,color:'#187fcc'}}>Quantity</Text></View>
                <View><Text style={{fontWeight:'bold',fontSize:15,color:'#187fcc'}}>Amount</Text></View>
            </View>
            <View style={styles.listView}>
                <FlatList data={dummyData} renderItem={renderItem}/>
            </View>
            
            <View style={styles.mic}>
                <TouchableOpacity>
                    <Icon size={50} type='fontisto' name='mic' color='white'/>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button1}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={()=>{
                    props.navigation.navigate({
                        routeName: 'PreviousBillsScreen',
                        params: {}
          });
        }}>
                <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

NewBillScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Billing Customer 1'
      };
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    },
    mainRow:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10,
        marginVertical:10,
        
    },
    itemRow:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10,
        marginVertical:10,
        backgroundColor:'white',
        borderRadius:10,
        borderColor:'#187fcc',
        borderWidth:1
        
    },
    listView:{
        flex:8
    },
    buttonRow:{
        flexDirection:'row',
        justifyContent:'space-around',
        
    },
    button1:{
        backgroundColor:'#e34031',
        width:'50%',
        flex:1
        
    },
    button2:{
        backgroundColor:'#187fcc',
        width:'50%',
        flex:1
    },
    mic:{backgroundColor:'#187fcc',padding:30,alignSelf:'center',borderRadius:50,width:100,marginVertical:20},
    buttonText:{
        alignSelf:'center',
        justifyContent:'center',
        paddingHorizontal:10,
        paddingVertical:15,
        fontSize:20,
        color:'white',
        fontWeight:"bold"
    }
});

export default NewBillScreen;
