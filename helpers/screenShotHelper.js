import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { useDispatch } from "react-redux";
import {addnewbill} from '../store/actions/appActions';
import {
  Alert,
} from "react-native";
const takeScreenGrab = async (setLoading,billRef,navigation,userId,customer,items,total,dispatch,prevBills,from) => {
    let loading = false;
  Alert.alert("Done", "Do you wan't to share this bill", [
    {
      text: "No",
      onPress: async() => {
        
        if (from !== "previousBills") {
        setLoading(true);
        const data = await sendToServer(userId, customer, items, total);
        setLoading(false);
        dispatch(addnewbill(data[0]));
        }
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
                          
                          if (from !== "previousBills")
                            {
                                setLoading(true);
                            const data = await sendToServer(
                              userId,
                              customer,
                              items,
                              total
                            );
                            setLoading(false);
                                dispatch(addnewbill(data[0]));
                            }
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
  const res = await fetch("https://shielded-reef-50986.herokuapp.com/addbill", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customer, total, items, userId }),
  });
  const data = await res.json();
  return data;
};
export default takeScreenGrab;