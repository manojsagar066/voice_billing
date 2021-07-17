import {  createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { TouchableOpacity,Alert } from 'react-native';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import NewBillScreen from '../screens/NewBillScreen';
import PreviousBillsScreen from '../screens/PreviousBillsScreen';
import AddNewItemScreen from '../screens/AddNewItemScreen';
const AddNewNavigator = createStackNavigator(
  {
    AddNewItemScreen: {
      screen: AddNewItemScreen,
      navigationOptions: {
        headerTitle: "Add new item",
        headerLeft: () => null,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#d6d3cb",
      },
      headerRight: () => {
        return (
          <TouchableOpacity>
            <Icon
              style={{ marginRight: 10 }}
              name="logout"
              type="material"
              size={30}
              color="#808e9b"
            />
          </TouchableOpacity>
        );
      },
    },
  }
);
const AppNavigator = createStackNavigator(
  {
    PreviousBillsScreen: {
      screen: PreviousBillsScreen,
      navigationOptions: {
        headerTitle: "Bills generated so far",
        headerLeft: () => null,
      },
    },
    NewBillScreen: {
      screen: NewBillScreen,
    },
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#d6d3cb",
      },
    },
  }
);
const MainNavigator = createDrawerNavigator(
  {
    BillsPart: {
      screen: AppNavigator,
      navigationOptions: {
        drawerLabel: "Billing",
      },
    },
    AddNewPart: {
      screen: AddNewNavigator,
      navigationOptions: {
        drawerLabel: "New Item",
      },
    },
  },
  {
    drawerBackgroundColor: "#d6d3cb",
    drawerType: "back",
    hideStatusBar: true,
    keyboardDismissMode: "on-drag",
    contentOptions: {
      itemsContainerStyle: {
        marginHorizontal: 5,
      },
    },
  }
);
const AuthNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
      headerRight: () => null,
    },
  },
  MainNavigator: {
    screen: MainNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
});


  
export default createAppContainer(AuthNavigator);