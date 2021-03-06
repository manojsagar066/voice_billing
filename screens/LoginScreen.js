import React, {useState } from 'react';
import {useDispatch } from 'react-redux';
import { login } from '../store/actions/appActions';
import {
  androidClientId,
  facebookAppId,
  standAloneId,
} from "../helpers/authIds";
import {
  StyleSheet,
  Text,ScrollView,
  View,Alert,
  ActivityIndicator,
  TextInput,
  Keyboard,Dimensions,
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
  const [dimension] = useState(Dimensions.get("window").width);
  const sendToServer = async(username,id,navigation)=>{
        try{
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
        }
        catch(error){
          throw error;
          
        }
  }
  const handleGoogleAuth = async()=>{
    try{
      setIsLoadingGoogle(true);
    const config = {
      androidClientId: androidClientId,
      scopes: ["profile", "email"],
      androidStandaloneAppClientId: standAloneId,
    };
    const res = await Google.logInAsync(config);
    const {type,user} = res;
    if (type == "success") {
      const res = await sendToServer(user.name, user.id,props.navigation);
      // console.log("logged in",res[0],res[1])
      dispatchAction(
        login({ name: res[0].username, id: res[0]._id, bills: res[1] })
      );
      props.navigation.navigate({
        routeName: "MainNavigator",
      });
    } else {
    }
    setIsLoadingGoogle(false);
    }
    catch(error){
      Alert.alert("Error", "Something went wrong please check your network");
      setIsLoadingGoogle(false);
      props.navigation.navigate({
        routeName: "LoginScreen",
      });
    }
  }

  const handleFacebookAuth = async()=>{
    try{
      const appId = facebookAppId;
      try {
        await Facebook.initializeAsync({
          appId: appId,
        });
        const { type, token } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
        if (type === "success") {
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`
          );
          const user = await response.json();
          const res = await sendToServer(user.name, user.id, props.navigation);
          // console.log("logged in", res[0], res[1]);
          const userData = {
            name: res[0].username,
            id: res[0]._id,
            bills: res[1],
          };
          dispatchAction(login(userData));
          props.navigation.navigate({
            routeName: "MainNavigator",
          });
        } else {
          // type === 'cancel'
        }
        setIsLoadingFacebook(false);
      } catch ({ message }) {
        Alert.alert("Error", "Something went wrong please try again");
        setIsLoadingGoogle(false);
        props.navigation.navigate({
          routeName: "LoginScreen",
        });
        setIsLoadingFacebook(false);
        // console.log(`Facebook Login Error: ${message}`);
      }
    }
    catch(error){
       Alert.alert("Error", "Something went wrong please check your network");
       setIsLoadingGoogle(false);
       props.navigation.navigate({
         routeName: "LoginScreen",
       });
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
            <View style={{ margin: dimension / 78 }}>
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
                  handleGoogleAuth(
                    dispatchAction,
                    setIsLoadingGoogle,
                    props.navigation
                  );
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
                  size={dimension / 13}
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
    paddingTop: Dimensions.get("window").width / 7.8,
    paddingHorizontal: Dimensions.get("window").width / 19.5,
  },
  welcomeText: {
    fontSize: Dimensions.get("window").width / 15.6,
    fontWeight: "bold",
    color: "#1f1e1c",
    alignSelf: "center",
  },
  loginText: {
    color: "#1f1e1c",
    fontSize: Dimensions.get("window").width / 13.93,
    fontWeight: "bold",
    marginTop: Dimensions.get("window").width / 19.5,
    marginBottom: Dimensions.get("window").width / 39,
  },
  input: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").width / 7.8,
    color: "#1f1e1c",
    backgroundColor: "#8f8d89",
    borderRadius: Dimensions.get("window").width / 65,
    marginTop: Dimensions.get("window").width / 39,
    paddingHorizontal: Dimensions.get("window").width / 39,
    fontSize: Dimensions.get("window").width / 24.375,
  },
  fpText: {
    alignSelf: "flex-end",
    color: "#307fc9",
    fontSize: Dimensions.get("window").width / 21.67,
    fontWeight: "600",
    marginTop: Dimensions.get("window").width / 39,
  },
  loginButton: {
    backgroundColor: "#307fc9",
    paddingVertical: Dimensions.get("window").width / 32.5,
    borderRadius: Dimensions.get("window").width / 55.71,
    marginTop: Dimensions.get("window").width / 19.5,
  },
  loginButtonText: {
    fontSize: Dimensions.get("window").width / 19.5,
    fontWeight: "500",
    color: "#fafafa",
    alignSelf: "center",
  },
  loginWithBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Dimensions.get("window").width / 7.8,
  },
  iconButton: {
    backgroundColor: "#333",
    padding: Dimensions.get("window").width / 26,
    marginHorizontal: Dimensions.get("window").width / 39,
    borderRadius: Dimensions.get("window").width / 13,
    height: Dimensions.get("window").width / 6.5,
    width: Dimensions.get("window").width / 6.5,
  },
  signUpTextView: {
    marginTop: Dimensions.get("window").width / 9.75,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    color: "#1f1e1c",
    fontSize: Dimensions.get("window").width/19.5,
    fontWeight: "500",
  },
});
