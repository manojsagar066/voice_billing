import { Audio } from 'expo-av';
import {Alert} from 'react-native';
import * as FileSystem from 'expo-file-system';
export const startRecordingAudio = async(setUri,setRecording)=>{
    setUri('')
    try {
      // console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      // console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync({
        isMeteringEnabled: true,
        android: {
          extension: ".wav",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
          sampleRate: 44100,
        },
        ios: {
          extension: ".caf",
        },
      });
      setRecording(recording);
      // console.log('Recording started');
    } catch (err) {
      // console.error('Failed to start recording', err);
      Alert.alert('Error','There was something wrong please try again and make sure the mic permissions are enabled')
    }
  }


  export const stopRecordingAudio2 = async (
    setUri,
    setRecording,
    recording,
    setBillData,
    setIsRes,
    setBillTotal
  ) => {
    try{
      setIsRes(true);
    // console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setUri(uri);
    const base = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    // console.log("Recording stopped and stored at", uri, ` ${base.length}`);
    const res = await fetch(
      "https://shielded-reef-50986.herokuapp.com/additem",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ string: base }),
      }
    );
    const data = await res.json();
    let total = 0;
    // console.log(typeof(data['res']),data['res'],typeof(data));
    if(data['res'] !== undefined){
      setIsRes(false);
      setBillData((prev) => {
        return (data["res"]).concat(prev);
      });
      data["res"].forEach((item) => {
        total += item["Price ₹"];
      });
      setBillTotal((prev)=>prev+total);
      // console.log(data["res"]);
    }
    else{
      setIsRes(false);
      console.log(data)
      Alert.alert("An error occured",data['Error']);
      
    }
    }
    catch(error){
      setIsRes(false);
      // console.log("Error",error);
      console.log(error);
      Alert.alert("Error","An error occured try again");
    }
  };
