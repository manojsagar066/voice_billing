import React,{useState} from "react";
import { Touchable } from "react-native";
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
function AddNewItemScreen() {
  const [name,setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [unit,setUnit] = useState('kg');
  const[loading,setLoading]=useState(false);
  const [units] = useState([
    'kg','litre','packet'
  ]);
  const submitItem = async()=>{
    setQuantity(parseFloat(quantity));
    setPrice(parseFloat(price));
    setLoading(true)
    // number string
    if(typeof(quantity) !== 'number' || typeof(price) !== 'number' || typeof(name) !== 'string' ){
        console.log(
          typeof quantity !== "number" ||
            typeof price !== "number" ||
            typeof name !== "string"
        );
        Alert.alert('Invalid input','Make sure your input is correct');
        setLoading(false);
    }
    else if(name === '' || quantity === 0 || price === 0 || units === ''){
      Alert.alert("Input empty", "Make sure you fill all the inputs");
      setLoading(false);
    }
    else{
      try {
        const response = await fetch(
          "https://shielded-reef-50986.herokuapp.com/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, quantity, price, unit }),
          }
        );
        setLoading(false);
        const data = await response.json();
        // console.log(data);
        Alert.alert("Done","Successfully added the item");
        setQuantity(0)
        setName('')
        setPrice(0)
        setUnit('kg')
      } catch (error) {
        // console.log(error);
        setLoading(false);
      }
    }
    }
    
  return (
    <View style={styles.mainContainer}>
      <Text
        style={{
          alignSelf: "flex-start",
          marginHorizontal: Dimensions.get("window").width / 9.75,
          fontSize: Dimensions.get("window").width / 21.67,
        }}
      >
        Item Name:
      </Text>
      <View style={styles.textInput}>
        <TextInput
          style={{ fontSize: Dimensions.get("window").width / 21.67 }}
          textAlign="center"
          placeholder="Enter the item name"
          value={name}
          onChangeText={(data) => {
            setName(data);
          }}
        />
      </View>
      <Text
        style={{
          alignSelf: "flex-start",
          marginHorizontal: Dimensions.get("window").width / 9.75,
          fontSize: Dimensions.get("window").width / 21.67,
        }}
      >
        Quantity:
      </Text>
      <View style={styles.textInput}>
        <TextInput
          style={{ fontSize: Dimensions.get("window").width / 21.67 }}
          textAlign="center"
          placeholder="Enter quantity"
          keyboardType="numeric"
          value={quantity.toString()}
          onChangeText={(data) => {
            setQuantity(data);
          }}
        />
      </View>
      <Text
        style={{
          alignSelf: "flex-start",
          marginHorizontal: Dimensions.get("window").width / 9.75,
          fontSize: Dimensions.get("window").width / 21.67,
        }}
      >
        Units ( kg, litre or packets ):
      </Text>
      <View style={styles.textInput}>
        <TextInput
          style={{ fontSize: Dimensions.get("window").width / 21.67 }}
          textAlign="center"
          value={unit}
          onChangeText={(data) => {
            setUnit(data);
          }}
        />
      </View>
      <Text
        style={{
          alignSelf: "flex-start",
          marginHorizontal: Dimensions.get("window").width / 9.75,
          fontSize: Dimensions.get("window").width / 21.67,
        }}
      >
        Price:
      </Text>
      <View style={styles.textInput}>
        <TextInput
          style={{ fontSize: Dimensions.get("window").width / 21.67 }}
          textAlign="center"
          placeholder="Enter price"
          keyboardType="numeric"
          value={price.toString()}
          onChangeText={(data) => {
            // console.log(data);
            setPrice(data);
          }}
        />
      </View>
      {loading ? (
        <Text>Loading....</Text>
      ) : (
        <TouchableOpacity style={styles.submitButton} onPress={submitItem}>
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: Dimensions.get("window").width / 21.67,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
AddNewItemScreennavigationOptions = (navigationData) => {
  return {
  };
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d6d3cb",
  },
  textInput: {
    marginHorizontal: Dimensions.get("window").width / 39,
    padding: Dimensions.get("window").width / 39,
    marginVertical: Dimensions.get("window").width / 39,
    width: Dimensions.get("window").width * 0.8,
    elevation: Dimensions.get("window").width / 110,
    height: Dimensions.get("window").width / 7.8,
    color: "#1f1e1c",
    backgroundColor: "#8f8d89",
    borderRadius: Dimensions.get("window").width / 65,
    marginTop: Dimensions.get("window").width / 39,
    paddingHorizontal: Dimensions.get("window").width / 39,
  },
  submitButton: {
    paddingVertical: Dimensions.get("window").width / 19.5,
    paddingHorizontal: Dimensions.get("window").width / 39,
    backgroundColor: "#307fc9",
    width: Dimensions.get("window").width * 0.8,
    elevation: Dimensions.get("window").width / 195,
    height: Dimensions.get("window").width / 7.8,
    borderRadius: Dimensions.get("window").width / 65,
    marginVertical: Dimensions.get("window").width / 39,
    justifyContent: "center",
  },
});

export default AddNewItemScreen;

