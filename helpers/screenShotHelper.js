import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import {
  Alert,
} from "react-native";
const takeScreenGrab = async (billRef,navigation) => {
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
            onPress: () => {
              navigation.navigate({
                routeName: "PreviousBillsScreen",
              });
            },
          },
        ]);
      });
    }
  });
};
export default takeScreenGrab;