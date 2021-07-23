import React,{useState} from "react";
import { Touchable } from "react-native";
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert } from "react-native";
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
        Alert.alert('Invalid input','Make sure your input is correct');
        setLoading(false);
    }
    else if(name === '' || quantity === 0 || price === 0 || units === ''){
      Alert.alert("Input empty", "Make sure you fill all the inputs");
      setLoading(false);
    }
    try{
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
    console.log(data);
  }
  catch(error){
    console.log(error);
    setLoading(false);
  }
    }
    
  return (
    <View style={styles.mainContainer}>
      <TextInput
        textAlign="center"
        placeholder="Enter the item name"
        value={name}
        onChangeText={(data) => {
          setName(data);
        }}
      />
      <TextInput
        textAlign="center"
        placeholder="Enter quantity"
        keyboardType="numeric"
        value={quantity.toString()}
        onChangeText={(data) => {
          setQuantity(data);
        }}
      />
      <TextInput textAlign="center" value={unit} onChangeText={(data)=>{
          setUnit(data);
      }}/>
      <TextInput
        textAlign="center"
        placeholder="Enter price"
        keyboardType="numeric"
        value={price.toString()}
        onChangeText={(data) => {
          console.log(data);
          setPrice(data);
        }}
      />
      {loading?<Text>Loading....</Text>: <TouchableOpacity onPress={submitItem}>
        <Text>Submit</Text>
      </TouchableOpacity>}
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
  },
});

export default AddNewItemScreen;

