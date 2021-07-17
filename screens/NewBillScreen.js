import React, { useState,useEffect } from 'react';
import {StyleSheet,Text,View,TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useSelector} from 'react-redux';
import { startRecordingAudio,stopRecordingAudio} from '../helpers/audioHelpers';
import ConfirmAlert from '../widgets/ConfirmAlert';
import Recording from '../widgets/Recording';
import { logout } from '../store/actions/appActions';
function NewBillScreen(props) {
    // const selector = useSelector((state)=>state.app);
    const [uri,setUri] = useState("");
    const [voiceData,setVoiceData] = useState('')
    const [isRec,setRec] = useState(false)
    const [isRes,setIsRes] = useState(false);
    const [recording, setRecording] = useState();
    const [billData,setBillData] = useState([]);
    const [billTotal,setBillTotal] = useState(0);
    return (
      <View style={styles.mainContainer}>
        <Text>{isRes ? "true" : "false"}</Text>
        <View style={styles.billContainer}>
          <Recording
            isRec={isRec}
            voiceData={voiceData}
            isRes={isRes}
            billData={billData}
            billTotal={billTotal}
            setBillData = {setBillData}
            customerName={props.navigation.getParam("customerName")}
          />
        </View>
        <View style={styles.mic}>
          <TouchableOpacity
            onPress={
              recording
                ? async () => {
                    setRec(false);
                    await stopRecordingAudio(
                      setUri,
                      setRecording,
                      recording,
                      setBillData,
                      setIsRes,
                      setVoiceData
                    );
                    setBillData((prev)=>prev.concat([
                      { item: "Groundnut Oil", quantity: 2, cost: 20.6 },
                      { item: "Coconut Oil", quantity: 1, cost: 56 },
                      { item: "Sugar", quantity: 1, cost: 45 },
                      { item: "Rava", quantity: 2, cost: 76 },
                    ]));
                    setBillTotal(0);
                    if(billData.length > 0){
                        billData.forEach((val) => {
                          setBillTotal((prev) => prev + val.cost);
                        });
                    } 
                  }
                : () => {
                    setRec(true);
                    startRecordingAudio(setUri, setRecording, recording);
                  }
            }
          >
            <Icon
              size={50}
              type="fontisto"
              name={recording ? "stop" : "mic"}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => {
              ConfirmAlert(
                props.navigation,
                "Cancel",
                "You want to cancel this bill?"
              );
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              ConfirmAlert(
                props.navigation,
                "Confirm",
                "Do you want to confirm this bill or do you want to recheck"
              );
            }}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
