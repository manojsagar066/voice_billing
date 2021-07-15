import React from 'react'
import {View,Text,StyleSheet,Dimensions,} from 'react-native';
function ItemsCard(props) {
    const {title,quantity,cost} = props;
    return (
        <View style={styles.card}>
            <View style={styles.rowContainer}>
                <View>
                <Text style={styles.text}>{title}</Text>
                <Text style={[styles.subtext]}>{`${quantity}`}</Text>
                </View>
                <View  style={[styles.cost]}>
                <Text style={{color:'white',fontSize:20,}}>{`₹${cost}`}</Text>
                </View>
            </View>
            
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
        fontSize:20,
        paddingHorizontal:5,
        paddingBottom:5,
        paddingTop:10,
    },
    subtext:{
        fontSize:15,
        paddingHorizontal:5,
        paddingBottom:10,
        paddingTop:5,
    },
    cost:{
        height:60,
        width:60,
        backgroundColor:'#307fc9',
        borderRadius:30,
        marginTop:5,
        paddingVertical:15,
        paddingHorizontal:8
    }

});
export default ItemsCard
