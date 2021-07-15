import React from 'react'
import {View,Alert} from 'react-native';

function ConfirmAlert(navigation,title,message) {
    return (
        Alert.alert(
            title,
            message,
            [
              {
                text: "Cancel",
                onPress: () => Alert.alert("Cancel Pressed"),
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
