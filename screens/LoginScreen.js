import React, {useState } from 'react';
import {useDispatch } from 'react-redux';
import { login } from '../store/actions/appActions';
import { androidClientId ,facebookAppId} from "../helpers/authIds";
import {
  StyleSheet,
  Text,ScrollView,
  View,
  ActivityIndicator,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';


export default function LoginScreen(props) {
  const [email,updateEmail] = useState("");
  const [password,updatePassword] = useState("");
  const [rePassword,updateRePassword] = useState("");
  const [isVisible,updateIsVisible] = useState(false);
  const [isRegistered,updateIsRegistered] = useState(true);
  const [isLoadingGoogle,setIsLoadingGoogle] = useState(false);
  const [isLoadingFacebook,setIsLoadingFacebook] = useState(false);
  const dispatchAction = useDispatch();
  const sendToServer = async(username,id)=>{
        const res = await fetch(
          "https://shielded-reef-50986.herokuapp.com/fetch",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: id, username: username }),
          }
        );
        return res.json();
//      {
//   "email": "prajwalshiv.04@gmail.com",
//   "familyName": "Ponnana",
//   "givenName": "Prajwal",
//   "id": "104992273790346816622",
//   "name": "Prajwal Ponnana",
//   "photoUrl": "https://lh3.googleusercontent.com/a-/AOh14GjZg2HFKFaYplVRoeecIrY15v1Q2fYx8oY3zJe5KZY=s96-c",
// }
  }
  const handleGoogleAuth = async()=>{
    setIsLoadingGoogle(true);
    const config = {
      androidClientId : androidClientId,
      scopes:['profile','email']
    };
    const res = await Google.logInAsync(config);
    const {type,user} = res;
    if (type == "success") {
      const res = await sendToServer(user.name, user.id);
      dispatchAction(
        login({ name: res[0].username, id: res[0]._id, bills: res[0]["bills"] })
      );
      props.navigation.navigate({
        routeName: "MainNavigator",
      });
    } else {
    }
    setIsLoadingGoogle(false);
    
  }

  const handleFacebookAuth = async()=>{
    const appId = facebookAppId;
      try {
        await Facebook.initializeAsync({
          appId: appId,
        });
        const {
          type,
          token,
          expirationDate,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
        if (type === 'success') {
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const user = await response.json();
          const res = await sendToServer(user.name, user.id);
          console.log(res);
          dispatchAction(
            login({
              name: res[0].username,
              id: res[0]._id,
              bills: res[0]["bills"],
            })
          );
          props.navigation.navigate({
            routeName: 'MainNavigator',
          });
        } else {
          // type === 'cancel'
        }
        setIsLoadingFacebook(false);
      } catch ({ message }) {
        setIsLoadingFacebook(false);
        console.log(`Facebook Login Error: ${message}`);
      }
    }
    
  return (
    <ScrollView
      style={{
        backgroundColor: "#d6d3cb",
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <Text style={styles.welcomeText}>
            {!isRegistered ? "Hello There!" : "Welcome back"}
          </Text>
          <View
            style={{
              backgroundColor: "#307fc9",
              padding: 40,
              alignSelf: "center",
              borderRadius: 80,
              width: 160,
              height: 160,
              marginTop: 40,
            }}
          >
            <Icon size={80} type="fontisto" name="mic" color="white" />
          </View>
          <Text style={styles.loginText}>
            {isRegistered ? "Login" : "Register"}
          </Text>
          <TextInput
            onChange={(data) => {
              updateEmail(data.target.value);
            }}
            value={email}
            placeholder="Email Address"
            placeholderTextColor="#1f1e1c"
            style={styles.input}
            autoCorrect={true}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <View style={{ flexDirection: "row" }}>
            <TextInput
              onChange={(data) => {
                updatePassword(data.target.value);
              }}
              value={password}
              placeholder="Password"
              placeholderTextColor="#1f1e1c"
              style={styles.input}
              secureTextEntry={!isVisible}
              textContentType="password"
            />
            <View style={{ margin: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  updateIsVisible((prev) => !prev);
                }}
              >
                <Icon
                  color={isVisible ? "#307fc9" : "white"}
                  type="fontisto"
                  name="eye"
                />
              </TouchableOpacity>
            </View>
          </View>
          {isRegistered ? (
            <View />
          ) : (
            <TextInput
              onChange={(data) => {
                updateRePassword(data.target.value);
              }}
              value={rePassword}
              placeholder="Re Enter password"
              placeholderTextColor="#1f1e1c"
              style={styles.input}
              secureTextEntry={!isVisible}
              textContentType="password"
            />
          )}
          <TouchableOpacity>
            <Text style={styles.fpText}>
              {isRegistered ? "Forgot Password?" : ""}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate({
                routeName: "MainNavigator",
                params: {},
              });
            }}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>
              {isRegistered ? "Login" : "Register"}
            </Text>
          </TouchableOpacity>
          <View style={styles.loginWithBar}>
            {isLoadingGoogle ? (
              <ActivityIndicator size="large" color="#307fc9" />
            ) : (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  handleGoogleAuth(dispatchAction,setIsLoadingGoogle,props.navigation);
                }}
              >
                <Icon
                  name="google"
                  type="font-awesome"
                  size={30}
                  color="#808e9b"
                />
              </TouchableOpacity>
            )}
            {isLoadingFacebook ? (
              <ActivityIndicator size="large" color="#307fc9" />
            ) : (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  setIsLoadingFacebook(true);
                  handleFacebookAuth();
                }}
              >
                <Icon
                  name="facebook-square"
                  type="font-awesome"
                  size={30}
                  color="#808e9b"
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.signUpTextView}>
            <Text style={styles.signUpText}>
              {isRegistered ? "Don't have an account?" : "Have an account??"}
            </Text>
            <TouchableOpacity
              onPress={() => updateIsRegistered((prev) => !prev)}
            >
              <Text style={[styles.signUpText, { color: "#307fc9" }]}>
                {isRegistered ? " Sign Up" : " Sign In"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1f1e1c',
    alignSelf: 'center',
  },
  loginText: {
    color: '#1f1e1c',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: '90%',
    height: 50,
    color: '#1f1e1c',
    backgroundColor: '#8f8d89',
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  fpText: {
    alignSelf: 'flex-end',
    color: '#307fc9',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#307fc9',
    paddingVertical: 12,
    borderRadius: 7,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fafafa',
    alignSelf: 'center',
  },
  loginWithBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  iconButton: {
    backgroundColor: '#333',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 30,
    height:60,
    width:60
  },
  signUpTextView: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#1f1e1c',
    fontSize: 20,
    fontWeight: '500',
  },
});