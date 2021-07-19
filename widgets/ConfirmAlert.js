import React from 'react'
import {View,Alert} from 'react-native';

function ConfirmAlert(navigation,title,message,data) {
  console.log(title === 'Cancel')
  if(title === 'Cancel'){
    return (
      Alert.alert(
          title,
          message,
          [
            {
              text: "Cancel",
              onPress: ()=>{
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
                    console.log(data);
                    navigation.navigate({
                      routeName: "ViewBill",
                      params: { 
                        data: data 
                      },
                      // params: {
                      //   customerName: customer,
                      //   dispatcher: dispatch,
                      // },
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
