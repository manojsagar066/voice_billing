import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
export const startRecordingAudio = async(setUri,setRecording)=>{
    setUri('')
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
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
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  export const stopRecordingAudio = async(setUri,setRecording,recording,base64,setbase64) =>{
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    setUri(uri);const base = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    setbase64(base);
    console.log('Recording stopped and stored at', uri);
    fetch("http://192.168.43.125:5000/additem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"string":base}),
    }).then((res)=>res.json()).then((data)=>{
      console.log(data);
    });
  }