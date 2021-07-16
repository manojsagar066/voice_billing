import React from 'react'
import {View,Alert} from 'react-native';

function ConfirmAlert(navigation,title,message) {
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

export default ConfirmAlert
