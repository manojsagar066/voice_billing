import React, { useState } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Modal,Button} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
function NewBillScreen(props) {
    const [uri,setUri] = useState("");
    const [modalVisible,setModalVisible] = useState(false)
    const [recording, setRecording] = useState();
    const [sound, setSound] = useState();
    const [dummyData,setDummyData] = useState(
        [
            // {
            //     item:"Groundnut Oil",
            //     quantity:"2L",
            //     amount:100
            // },
            // {
            //     item:"Coconut Oil",
            //     quantity:"1L",
            //     amount:50
            // }
        ],
    );

    React.useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);
  async function startRecording() {
    setUri('')
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    setUri(uri);
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    console.log('Recording stopped and stored at', uri);
    console.log(base64);
  }

    return (
        <View style={styles.mainContainer}>
            {dummyData.length == 0?<View/>:<View style={styles.mainRow}>
                <View><Text style={{fontWeight:'bold',fontSize:15,color:'#187fcc',textAlign:'center'}}>Item</Text></View>
                <View><Text style={{fontWeight:'bold',fontSize:15,color:'#187fcc',textAlign:'center'}}>Quantity</Text></View>
                <View><Text style={{fontWeight:'bold',fontSize:15,color:'#187fcc',textAlign:'center'}}>Amount</Text></View>
            </View>}
            <View style={styles.billContainer}>
                
                {uri.length == 0 ? <Text style={{fontSize:30,color:'#187fcc'}}>Start Billing</Text>:<View/>}
            </View>
            <View style={styles.mic}>
                <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
                    <Icon size={50} type='fontisto' name={recording ?'stop':'mic'} color='white'/>
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
        headerTitle: 'Billing Customer 1',

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
