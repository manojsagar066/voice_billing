import React from 'react'
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,Alert} from 'react-native';
function ItemsCard(props) {
    const {title,quantity,cost,setBillData,units,setTotal} = props;
    return (
        
        <View style={styles.card}>
            <TouchableOpacity onLongPress={()=>{
                Alert.alert(`Delete ${title}`,`Do you want to delete this item??`,[
                    {
                        text:'Delete',
                        onPress:()=>{
                            // console.log(title);
                            setBillData((prevBill)=>prevBill.filter((value, index, arr)=>{
                                    // console.log(
                                    //   value,
                                    //   value["Item Name"] !== title
                                    // );
                                    if (
                                      value["Item Name"].toLowerCase() ===
                                      title.toLowerCase()
                                    ) {
                                      setTotal((prev) => {
                                        //   console.log(value["Price ₹"]);
                                          return prev - (value["Price ₹"]/2);
                                      });
                                    }
                                    return (
                                      value["Item Name"].toLowerCase() !==
                                      title.toLowerCase()
                                    );
                                })
                            )
                        }
                    },
                    {
                        text:'Cancel',
                        onPress:()=>{
                        }
                    }
                ],{
                    cancelable:true
                })
            }}>
            <View style={styles.rowContainer}>
                <View>
                <Text style={styles.text}>{title.charAt(0).toUpperCase() + title.slice(1) }</Text>
                <Text style={[styles.subtext]}>{`${quantity}${units}`}</Text>
                </View>
                <View  style={[styles.cost]}>
                <Text style={{color:'white',alignSelf:'center',paddingVertical:20,fontSize:15}}>{`₹${cost}`}</Text>
                </View>
            </View>
            </TouchableOpacity>
        </View>  
        
    )
}
const styles = StyleSheet.create({
    card:{
        marginTop:20,
        marginHorizontal:10,
        width:Dimensions.get('window').width * 0.9,
        paddingHorizontal:20,
        backgroundColor: "white",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    rowContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    text:{
        fontSize:22,
        paddingHorizontal:5,
        paddingBottom:5,
        paddingTop:10,
    },
    subtext:{
        fontSize:15,
        paddingHorizontal:5,
        paddingBottom:10,
        paddingTop:5,
        color:'grey'
    },
    cost:{
        height:60,
        width:60,
        backgroundColor:'#307fc9',
        borderRadius:30,
        marginTop:5,
    }

});
export default ItemsCard
