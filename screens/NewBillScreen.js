import React, { useState,useEffect } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Modal,Button,Alert,SafeAreaView,FlatList} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Audio } from 'expo-av';
import { useSelector} from 'react-redux';
import { startRecordingAudio,stopRecordingAudio} from '../helpers/audioHelpers';
import ConfirmAlert from '../widgets/ConfirmAlert';
import ItemsCard from '../widgets/ItemsCard';
import BillTotal from '../widgets/BillTotal';
function NewBillScreen(props) {
    const selector = useSelector((state)=>state.app);
    const [uri,setUri] = useState("");
    const [base64,setbase64] = useState("");
    const [recording, setRecording] = useState();
    const [billData,setBillData] = useState([]);
    const [billTotal,setBillTotal] = useState(0);
    return (
        <View style={styles.mainContainer}>
           <View style={styles.billContainer}>
                {uri.length == 0 ? <Text style={{fontSize:30,color:'#187fcc'}}>Start Billing {props.navigation.getParam('customerName')}'s bill</Text>:
                <View>
                    <BillTotal total={billTotal}/>
                    <FlatList keyExtractor={item => item.item} data={billData} setBillData={setBillData} renderItem={({item})=>{
                        return(<ItemsCard title={item.item} quantity={item.quantity} cost={item.cost}/>)
                    }}/>    
                </View>}
            </View>
            <View style={styles.mic}>
                <TouchableOpacity onPress={recording ? 
                    async()=>{
                        await stopRecordingAudio(setUri,setRecording,recording,base64,setbase64);
                        setBillData((prev)=>[
                            {item:"Groundnut Oil",quantity:2,cost:20.6},
                            {item:"Coconut Oil",quantity:1,cost:56},
                            {item:"Sugar",quantity:1,cost:45},
                            {item:"Rava",quantity:2,cost:76},
                        ]); 
                        [
                            {item:"Groundnut Oil",quantity:2,cost:20.6},
                            {item:"Coconut Oil",quantity:1,cost:56},
                            {item:"Sugar",quantity:1,cost:45},
                            {item:"Rava",quantity:2,cost:76},
                        ].forEach((val,index)=>{
                            setBillTotal((prev)=>prev+val.cost);
                        });
                    }:
                    ()=>{
                        startRecordingAudio(setUri,setRecording,recording);
                    }
                }>
                    <Icon size={50} type='fontisto' name={recording ?'stop':'mic'} color='white'/>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button1}
                onPress={()=>{
                    ConfirmAlert(props.navigation,'Cancel','You want to cancel this bill?');
                }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={
                    ()=>{
                        ConfirmAlert(props.navigation,'Confirm','Do you want to confirm this bill or do you want to recheck');
                    }
                }>
                <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

NewBillScreen.navigationOptions = navigationData => {
    const htitle = navigationData.navigation.getParam('customerName');
    return {
        headerTitle: `${htitle}'s Bill`,
      };
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#d6d3cb'
    },
    billContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
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
        flex:5
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
    mic:{
        backgroundColor:'#187fcc',
        padding:30,
        alignSelf:'center',
        borderRadius:55,
        width:110,
        marginVertical:20
    },
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
