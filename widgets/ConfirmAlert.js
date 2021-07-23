import React from 'react'
import {View,Alert} from 'react-native';

function ConfirmAlert(navigation,title,message,data,total,clearData,clearTotal,customerName) {
  const bill = data;
  const billTotal = total;
  // console.log(title === 'Cancel')
  if(title === 'Cancel'){
    return (
      Alert.alert(
          title,
          message,
          [
            {
              text: "Cancel",
              onPress: ()=>{
                  clearData([]);
                  clearTotal(0)
                  navigation.navigate({
                      routeName: 'PreviousBillsScreen',
                      params: {}
                  });
              },
            },
          ],
          {
            cancelable: true,
            onDismiss: () =>{}  
          }
        )
  );
  }
    return (
        Alert.alert(
            title,
            message,
            [
              {
                text: "Re Check",
                onPress: () =>{},
              },
              {
                text: "Confirm",
                onPress: ()=>{
                  
                    clearData([]),
                    clearTotal(0),
                      navigation.navigate({
                        routeName: "ViewBill",
                        params: {
                          data: bill,
                          total: billTotal,
                          customerName:customerName,
                          from:'newBills'
                        },
                      });
                },
              },
            ],
            {
              cancelable: true,
              onDismiss: () =>{}
                
            }
          )
    );
}

export default ConfirmAlert

