import React,{useState} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput
  } from 'react-native';
function AddNewItemScreen() {
  const [itemname,setitemname]=React.useState('') 
  function updateItemname(event){
    setitemname(event.target.value)
    console.log(itemname)
  }
  const [quantity,setquantity]=React.useState('') 
  function updateItemname(event){
    setitemname(event.target.value)
    console.log(quantity)
  }
  const [price,setprice]=React.useState('') 
  function updateItemname(event){
    setitemname(event.target.value)
    console.log(price)
  }

  
    
    
   
  return (
      <View>
      <TextInput onChange={(data)=>{
    setitemname(data.target.value)
    console.log(itemname,data.target);
    
    
  }}value={itemname}
      style={styles.basicTextInput}
      placeholder={'Item Name'}
     />
     
     <TextInput onChange={(data)=>{
    setquantity(data.target.value)
    console.log(quantity,data.target);
    
    
  }} value={quantity}
     style={styles.basicTextInput}
     placeholder={'Enter the quantity'}
     />
     
     <TextInput onChange={(data)=>{
    setprice(data.target.value)
    console.log(price,data.target);
    
    
  }} value={quantity}
     style={styles.basicTextInput}
     placeholder={'Enter the Price'}
     />
     </View>
            
    )
}
AddNewItemScreennavigationOptions = (navigationData) => {
  return {
    
  };
};
const styles = StyleSheet.create({
  basicTextInput: {
      width: '80%',
      height: 44,
      backgroundColor: '#f1f3f6',
      borderRadius: 7,
      paddingHorizontal: 10,
  }

  
})
export default AddNewItemScreen
