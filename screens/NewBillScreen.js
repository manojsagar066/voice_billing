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
//   async function startRecording() {
//     setUri('')
//     try {
//       console.log('Requesting permissions..');
//       await Audio.requestPermissionsAsync();
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       }); 
//       console.log('Starting recording..');
//       const { recording } = await Audio.Recording.createAsync(
//          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//       );
//       setRecording(recording);
//       console.log('Recording started');
//     } catch (err) {
//       console.error('Failed to start recording', err);
//     }
//   }
//   async function stopRecording() {
//     console.log('Stopping recording..');
//     setRecording(undefined);
//     await recording.stopAndUnloadAsync();
//     const uri = recording.getURI(); 
//     setUri(uri);const base = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
//     setbase64(base);
//     console.log('Recording stopped and stored at', uri);console.log(base64);
//   }
    useEffect(()=>{
        console.log(billData);
        billData.forEach((val,index)=>{
            setBillTotal((prev)=>prev+val.cost);
        });
    },[uri,billData])
    useEffect(()=>{
        console.log(billTotal);
    },[billTotal])
//   React.useEffect(()=>{
//     if(uri.length > 0){
//         fetch('https://voicebilling-auth-default-rtdb.firebaseio.com/',{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//               audio:base64
//           })
//     }).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
//     }
//   },[uri])
    const addItems = ()=>{
        
    }
    return (
        <View style={styles.mainContainer}>
            
            {/* {billData.length == 0?<View/>:<View style={styles.mainRow}>
                <View><Text style={{fontWeight:'bold',fontSize:15,color:'#187fcc',textAlign:'center'}}>Item</Text></View>
                <View><Text style={{fontWeight:'bold',fontSize:15,color:'#187fcc',textAlign:'center'}}>Quantity</Text></View>
                <View><Text style={{fontWeight:'bold',fontSize:15,color:'#187fcc',textAlign:'center'}}>Amount</Text></View>
            </View>} */}

            <View style={styles.billContainer}>
                {uri.length == 0 ? <Text style={{fontSize:30,color:'#187fcc'}}>Start Billing {props.navigation.getParam('customerName')}</Text>:
                <View>
                    <BillTotal total={billTotal}/>
                    <FlatList keyExtractor={item => item.item} data={billData} renderItem={({item})=>{
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
                            {item:"Rava",quantity:2,cost:760},
                        ]); 
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
