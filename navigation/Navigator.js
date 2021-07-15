import {  createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer'
import LoginScreen from '../screens/LoginScreen';
import NewBillScreen from '../screens/NewBillScreen';
import PreviousBillsScreen from '../screens/PreviousBillsScreen';
import AddNewItemScreen from '../screens/AddNewItemScreen';
const AppNavigator = createStackNavigator({
    
    // LoginScreen : {
    //     screen:LoginScreen,
    //     navigationOptions:{
    //         headerShown:false
    //     }
    // },
    PreviousBillsScreen:{
        screen:PreviousBillsScreen,
        navigationOptions:{
            headerTitle: "Bills generated so far",
            headerLeft:()=>null
        }
    },
    NewBillScreen : {
        screen:NewBillScreen,
    },
    
});
export default createAppContainer(AppNavigator);