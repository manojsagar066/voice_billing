import React, { useState,useEffect } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Dimensions,ToastAndroid} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useSelector} from 'react-redux';
import { startRecordingAudio,stopRecordingAudio, stopRecordingAudio2} from '../helpers/audioHelpers';
import ConfirmAlert from '../widgets/ConfirmAlert';
import Recording from '../widgets/Recording';
import { logout } from '../store/actions/appActions';
import { Alert } from 'react-native';
function NewBillScreen(props) {
  console.log(Dimensions.get('window'))
    // const selector = useSelector((state)=>state.app);
    const [uri,setUri] = useState("");
    const [voiceData,setVoiceData] = useState('')
    const [isRec,setRec] = useState(false)
    const [isRes,setIsRes] = useState(false);
    const [recording, setRecording] = useState();
    const [billData,setBillData] = useState([]);
    const [billTotal,setBillTotal] = useState(0);
    const customerName = props.navigation.getParam("customerName");
    console.log(billData);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.billContainer}>
          <Recording
            isRec={isRec}
            render={billData.length > 0}
            isRes={isRes}
            billData={billData}
            billTotal={billTotal}
            setBillData={setBillData}
            setTotal={setBillTotal}
            customerName={customerName}
          />
        </View>
        {isRes ? <View/>:<View style={styles.mic}>
          <TouchableOpacity
            onPress={
              recording
                ? async () => {
                    setRec(false);
                    await stopRecordingAudio2(
                      setUri,
                      setRecording,
                      recording,
                      setBillData,
                      setIsRes,
                      setBillTotal
                    );
                  }
                : () => {
                    setRec(true);
                    startRecordingAudio(setUri, setRecording, recording);
                  }
            }
          >
            <Icon
              size={Dimensions.get("window").width / 10}
              type="fontisto"
              name={recording ? "stop" : "mic"}
              color="white"
            />
          </TouchableOpacity>
        </View>}
        {!isRec && !isRes ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                ConfirmAlert(
                  props.navigation,
                  "Cancel",
                  "You want to cancel this bill?",
                  billData,
                  billTotal,
                  setBillTotal,
                  setBillData,
                  customerName
                );
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                if (billTotal == 0) {
                  Alert.alert("Bill empty", "You haven't started the billing");
                } else {
                  ConfirmAlert(
                    props.navigation,
                    "Confirm",
                    "Do you want to confirm this bill or do you want to recheck",
                    billData,
                    billTotal,
                    setBillTotal,
                    setBillData,
                    customerName
                  );
                }
              }}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
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
  mainContainer: {
    flex: 1,
    backgroundColor: "#d6d3cb",
  },
  billContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: Dimensions.get("window").width / 39,
    marginVertical: Dimensions.get("window").width / 39,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: Dimensions.get("window").width / 39,
    marginVertical: Dimensions.get("window").width / 39,
    backgroundColor: "white",
    borderRadius: Dimensions.get("window").width / 39,
    borderColor: "#187fcc",
    borderWidth: Dimensions.get("window").width / 390,
  },
  listView: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button1: {
    backgroundColor: "#e34031",
    width: Dimensions.get("window").width / 2,
    flex: 1,
  },
  button2: {
    backgroundColor: "#187fcc",
    width: Dimensions.get("window").width / 2,
    flex: 1,
  },
  mic: {
    backgroundColor: "#187fcc",
    padding: Dimensions.get("window").width / 16,
    alignSelf: "center",
    borderRadius: Dimensions.get("window").width / 7,
    width: Dimensions.get("window").width / 4.5,
    marginVertical: Dimensions.get("window").width / 22,
    position: "absolute",
    bottom: Dimensions.get("window").width / 8,
  },
  buttonText: {
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: Dimensions.get("window").width / 39,
    paddingVertical: Dimensions.get("window").width / 26,
    fontSize: Dimensions.get("window").fontScale * 25,
    color: "white",
    fontWeight: "bold",
  },
});

export default NewBillScreen;

