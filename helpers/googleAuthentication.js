import {useDispatch } from 'react-redux';
import * as Google from 'expo-google-app-auth';
import { login } from '../store/actions/appActions';
export const handleGoogleAuth = (dispatchAction,loader)=>{
    const config = {
      androidClientId : '272656728237-1s24lr1r6fde9u8m0nhdc7nni3laje5f.apps.googleusercontent.com',
      scopes:['profile','email']
    };
    Google.logInAsync(config).then((res)=>{
      const {type,user} = res;
      if(type == 'success'){
        console.log(user.name);
        dispatchAction(login({name:user.name,id:user.id}));
        loader(false);
        return true;
      }else{
        loader(false);
        return false;
      }
    }).catch((err)=>{
      console.log(err);
      loader(false);
      return false;
    })

  }