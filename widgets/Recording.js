import React from 'react'
import {View,Image,Text,Dimensions,FlatList} from 'react-native';
import ItemsCard from './ItemsCard';
import BillTotal from './BillTotal';
function Recording(props) {
    const {isRec,isRes,customerName,voiceData,billData,billTotal,setBillData} = props;
    if (!isRec && !isRes && voiceData === ''){
        return (
          <View>
            <Text style={{ fontSize: 30, color: "#187fcc" }}>
              Start Billing {customerName}'s bill
            </Text>
          </View>
        );
    }
    else if(isRec && !isRes){
        return <Image style={{width:Dimensions.get('window').width *0.9}} source={require("../assets/recording.gif")} />;
    }
    else if(isRes && !isRec){
        return (
          <Image
            
            source={require("../assets/loading2.gif")}
          />
        );
    }
    else if(!isRec && !isRes && voiceData !== ''){
        return (
          <View>
            <Text style={{ fontSize: 30, color: "#187fcc" }}>{voiceData}</Text>
            <BillTotal total={billTotal}/>
                    <FlatList keyExtractor={item => item.item} data={billData} renderItem={({item})=>{
                        return(<ItemsCard title={item.item} quantity={item.quantity} cost={item.cost} setBillData={setBillData}/>)
                    }}/>    
          </View>
        );
    }
    else{
        return <View/>
    }
    
}

export default Recording
