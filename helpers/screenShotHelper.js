import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import {
  Alert,
} from "react-native";
const takeScreenGrab = async (setLoading,billRef,navigation,userId,customer,items,total) => {
    let loading = false;
  Alert.alert("Done", "Do you wan't to share this bill", [
    {
      text: "No",
      onPress: async() => {
        setLoading(true)
        const res = await sendToServer(userId,customer,items,total);
        
        setLoading(false)
        navigation.navigate({
          routeName: "PreviousBillsScreen",
        });
      },
    },
    {
        text:"Share",
        onPress:async()=>{
            const result = await captureRef(billRef, {
              result: "tmpfile",
              quality: 1,
              format: "png",
            });
            const x = Sharing.isAvailableAsync().then((res) => {
              if (res) {
                Sharing.shareAsync(result, {
                  dialogTitle: "Send bill to",
                }).then((response) => {
                  Alert.alert("Done", "Bill sent to the customer", [
                    {
                      text: "Done",
                      onPress: async() => {
                          setLoading(true);
                          const res = await sendToServer(userId,customer,items,total);
                          setLoading(false);
                        navigation.navigate({
                          routeName: "PreviousBillsScreen",
                        });
                      },
                    },
                  ]);
                });
              }
            });
        }
    }
  ]);
};

const sendToServer = async (userId, customer, items, total) => {
  const res = await fetch("http://192.168.43.125:5000/addbill", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customer, total, items, userId }),
  });
  return res.json();
};
export default takeScreenGrab;